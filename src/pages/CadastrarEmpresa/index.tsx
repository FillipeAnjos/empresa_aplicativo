import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import TextInputComponent from '../../components/TextInputComponent';
import ButtonComponent from "../../components/ButtonComponent";

import { cadastrarFirma as cadastrarFirmaService } from "../../services/ApiService";

import { Container, TextFirma } from './styles';
import { Loading } from "../../components/Loading";

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

function CadastrarEmpresa() {

    const { navigate } = useNavigation<NavigationPropsI>();

    const [loading, setLoading] = useState<boolean>(false);
    const [firma, setFirma] = useState<string>('');
        
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
                                onPress={cadastrarFirma}
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
                }

            </Container>
        </>
    )

    async function cadastrarFirma() {

        if(firma == ''){
            Alert.alert('Importante', 'Favor informar a Empresa.');
            return false;
        }

        setLoading(true);
        
        var fir = await cadastrarFirmaService(firma);

        if(!fir){
            Alert.alert("Importante", "Ocorreu um erro ao cadastrar a Empresa. Contate o administrador do sistema.");
            setFirma('');
            setLoading(false);
            return false;
        }

        setTimeout(() => {
            Alert.alert(!fir.firma.error ? 'Sucesso' : 'Importante', fir.firma.msg); 
            setFirma('');
            setLoading(false);
        }, 990);
        
    }

}

export default CadastrarEmpresa;
