import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import LivroRepository from "../../repositories/LivroRepository";
import NetInfo from "@react-native-community/netinfo";
import RNFetchBlob from 'rn-fetch-blob';
import { LoadingFlatlist } from "../../components/Loading";
import { 
    ViewImagemDetalhes, 
    ImageContinueLendo, 
    AutorText, 
    TituloText, 
    ViewDetalhes, 
    TextButtonLer, 
    TouchableOpacityButtonLer, 
    ViewButtonLer,
    TextButtonVideo, 
    TouchableOpacityButtonVideo, 
    ViewButtonVideo,
    ImageIconesVideo,
    ImageIconesVideoFlash,
    ViewImagemDetalhesVideo,
    ViewDetalhesVideo,
    TituloTextVideo,
    ImageIconesFlashcard,
    TextButtonFlashcard,
    TituloTextFlashcard,
    TouchableOpacityButtonFlashcard,
    ViewButtonFlashcard,
    ViewDetalhesFlashcard,
    ViewImagemDetalhesFlashcard,
    AutorTextFlashcard,
    ImageTarjaAmostra
} from './styles';

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

function HomeContinueLendo(props: any) {

    const { loading, livro, uri } = props;

    const [dirs, setDirs] = useState(RNFetchBlob.fs.dirs);

    const { navigate } = useNavigation<NavigationPropsI>();

    const [uriContinueLendo, setUriContinueLendo] = useState<any>();

    useEffect( () => {
        if(livro){ verifyDownload(); }
    }, []);
    
    return (
        <>
            {
                <TouchableWithoutFeedback >

                    <ViewImagemDetalhes>

                        <View>
                            <TouchableOpacity onPress={ () => lerContinueLendo()}>
                                <ImageContinueLendo source={{ uri: livro.url_capa ? livro.url_capa : livro.capa }} resizeMode="cover" />
                            </TouchableOpacity>
                            <ImageIconesVideo source={require('../../assets/images/icones/iconEbook.png')} />
                            {
                                livro.comprado == 0
                                    ? <ImageTarjaAmostra source={require('../../assets/images/tarjaAmostra.png')} />
                                    : null
                            }
                        </View>

                        <ViewDetalhes>
                            <TituloText numberOfLines={2} ellipsizeMode={'tail'} >{livro.titulo}</TituloText>
                            {
                                livro.autores != undefined 
                                    ? livro.autores.length > 0 && <AutorText>{livro.autores[0].nome ? livro.autores[0].nome : livro.autores}</AutorText> 
                                    : ''
                            }
                            
                            {uri && <ViewButtonLer>
                                        <TouchableOpacityButtonLer onPress={ () => lerContinueLendo()}>
                                            <TextButtonLer> Abrir </TextButtonLer>
                                        </TouchableOpacityButtonLer>
                                    </ViewButtonLer>
                            }
                        </ViewDetalhes>

                    </ViewImagemDetalhes>

                </TouchableWithoutFeedback>
                       
                    
                        
            }
        </>
        
    )

    // ---------------------------------------- Ebooks ----------------------------------------
        async function verifyDownload(){
            const uri = await LivroRepository.verifyDownload(livro.id_livro);
            setUriContinueLendo(uri);
        }

        function lerContinueLendo(){
            navigate("Livro", { uri: uri, livro: livro })
        }

    // ---------------------------------------- Videos ----------------------------------------
        async function chamarVideo(item: any){
            NetInfo.fetch().then( async (state) => {
                if(!state.isConnected){
                    Alert.alert("Atenção", "Este material está disponível apenas com acesso à internet. Saia e entre novamente no app.");
                    return false;
                }else{
                    await abrirVideo(item);
                }
            });
        }

        async function abrirVideo(item: any){

            var urlNova = `${dirs.DocumentDir}`; // file:///data/user/0/com.appbiblioteca/files/

            var targetPath = `file://${urlNova}/biblioteca/disciplina`;
            
            navigate("WebViewVideo", { uri: targetPath, video: item });

        }

}

export default HomeContinueLendo;

