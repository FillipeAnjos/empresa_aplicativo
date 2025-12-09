import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, TouchableWithoutFeedback, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import { useAuth } from "../../hooks/auth";
import { listarBiblioteca as listarBibliotecaApiService } from "../../services/ApiService";
import { Loading } from "../../components/Loading";
import { HeaderPrimeiro } from "../../components/HeaderPrimeiro";

import { 
    Container,
    ImageMinhaBiblioteca, 
    TextoFlatListMinhaBiblioteca, 
    ImageIconesMinhaBiblioteca,
    ImageIconesMinhaBibliotecaFlashcardVideo,
    TextBibliotecaHeader,
    TextoFiltroDeLivros,
    ImageTarjaAmostra
} from './styles';

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Biblioteca() {

    const { signOut } = useAuth();

    const { navigate } = useNavigation<NavigationPropsI>();
    
    const [page, setPage] = useState(1);
    const [loadingBiblioteca, setLoadingBiblioteca] = useState<boolean>(true);
    const [livros, setLivros] = useState<any>([]);

    useEffect( () => {
        loadLivros();
    }, []); 

    return (
        <>

            <HeaderPrimeiro />

        <View style={{ flex:1, backgroundColor: '#fff' }}>

            {
                loadingBiblioteca
                    ? <Loading />
                    : <FlatList
                        //ListHeaderComponent={ this.state.loadingBiblioteca ? <ActivityIndicator size="large" /> : <ContinueLendo navegacao={this.props} condicaoApp={this.state.condicaoApp} /> }
                        style={{ margin: 0, marginTop: 20 }}
                        contentContainerStyle={{ paddingHorizontal: 0 }}
                        onEndReached={ loadLivros }
                        data={livros}
                        numColumns={3}
                        onEndReachedThreshold={0.1}
                        renderItem={({ item, index }: any) => ( 
                            <TouchableWithoutFeedback
                                onPress={ () => navigate("Livro", { livro: item, origemPagina: 'paginaBiblioteca' }) } 
                            >
                                <View style={{ width: windowWidth/3, paddingLeft: 15, marginBottom: 15, flexDirection: "column", justifyContent: "flex-start" }} > 
                                
                                    {!item.url_capa ? <Text>Sem Capa</Text> : <ImageMinhaBiblioteca source={{ uri: item.url_capa }} resizeMode="cover"/>} 
                                    
                                    <ImageIconesMinhaBiblioteca source={require('../../assets/images/icones/iconEbook.png')} />

                                    <TextoFlatListMinhaBiblioteca numberOfLines={2} ellipsizeMode={'tail'}>
                                        {item.titulo}
                                    </TextoFlatListMinhaBiblioteca>

                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        //ListFooterComponent={this.renderFooter}
                    />
            }

            

        </View>

        </>
    )

    async function loadLivros(){

        let l = await listarBibliotecaApiService(page);

        if(l.length == 0){
            return;
        }
        
        setLoadingBiblioteca(false);
        setPage(page + 1);
        livros == undefined ? setLivros(l) : setLivros([...livros, ...l]);
    }

}

export default Biblioteca;
