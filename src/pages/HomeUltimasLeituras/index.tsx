import React, { useState } from 'react';
import { FlatList, TouchableWithoutFeedback, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoadingFlatlist } from '../../components/Loading';
import NetInfo from "@react-native-community/netinfo";
import RNFetchBlob from 'rn-fetch-blob';
import { 
    ContainerFlatListUltimasLeituras, 
    ImageUltimasLeituras, 
    TextoFlatListUltimasLeituras,
    ViewImagemIconesUltimasLeituras,
    ImageIconesUltimasLeituras, 
    ViewContainerImageButtonBiblioteca,
    TextUmAcervo,
    TouchableOpacityUmAcervoButton,
    TextUmAcervoButton,
    ImageTarjaAmostra
} from './styles';

interface PropsI{
    loading: boolean;
    ultimas: any;
    buscarUltimasLeituras: () => void;
    totalDeRegistros: number;
    //atualizarLivrosBaixados: () => void;
}

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

const HomeUltimasLeituras = (props: PropsI) => {

    const { navigate } = useNavigation<NavigationPropsI>();

    const [dirs, setDirs] = useState(RNFetchBlob.fs.dirs);

    const { loading, ultimas, buscarUltimasLeituras, totalDeRegistros } = props;

    return (
        <>
            {
                loading == false ? 
                    <FlatList
                        horizontal={true}
                        data={ultimas}
                        style={{ }}
                        onEndReachedThreshold={0.1}
                        renderItem={({ item, index }: any) => ( 
                            <>
                            {
                                index != 3
                                    ?   <TouchableWithoutFeedback onPress={ () => navigate("Livro", { livro: item }) }>
                                        <ContainerFlatListUltimasLeituras>
                                            <ViewImagemIconesUltimasLeituras>
                                                <ImageUltimasLeituras resizeMode="cover" source={{ uri: item.url_capa }} />

                                                <ImageIconesUltimasLeituras source={require('../../assets/images/icones/iconEbook.png')} />
                                                
                                                {
                                                    item.comprado == 0
                                                        ? <ImageTarjaAmostra source={require('../../assets/images/tarjaAmostra.png')} />
                                                        : null
                                                }
                                                
                                            </ViewImagemIconesUltimasLeituras>
                                            <TextoFlatListUltimasLeituras numberOfLines={2} ellipsizeMode={'tail'} >
                                                {item.titulo}
                                            </TextoFlatListUltimasLeituras>
                                        </ContainerFlatListUltimasLeituras>
                                    </TouchableWithoutFeedback>
                                : <>
                                    {/*<ImageUltimasLeituras resizeMode="cover" source={require('../../assets/images/background/bannerLink.png')} />    

                                    <ViewContainerImageButtonBiblioteca>
                                        <TextUmAcervo>
                                            {`Um acervo com mais de ${totalDeRegistros} itens para você.`}
                                        </TextUmAcervo>
                                        <TouchableOpacityUmAcervoButton onPress={ () => navigate("Biblioteca") }>
                                            <TextUmAcervoButton>Abrir</TextUmAcervoButton>
                                        </TouchableOpacityUmAcervoButton>
                                    </ViewContainerImageButtonBiblioteca>*/}
                                  </>    
                            }
                            </>
                         )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                :
                <LoadingFlatlist />
            }   
        </>
    )

}

export default HomeUltimasLeituras;