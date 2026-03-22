import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useLogged } from "../../hooks/logged";
import { useAuth } from "../../hooks/auth";

import TextInputComponent from '../../components/TextInputComponent';
import ButtonComponent from "../../components/ButtonComponent";

import {  } from "../../services/ApiService";

import { 
    Container, 
    TextNome,
    TextSenha,
    TextConfirmarSenha,
    TextInfirmativoSenhas,
    TextInfirmativoSenhas2
} from './styles';

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

function CadastrarUsuario() {

    const { } = useLogged();
    const { signOut } = useAuth();

    const { navigate } = useNavigation<NavigationPropsI>();

    const [nome, setNome] = useState();
    const [login, setLogin] = useState();
    const [senha, setSenha] = useState();
    const [confirmarSenha, setConfirmarSenha] = useState();
    
    useEffect( () => {
        
    }, []);
    
    return (
        <>

            <Container>

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

                <TextNome>Qual nome?</TextNome>
                <TextInputComponent
                    label="Qual nome?"
                    placeholder="Ex: Fillipe dos Anjos"
                    value={nome}
                    onChangeText={setNome}
                    keyboardType="email-address" 
                    placeholderTextColor="#C0C0C0" 
                />


                <TextNome>Qual e-mail?</TextNome>
                <TextInputComponent
                    label="Qual e-mail?"
                    placeholder="Ex: fulano@email.com"
                    value={login}
                    onChangeText={setLogin}
                    keyboardType="email-address" 
                    placeholderTextColor="#C0C0C0" 
                />





                {/* AQUI IRA ENTRAR O CAMPO EMPRESA COM AS EMPRESAS/FIMAS JÁ CADASTRADA NO SISTEMA */}





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
                    onPress={cadastrarUsuario}
                    color="#6d4598"
                    radius="6px" 
                    paddingVertical="4px"
                    paddingHorizontal="40px"
                    marginTop="4px"
                    marginBottom="40px"
                    fontSize="12px"
                    colorText="#fff"
                />

            </Container>

        </>
    )

    async function cadastrarUsuario() {
        
        console.log("Cadastras usuário aqui");
        console.log("Cadastras usuário aqui");
        console.log("Cadastras usuário aqui");
        console.log("Cadastras usuário aqui");
        console.log("Cadastras usuário aqui");
        console.log("Cadastras usuário aqui");
        console.log("Cadastras usuário aqui");

    }

    
}

export default CadastrarUsuario;
