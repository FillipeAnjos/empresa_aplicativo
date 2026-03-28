import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from "@react-native-community/netinfo";
import { useLogged } from "../../hooks/logged";
import { useAuth } from "../../hooks/auth";
import { Loading } from "../../components/Loading";
import { SelectList } from "react-native-dropdown-select-list";
import TextInputComponent from '../../components/TextInputComponent';
import ButtonComponent from "../../components/ButtonComponent";
import { database } from "../../databases";
import { UsuarioModel } from "../../databases/models/usuarioModel";

import { 
    listarFirma as listarFirmaService,
    cadastrarEditarUsuario as cadastrarEditarUsuarioService,
    listarUsuarios as listarUsuariosService,
 } from "../../services/ApiService";

import { 
    Container, 
    TextNome,
    TextSenha,
    TextConfirmarSenha,
    TextInfirmativoSenhas,
    TextInfirmativoSenhas2,
    TextNaoPossuiEmpresa,
    TextSelecioneEmpresa,
    TextListaUsuario,
    TouchableOpacityListaUsuarios,
    TextUsuarioNome,
    TextUsuarioSync,
    TextVazio,
    TextValorSincronizado,
    TextLinhaExibirEsconder,
    TextExibirEsconder   
} from './styles';


interface listaFirmaI {
  key: number;
  value: string;
  disabled: boolean;
}

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

function CadastrarUsuario() {

    const { } = useLogged();
    const { signOut } = useAuth();

    const netInfo = useNetInfo();
    const { navigate } = useNavigation<NavigationPropsI>();

    const [nome, setNome] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [confirmarSenha, setConfirmarSenha] = useState<string>('');
    const [firmas, setFirmas] = useState<listaFirmaI[] | null>();
    const [firmaSelecionada, setFirmaSelecionada] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(false);
    
    const [exibirCampos, setExibirCampos] = useState<boolean>(true);
    const [usuarios, setUsuarios] = useState<UsuarioModel[]>([]);

    useEffect( () => {
        buscarFirmas();
        buscarUsuariosLocal();
    }, []);
    
    return (
        <>
            <Container>

                {
                    loading
                        ? <Loading />
                        : firmas == null
                            ? <>
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
                                    <TextNaoPossuiEmpresa>Você não possui Empresas cadastrada!</TextNaoPossuiEmpresa>
                                </>
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
                                    marginBottom="0px"
                                    fontSize="12px"
                                    colorText="#fff"
                                />

                                {
                                    exibirCampos
                                        ? <TextExibirEsconder onPress={ () => exibirEsconderCampos(false) }>Esconder Campos</TextExibirEsconder>
                                        : <TextExibirEsconder onPress={ () => exibirEsconderCampos(true) }>Exibir Campos</TextExibirEsconder>
                                }
                                
                                <TextLinhaExibirEsconder />
    
                                {
                                    exibirCampos
                                        ? <>
                                            <TextNome>Qual nome?</TextNome>
                                            <TextInputComponent
                                                label="Qual nome?"
                                                placeholder="Ex: Fillipe dos Anjos"
                                                value={nome}
                                                onChangeText={setNome}
                                                keyboardType="email-address" 
                                                placeholderTextColor="#C0C0C0" 
                                            />

                                            <TextNome>Qual e-mail? Usado para logar</TextNome>
                                            <TextInputComponent
                                                label="Qual e-mail?"
                                                placeholder="Ex: fulano@email.com"
                                                value={login}
                                                onChangeText={setLogin}
                                                keyboardType="email-address" 
                                                placeholderTextColor="#C0C0C0" 
                                            />

                                            <TextSelecioneEmpresa>Selecione a Empresa</TextSelecioneEmpresa>
                                            <SelectList 
                                                inputStyles={{color: 'gray', fontSize: 16}}
                                                dropdownTextStyles={{color: 'gray'}}
                                                setSelected={(val: any) => setFirmaSelecionada(val)} 
                                                data={firmas} 
                                                save="key"
                                            />

                                            <TextInfirmativoSenhas>Abaixo você verá os campos de senha e confirmar senha.</TextInfirmativoSenhas>
                                            <TextInfirmativoSenhas2>São campos de extrema importância e será necessario usá-los para logar no sistema.</TextInfirmativoSenhas2>
                                            
                                            <TextSenha>Qual a senha?</TextSenha>
                                            <TextInputComponent
                                                label="Qual a senha?"
                                                placeholder="Digite sua senha ..."
                                                value={senha}
                                                onChangeText={setSenha}
                                                placeholderTextColor="#C0C0C0" 
                                                secureTextEntry 
                                            />
                                            
                                            <TextConfirmarSenha>Por favor confirmar a senha</TextConfirmarSenha>
                                            <TextInputComponent
                                                label="Qual a senha?"
                                                placeholder="confirme sua senha ..."
                                                value={confirmarSenha}
                                                onChangeText={setConfirmarSenha}
                                                placeholderTextColor="#C0C0C0" 
                                                secureTextEntry
                                            />
                                            
                                            <ButtonComponent
                                                title="Cadastrar Usuário" 
                                                onPress={cadastrarUsuarioLocalBanco}
                                                color="#6d4598"
                                                radius="6px" 
                                                paddingVertical="4px"
                                                paddingHorizontal="40px"
                                                marginTop="4px"
                                                marginBottom="40px"
                                                fontSize="12px"
                                                colorText="#fff"
                                            />
                                        </>
                                    : null
                                }

                                <TextListaUsuario>Listas dos Usuários Cadastrados</TextListaUsuario>
                                                            
                                <FlatList
                                    data={usuarios}
                                    style={{ marginBottom: 60 }}
                                    renderItem={({ item }) => (
                                        <TouchableOpacityListaUsuarios 
                                            onPress={ 
                                                () => console.log("Editar Usuario")
                                            }
                                        >
                                            <TextUsuarioNome>{item.nome}</TextUsuarioNome>
                                            <TextUsuarioSync>
                                                {
                                                    item.idbanco == 0 
                                                        ? <TextVazio>Sync: <TextValorSincronizado colorText={'#c71919'} >Não</TextValorSincronizado></TextVazio>
                                                        : <TextVazio>Sync: <TextValorSincronizado colorText={'#3CB371'} >Sim</TextValorSincronizado></TextVazio>
                                                }
                                            </TextUsuarioSync>
                                        </TouchableOpacityListaUsuarios>
                                    )}
                                    keyExtractor={item => item.id}
                                />

                            </>
                }

            </Container>
        </>
    )

    async function cadastrarUsuarioLocalBanco() {

        if(nome == '' || login == '' || senha == '' || confirmarSenha == '' || firmaSelecionada == 0){
            Alert.alert("Aviso", "Todos os campos devem estar preenchidos.");
            return;
        }

        if(senha != confirmarSenha){
            Alert.alert("Aviso", "As senhas devem ser iguais!");
            return;
        }

        var usuario = {
            id: null,
            nome: nome,
            login: login,
            senha: senha,
            firma_id: firmaSelecionada,
            confirma_senha: confirmarSenha,
        }
   
        var usu = await cadastrarEditarUsuarioService(usuario);

        var idbanco = !usu ? 0 : usu.usuario.idCadastrado;
        var senhaHashOuOriginal = !usu ? senha : usu.usuario.senhaCadastrada;
        
        new Promise( async() => {
            await database.write(async () => {
                await database.get<UsuarioModel>('usuario').create(data => {
                    data.idbanco = idbanco,
                    data.nome = nome,
                    data.login = login,
                    data.senha = senhaHashOuOriginal,
                    data.firma_id = firmaSelecionada
                })
            });
        });

        limparCampos();
        await buscarUsuariosLocal();
        setLoading(false);
        Alert.alert("Importante", "Usuário criado com sucesso!");

        /*
        if(!usu){
            Alert.alert("Importante", "Ocorreu um erro ao cadastrar o usuário. Contate o administrador do sistema.");
            limparCampos();
            setLoading(false);
            return false;
        }

        setTimeout(() => {
            Alert.alert(usu.usuario.status == 200 ? 'Sucesso' : 'Error', usu.usuario.msg); 
            limparCampos();
            setLoading(false);
        }, 990);
        */
        
    }

    async function buscarFirmas() {

        setLoading(true);

        var lista = await listarFirmaService();

        lista = lista == false ? null : lista;

        if(lista == null){
            setFirmas(null)
            setLoading(false);
            return false;
        }

        var lis: listaFirmaI[] = [];

        lista.firma.forEach((l: any) => {
            lis.push({ key: l.id, value: l.nome, disabled: false });
        });

        setTimeout(() => {
            setFirmas(lis);
            setLoading(false);
        }, 990);

    }

    function limparCampos(){
        setNome('');
        setLogin('');
        setSenha('');
        setConfirmarSenha('');
        setFirmaSelecionada(0);
    }

    function exibirEsconderCampos(condicao: boolean){
        setLoading(true);
        setExibirCampos(condicao);
        setTimeout(async () => {
            setLoading(false);
        }, 800);
    }

    //async function limparCampos() {
    //    setFirma('');
    //}

    async function buscarUsuariosLocal() {
            
        const usuarioLocal = database.get<UsuarioModel>('usuario');
        const res = await usuarioLocal.query().fetch();

        var resposta: UsuarioModel[] = [];
    
        new Promise(() => {
            res.forEach(async (l: any) => {
                resposta.push(l)
            });
        });

        setUsuarios(resposta);
    }

    // ---------------------------------------
    // -------- Functions Sincronizar --------
    // ---------------------------------------

    async function sincronizar(){

        setLoading(true);

        var sincronizar = null;

        sincronizar = await sincronizarBackUsuario();

        if(sincronizar){
            setTimeout(async () => {
                await sincronizarFrontUsuario();
            }, 1000);
        }

        if(!sincronizar){
            await buscarUsuariosLocal();
            setLoading(false);
            return;
        }

    }

    async function sincronizarBackUsuario(){

        var isConnected = netInfo.isConnected ? true : false;

        if(isConnected){

            const usuarioLocal = database.get<UsuarioModel>('usuario');
            const user = await usuarioLocal.query().fetch();
    
            user.forEach(async (u: any) => {
                var id = u._raw.idbanco == 0 ? null : u._raw.idbanco;

                var usuario = {
                    id: id, 
                    nome: u._raw.nome, 
                    login: u._raw.login, 
                    senha: u._raw.senha, 
                    confirma_senha: null, 
                    firma_id: u._raw.firma_id
                }

                await cadastrarEditarUsuarioService(usuario);
            });
            
            return true;

        }else{
            await buscarUsuariosLocal();
            Alert.alert("Local", "Banco local atualizado com sucesso! 1");
            return false;
        }

    }

    async function sincronizarFrontUsuario(){

        var isConnected = netInfo.isConnected ? true : false;

        if(isConnected){
            
            var u = await listarUsuariosService();

            if(u.usuario){

                await database.write(async () => {
                    await database.collections.get('usuario').query().destroyAllPermanently();
                });

                new Promise((resolve, reject) => {
                    u.usuario.forEach(async (u: any) => {

                        await database.write(async () => {
                            await database.get<UsuarioModel>('usuario').create(data => {
                                data.idbanco = u.id,
                                data.nome = u.nome,
                                data.login = u.login,
                                data.senha = u.senha,
                                data.firma_id = u.firma_id
                            })
                        });
                        
                    });
                });

                setTimeout(async () => {
                    await buscarUsuariosLocal();
                    setLoading(false);
                    Alert.alert("API e Local", "Banco Local e API atualizado com sucesso!!!")
                }, 1000);
                return true;              
                
            }else{
                await buscarUsuariosLocal();
                Alert.alert("Local", "Banco Local atualizado com sucesso! 2");
                return false;
            }

        }else{
            await buscarUsuariosLocal();
            Alert.alert("Local", "Banco Local atualizado com sucesso! 3");
            return false;
        }

    }


}

export default CadastrarUsuario;
