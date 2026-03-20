import { useState, useEffect } from "react";
import { Dimensions, View, Image, Alert, ImageBackground, Keyboard, Linking, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../../hooks/auth";
import NetInfo from '@react-native-community/netinfo';
import UsuarioRepository from "../../repositories/UsuarioRepository";
import { TextInputLogin, TextInputSenha, TextLogin, TextSenha } from './styles';
import { Loading } from "../../components/Loading";
import ButtonComponent from "../../components/ButtonComponent";

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
    
        // -------------------------------------------------
    
        /*try{
            var res: any = await signIn({ login: login, password: senha }); 

            if(res){
                if(res.limite_dispositivos){
                    setLimiteDispositivos(true);

                    var mensagemFixa = 'Sua conta é estritamente para uso pessoal e não pode ser usada em mais de dois dispositivos ao mesmo tempo. Acesse https://primeirossaberes.intersaberes.com/leitor/dispositivo para gerenciar seus dispositivos conectados.';
                    var urlFixa = ``;

                    setLimiteDispositivosMensagem(mensagemFixa); //setLimiteDispositivosMensagem(res.msg);
                    setLimiteDispositivosUrl(urlFixa); //setLimiteDispositivosUrl(res.url_dispositivo);

                    setLimiteDispositivosLoading(false);
                    return;
                }
            }
            
        } catch (e) {
            Alert.alert('Credenciais', 'Usuário ou senha incorretos. Por favor, verifique as informações e tente novamente');
        }*/

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
            <Text style={{ marginLeft: 20, marginTop: 20,  color: '#000', fontSize: 18 }}>Projeto Empresa</Text>
    
            <View 
                style={{ 
                    position: "absolute",
                    paddingHorizontal: 60,
                    paddingVertical: 186,
                    alignSelf: "center",
                    top: '12%'
                }}
            >

                <View style={{ width: 300 }} >

                    <TextLogin>E-mail</TextLogin>
                    <TextInputLogin 
                        placeholder='fulano@email.com'
                        placeholderTextColor="#C0C0C0" 
                        value={login}
                        onChangeText={setLogin}
                    />

                    <TextSenha>Senha</TextSenha>
                    <TextInputSenha
                        placeholder='Digite sua senha' 
                        placeholderTextColor="#C0C0C0" 
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={true}
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
                
                </View>

            </View>
        </>
    }

    function renderizarCadastrar(){
        return <>
            <Text style={{ marginLeft: 20, marginTop: 20,  color: '#000', fontSize: 18 }} onPress={ trocar }> {`<-- Voltar`} </Text>
            <Text style={{ marginLeft: 20, marginTop: 20,  color: '#000', fontSize: 18 }}>Qual deseja cadastrar?</Text>
    
            <View 
                style={{ 
                    position: "absolute",
                    paddingHorizontal: 60,
                    paddingVertical: 186,
                    alignSelf: "center",
                    top: '12%'
                }}
            >

                <View style={{ width: 300 }} >

                    <Text onPress={ () => navigate("CadastrarEmpresa") }>Cadatrar Empresa</Text>

                    <Text> </Text>
                    <Text> </Text>

                    <Text onPress={ () => navigate("CadastrarUsuario") }>Cadatrar Usuario</Text>
                
                </View>

            </View>
        </>
    }

}

export default Login;