import React, { useEffect, useState } from "react";
import { Alert, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useLogged } from "../../hooks/logged";
import { useAuth } from "../../hooks/auth";
import { Loading } from "../../components/Loading";

import { SelectList } from "react-native-dropdown-select-list";

import TextInputComponent from '../../components/TextInputComponent';
import ButtonComponent from "../../components/ButtonComponent";

import { 
    listarFirma as listarFirmaService,
    cadastrarEditarUsuario as cadastrarEditarUsuarioService
 } from "../../services/ApiService";

import { 
    Container, 
    TextNome,
    TextSenha,
    TextConfirmarSenha,
    TextInfirmativoSenhas,
    TextInfirmativoSenhas2,
    TextNaoPossuiEmpresa,
    TextSelecioneEmpresa
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

    const { navigate } = useNavigation<NavigationPropsI>();

    const [nome, setNome] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [confirmarSenha, setConfirmarSenha] = useState<string>('');
    const [firmas, setFirmas] = useState<listaFirmaI[] | null>();
    const [firmaSelecionada, setFirmaSelecionada] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect( () => {
        buscarFirmas();
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
                            </>
                }

            </Container>
        </>
    )

    async function cadastrarUsuario() {

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

    
}

export default CadastrarUsuario;
