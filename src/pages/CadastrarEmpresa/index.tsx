import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import TextInputComponent from '../../components/TextInputComponent';
import ButtonComponent from "../../components/ButtonComponent";
import { useNetInfo } from "@react-native-community/netinfo";
import { database } from '../../databases';
import { FirmaModel } from '../../databases/models/firmaModel';
import { Loading } from "../../components/Loading";

import { 
    cadastrarEditarFirma as cadastrarEditarFirmaService, 
    listarFirma as listarFirmaService 
} from "../../services/ApiService";

import { 
    Container, 
    TextFirma,
    TextListaEmpresa,
    TouchableOpacityListaEmpresas,
    TextEmpresaNome,
    TextEmpresaSync,
    TextVazio,
    TextValorSincronizado
} from './styles';

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

function CadastrarEmpresa() {

    const netInfo = useNetInfo();
    const { navigate } = useNavigation<NavigationPropsI>();

    const [loading, setLoading] = useState<boolean>(false);
    const [firma, setFirma] = useState<string>('');
    const [firmas, setFirmas] = useState<FirmaModel[]>([]);

    useEffect(() => {
        buscarFirmasLocal(); 
    }, [firmas]);
        
    return (
        <>
            <Container>

                {
                    loading
                        ? <Loading />
                        : <>
                            <ButtonComponent
                                title="<- Voltar" 
                                onPress={ () => navigate("Login") } 
                                color="#000"
                                radius="6px" 
                                paddingVertical="4px"
                                paddingHorizontal="40px"
                                marginTop="20px"
                                marginBottom="20px"
                                fontSize="12px"
                                colorText="#fff"
                            />

                            <ButtonComponent
                                title="Sincronizar" 
                                onPress={ () => sincronizar() } 
                                color="gray"
                                radius="6px" 
                                paddingVertical="4px"
                                paddingHorizontal="40px"
                                marginTop="2px"
                                marginBottom="20px"
                                fontSize="12px"
                                colorText="#fff"
                            />

                            <TextFirma>Qual o nome da Empresa?</TextFirma>
                            <TextInputComponent
                                label="Qual o nome da Empresa?"
                                placeholder=""
                                value={firma}
                                onChangeText={setFirma}
                                keyboardType="email-address" 
                                placeholderTextColor="#C0C0C0" 
                            />

                            <ButtonComponent
                                title="Cadastrar Empresa" 
                                onPress={cadastrarFirmaLocalBanco}
                                color="#6d4598"
                                radius="6px" 
                                paddingVertical="4px"
                                paddingHorizontal="40px"
                                marginTop="4px"
                                marginBottom="20px"
                                fontSize="12px"
                                colorText="#fff"
                            />
                            
                            <TextListaEmpresa>Listas das Empresas Cadastradas</TextListaEmpresa>
                            
                            <FlatList
                                data={firmas}
                                style={{ marginBottom: 60 }}
                                renderItem={({ item }) => (
                                    <TouchableOpacityListaEmpresas 
                                        onPress={ 
                                            () => console.log("Editar Empresa")
                                        }
                                    >
                                        <TextEmpresaNome>{item.nome}</TextEmpresaNome>
                                        <TextEmpresaSync>
                                            {
                                                item.idbanco == 0 
                                                    ? <TextVazio>Sync: <TextValorSincronizado colorText={'#c71919'} >Não</TextValorSincronizado></TextVazio>
                                                    : <TextVazio>Sync: <TextValorSincronizado colorText={'#3CB371'} >Sim</TextValorSincronizado></TextVazio>
                                            }
                                        </TextEmpresaSync>
                                    </TouchableOpacityListaEmpresas>
                                )}
                                keyExtractor={item => item.id}
                            />
                        
                        </>
                }

            </Container>
        </>
    )

    async function cadastrarFirmaLocalBanco() {

        setLoading(true);
        
        var res = await cadastrarEditarFirmaService(null, firma);

        var idbanco = !res ? 0 : res.firma.idCadastrado;

        await database.write(async () => {
            await database.get<FirmaModel>('firma').create(data => {
                data.idbanco = idbanco,
                data.nome = firma
            })
        });

        limparCampos();
        setLoading(false);
        Alert.alert("Importante", "Empresa criada com sucesso!");

    }

    async function limparCampos() {
        setFirma('');
    }

    async function buscarFirmasLocal() {
            
        const firmaLocal = database.get<FirmaModel>('firma');
        const res = await firmaLocal.query().fetch();

        var resposta: FirmaModel[] = [];
    
        new Promise(() => {
            res.forEach(async (l: any) => {
                resposta.push(l)
            });
        });

        setFirmas(resposta);
    }

    // ---------------------------------------
    // -------- Functions Sincronizar --------
    // ---------------------------------------

    async function sincronizar(){

        setLoading(true);

        var sincronizar = null;

        sincronizar = await sincronizarBackFirma();

        if(sincronizar){
            setTimeout(async () => {
                await sincronizarFrontFirma();
            }, 1000);
        }

        if(!sincronizar){
            await buscarFirmasLocal();
            setLoading(false);
            return;
        }

    }

    async function sincronizarBackFirma(){

        var isConnected = netInfo.isConnected ? true : false;

        if(isConnected){

            const firmaLocal = database.get<FirmaModel>('firma');
            const fir = await firmaLocal.query().fetch();
    
            fir.forEach(async (f: any) => {
                var id = f._raw.idbanco == 0 ? null : f._raw.idbanco;
                await cadastrarEditarFirmaService(id, f._raw.nome);
            });
            
            return true;

        }else{
            await buscarFirmasLocal();
            Alert.alert("Local", "Banco local atualizado com sucesso! 1");
            return false;
        }

    }

    async function sincronizarFrontFirma(){

        var isConnected = netInfo.isConnected ? true : false;

        if(isConnected){
            
            var f = await listarFirmaService();

            if(f.firma){

                await database.write(async () => {
                    await database.collections.get('firma').query().destroyAllPermanently();
                });

                new Promise((resolve, reject) => {
                    f.firma.forEach(async (f: any) => {

                        await database.write(async () => {
                            await database.get<FirmaModel>('firma').create(data => {
                                data.idbanco = f.id,
                                data.nome = f.nome
                            })
                        });
                        
                    });
                });

                setTimeout(async () => {
                    await buscarFirmasLocal();
                    setLoading(false);
                    Alert.alert("API e Local", "Banco Local e API atualizado com sucesso!!!")
                }, 1000);
                return true;              
                
            }else{
                await buscarFirmasLocal();
                Alert.alert("Local", "Banco Local atualizado com sucesso! 2");
                return false;
            }

        }else{
            await buscarFirmasLocal();
            Alert.alert("Local", "Banco Local atualizado com sucesso! 3");
            return false;
        }

    }
    
}

export default CadastrarEmpresa;
