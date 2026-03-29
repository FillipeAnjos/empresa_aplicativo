import { useState, useEffect } from "react";
import { Dimensions, View, Image, Alert, ImageBackground, Keyboard, Linking, Text, TouchableOpacity  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../../hooks/auth";
import NetInfo from '@react-native-community/netinfo';
import UsuarioRepository from "../../repositories/UsuarioRepository";
import { Loading } from "../../components/Loading";
import ButtonComponent from "../../components/ButtonComponent";

import TextInputComponent from '../../components/TextInputComponent';

import { ViewContainer, ViewContainerSon, TextLogin, TextSenha, TextInitial, TextSecundary, TextEmpty } from './styles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

function Login() {

    const { navigate } = useNavigation<NavigationPropsI>();

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    
    const [cadastrarEmpresaUsuario, setCadastrarEmpresaUsuario] = useState(false);

    async function logar(){
        
        if(login == ''){
            Alert.alert('Email', 'Favor informar o email.');
            return false;
        }
        if(senha == ''){
            Alert.alert('Senha', 'Favor informar a senha.');
            return false;
        }
    
        try{
            await signIn({ login: login, senha: senha });             
        } catch (e) {
            Alert.alert('Credenciais', 'Usuário ou senha incorretos. Por favor, verifique as informações e tente novamente.');
        }

    }

    useEffect(() => {

    }, []);

    return (
        <>
            { 
                loading 
                    ? <Loading /> 
                    : cadastrarEmpresaUsuario 
                        ? renderizarCadastrar() 
                        : renderizarLogar() 
            }            
        </>
    )

    function trocar(){

        setLoading(true);

        setTimeout(() => {

            cadastrarEmpresaUsuario 
                ? setCadastrarEmpresaUsuario(false) 
                : setCadastrarEmpresaUsuario(true); 

            setLoading(false);

        }, 990);
        
        cadastrarEmpresaUsuario 
            ? setCadastrarEmpresaUsuario(false) 
            : setCadastrarEmpresaUsuario(true); 
    }

    function renderizarLogar(){
        return <>
            <TextInitial>Projeto Empresa</TextInitial>

            <Image 
                source={require('../../assets/imagem-login.png')} 
                style={{ width: 230, height: 158, alignSelf: "center", marginTop: 50 }} 
            />
    
            <ViewContainer>

                <ViewContainerSon>

                    <TextLogin>E-mail</TextLogin>
                    <TextInputComponent
                        label="E-mail"
                        placeholder="Digite seu e-mail"
                        value={login}
                        onChangeText={setLogin}
                        keyboardType="email-address" 
                        placeholderTextColor="#C0C0C0" 
                    />

                    <TextSenha>Senha</TextSenha>
                    <TextInputComponent
                        label="Senha"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChangeText={setSenha}
                        placeholderTextColor="#C0C0C0" 
                        secureTextEntry 
                    />

                    <ButtonComponent
                        title="Logar" 
                        onPress={logar} 
                        color="#6d4598"
                        radius="8px" 
                        paddingVertical="10px"
                        paddingHorizontal="20px"
                        marginTop="10px"
                        marginBottom="10px"
                        fontSize="14px"
                        colorText="#fff"
                    />

                    <ButtonComponent
                        title="Realizar Cadastro" 
                        onPress={trocar} 
                        color="#6d4598"
                        radius="6px" 
                        paddingVertical="4px"
                        paddingHorizontal="40px"
                        marginTop="4px"
                        marginBottom="40px"
                        fontSize="12px"
                        colorText="#fff"
                    />
                
                </ViewContainerSon>

            </ViewContainer>
        </>
    }

    function renderizarCadastrar(){
        return <>

            <ButtonComponent
                title="<- Voltar" 
                onPress={trocar} 
                color="#000"
                radius="6px" 
                paddingVertical="4px"
                paddingHorizontal="40px"
                marginTop="20px"
                marginBottom="0px"
                fontSize="12px"
                colorText="#fff"
            />

            <TextSecundary>O que deseja cadastrar?</TextSecundary>

            <Image 
                source={require('../../assets/imagem-cadastro.png')} 
                style={{ width: 230, height: 159, alignSelf: "center", marginTop: 40 }} 
            />

            <ViewContainer>
                <ViewContainerSon>
                    <TextEmpty onPress={ () => navigate("CadastrarEmpresa") }>Cadatrar Empresa</TextEmpty>
                    <TextEmpty /> 
                    <TextEmpty onPress={ () => navigate("CadastrarUsuario") }>Cadatrar Usuário</TextEmpty>
                </ViewContainerSon>
            </ViewContainer>

        </>
    }

}

export default Login;