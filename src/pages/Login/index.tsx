import { useState, useEffect } from "react";
import { Dimensions, View, Image, Alert, ImageBackground, Keyboard, Linking, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../hooks/auth";
import NetInfo from '@react-native-community/netinfo';
import UsuarioRepository from "../../repositories/UsuarioRepository";
import { Container, TextInfo, Form, TextInputLogin, TextInputSenha, ButtonLogar, TextEntrar, TextLogin, TextSenha, TextRecuperarSenha, ButtonCadastro, TextRealizarCadastro } from './styles';
import { Loading } from "../../components/Loading";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Login() {

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const { signIn } = useAuth();

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    
    const [limiteDispositivos, setLimiteDispositivos] = useState<boolean>(false);
    const [limiteDispositivosLoading, setLimiteDispositivosLoading] = useState<boolean>(true);
    const [limiteDispositivosMensagem, setLimiteDispositivosMensagem] = useState('');
    const [limiteDispositivosUrl, setLimiteDispositivosUrl] = useState('');

    async function logar(){

        NetInfo.fetch().then( async(state) => {
            if(!state.isConnected){
                Alert.alert('Internet', 'Você está offiline.');
                return false;
            }else{
                await logarValidacoes();
            }

        });
        
    }
    
    async function logarValidacoes(){
        
        if(login == ''){
            Alert.alert('Email', 'Favor informar o email.');
            return false;
        }
        if(senha == ''){
            Alert.alert('Senha', 'Favor informar a senha.');
            return false;
        }
    
        // -------------------------------------------------
    
        try{
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
        }

    }

    function verificarDispositivosConectado(){
        setLimiteDispositivos(false);
        Linking.openURL(limiteDispositivosUrl);
    }

    function conteudo(){
        return <ImageBackground 
                    source={require('../../assets/images/foguete.png')} 
                    style={{ 
                        position: "absolute",
                        paddingHorizontal: 60,
                        paddingVertical: 186,
                        alignSelf: "center",
                        top: '12%'
                    }}
                >

                    {
                        limiteDispositivos
                            ?   limiteDispositivosLoading
                                    ? <Loading />  
                                    : <View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 6, width: '83%', alignSelf: "center", }}>
                                            <Text style={{  fontSize: 12, color: 'gray' }}>{ limiteDispositivosMensagem }</Text>
                                            <TouchableOpacity
                                                style={{
                                                    marginVertical: 10,
                                                    backgroundColor: '#6d4598',
                                                    borderRadius: 6,
                                                    alignSelf: "center",
                                                    paddingVertical: 6,
                                                    paddingHorizontal: 30
                                                }}
                                                onPress={ () => verificarDispositivosConectado() }
                                            >
                                                <Text style={{ color: '#fff', fontSize: 12 }}>Verificar</Text>
                                            </TouchableOpacity>
                                        </View>
                            :   <View style={{ width: 210 }} >

                                    {/*<TextLogin>E-mail</TextLogin>*/}
                                    <TextInputLogin 
                                        placeholder='Digite seu email'
                                        placeholderTextColor="#C0C0C0" 
                                        value={login}
                                        onChangeText={setLogin}
                                    />

                                    {/*<TextSenha>Senha</TextSenha>*/}
                                    <TextInputSenha
                                        placeholder='Digite sua senha' 
                                        placeholderTextColor="#C0C0C0" 
                                        value={senha}
                                        onChangeText={setSenha}
                                        secureTextEntry={true}
                                    />
                
                                    <ButtonLogar onPress={logar}>
                                        <TextEntrar>Decolar</TextEntrar>
                                    </ButtonLogar>

                                    {/*<ButtonCadastro onPress={ () => Linking.openURL("https://bibliotecadigital.intersaberes.com/public/assinatura?plano=Anual") }>
                                        <TextRealizarCadastro>Realizar Cadastro</TextRealizarCadastro>
                                    </ButtonCadastro>
                                    
                                    <TextRecuperarSenha 
                                        onPress={ () => Linking.openURL("https://play.intersaberes.com/public/recuperar-senha") }
                                    > 
                                        Recuperar Senha?
                                    </TextRecuperarSenha>*/}

                                </View>
                    }

                    
                
                </ImageBackground>
    }

    useEffect(() => {

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => { setKeyboardVisible(true); });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { setKeyboardVisible(false); }); 
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, [isKeyboardVisible]);

    return (
        <ImageBackground 
            source={require('../../assets/images/fundo-login.png')} 
            style={{ flex: 1 }}
        >
            {conteudo()}
            <Image 
                source={require('../../assets/images/logo-primeirossaberes-branca.png')} 
                style={{ 
                    height: 40, 
                    width: 113, 
                    marginTop: 20, 
                    alignSelf: "center" 
                }} 
            />
        </ImageBackground>
    )
}

export default Login;