import { Linking } from "react-native";
import { Loading } from "../../components/Loading";
import { 
    Container,
    ImagemLogo,
    ViewVersaoDisponivel,
    TextVazia,
    TouchableOpacityContainer,
    TextButton,
    TextCaso,
    TextFavorSair
} from './styles';
import { useEffect, useState } from "react";

function AppDesatualizado() {

    const [loading, setLoading] = useState(true);

    useEffect( () => {
        setTimeout(async () => {
            setLoading(false);
        }, 700); 
    }, []);

    return (
        <>
        {
            loading
                ? <Loading />
                : <Container>
               
                    <ImagemLogo source={require('../../assets/images/logo-primeirossaberes-cinza-e-vermelha.png')}/>

                    <ViewVersaoDisponivel>
                        <TextVazia>Há uma nova versão do app disponível.</TextVazia>
                        <TextVazia>Poderá ocorrer erros na sua execução.</TextVazia>
                        <TextVazia>Favor atualize o app para continuar.</TextVazia>
                    </ViewVersaoDisponivel>

                    <TouchableOpacityContainer 
                        onPress={ () => Linking.openURL('https://play.google.com/store/apps/details?id=com.appprimeirosaberes') }
                    >
                        <TextButton>Atualizar agora</TextButton>
                    </TouchableOpacityContainer>

                    <ViewVersaoDisponivel>
                        <TextCaso>OBS: Caso não apareça o botão de atualizar,</TextCaso>
                        <TextFavorSair>favor sair e entrar novamente na Play Store.</TextFavorSair>
                    </ViewVersaoDisponivel>
            
                </Container>
        }
        </>
    )
}

export default AppDesatualizado;