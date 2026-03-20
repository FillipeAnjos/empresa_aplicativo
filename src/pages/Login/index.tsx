import { useState, useEffect } from "react";
import { Dimensions, View, Image, Alert, ImageBackground, Keyboard, Linking, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../../hooks/auth";
import NetInfo from '@react-native-community/netinfo';
import UsuarioRepository from "../../repositories/UsuarioRepository";
import { Container, TextInfo, Form, TextInputLogin, TextInputSenha, ButtonLogar, TextEntrar, TextLogin, TextSenha, TextRecuperarSenha, ButtonCadastro, TextRealizarCadastro } from './styles';
import { Loading } from "../../components/Loading";

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
                    var urlFixa = `https://primeirossaberes.intersaberes.com/leitor/dispositivo`;

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
            { cadastrarEmpresaUsuario ? renderizarCadastrar() : renderizarLogar() }            
        </>
    )

    function trocar(){
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

                    <ButtonLogar onPress={logar}>
                        <TextEntrar>Logar</TextEntrar>
                    </ButtonLogar>



                    <ButtonCadastro onPress={ trocar }>
                        <TextRealizarCadastro>Realizar Cadastro</TextRealizarCadastro>
                    </ButtonCadastro>
                    
                    {/*<TextRecuperarSenha 
                        onPress={ () => Linking.openURL("") }
                    > 
                        Recuperar Senha?
                    </TextRecuperarSenha>*/}
                
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