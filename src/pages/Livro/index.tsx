import { useState, useEffect } from "react";
import { Alert, PermissionsAndroid, Linking, Text, View, TouchableOpacity, Image, Clipboard } from "react-native";
import { useNavigation } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import { unzip } from 'react-native-zip-archive';
import NetInfo from "@react-native-community/netinfo";
import LivroRepository from "../../repositories/LivroRepository";
import { ModalPageLivro } from "../../components/modalPageLivro";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Loading } from "../../components/Loading";
import { HeaderPrimeiro } from "../../components/HeaderPrimeiro";
import { 
    getVersion as getVersionApiService, 
    download as downloadApiService, 
    downloadLib as downloadLibApiService, 
    getCupomImpressoDigital as getCupomImpressoDigitalApiService 
} from '../../services/ApiService';
import { 
    Container, 
    ContainerImage, 
    ImageLivro, 
    ViewTextImage, 
    TituloText, 
    AutorText, 
    ContainerButons,
    ViewButtonDownload, 
    ViewButtonLer,
    ViewButtonRemover,
    TouchableOpacityButtonDownload, 
    TouchableOpacityButtonLer,
    TouchableOpacityButtonRemover,
    TextButtonDownload,
    TextButtonLer,
    TextButtonRemover,
    TextDescricao,
    TextSinopse,
    TextDetalhes,
    ViewItensDetalhes,
    Text1ItensDetalhes,
    Text2ItensDetalhes
} from './styles';

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

function Livro(props: any) {

    const { livro, origemPagina } = props.route.params;

    origemPagina ? origemPagina : null;

    const { navigate } = useNavigation<NavigationPropsI>();

    const [dirs, setDirs] = useState(RNFetchBlob.fs.dirs);
    const [uri, setUri] = useState(`${dirs.DocumentDir}/liberi/livros/livro${livro.id_livro}`);
    const [downloaded, setDownloaded ] = useState(false);
    const [modalVisible, setModalVisible ] = useState(false);
    const [update, setUpdate ] = useState(false);
    const [isConnected, setIsConnected ] = useState(true);
    const [version, setVersion] = useState('');
    const [botao, setBotao] = useState('Download');
    const [descricaoCompleta, setDescricaoCompleta] = useState(false);

    // ----- Amostra -----
        const [loadingAmostra, setLoadingAmostra] = useState(true);
        const [precoImpresso, setPrecoImpresso] = useState('');
        const [precoEbook, setPrecoEbook] = useState('');
        const [urlLivro, setUrlLivro] = useState('');
        const [urlLoja, setUrlLoja] = useState<any>('');
        const [urlLojaImpresso, setUrlLojaImpresso] = useState<any>(''); 
        const [codigoCupomAmostra, setCodigoCupomAmostra] = useState('');   
        const [precoEbookComDesconto, setPrecoEbookComDesconto] = useState('');       
        const [precoImpressoComDesconto, setPrecoImpressoComDesconto] = useState<any>('');

    // ----- Cupom -----
        const [isCupom, setIsCupom] = useState<boolean>(false);
        const [de, setDe] = useState<string>('');
        const [por, setPor] = useState<string>('');
        const [desconto, setDesconto] = useState<string>('');
        const [descricaoImportante, setDescricaoImportante] = useState<string>('');
        const [copie, setCopie] = useState<string>('');
        const [codigoCupom, setCodigoCupom] = useState<string>('');
        const [urlLivroImpresso, setUrlLivroImpresso] = useState<string>('');
        const [urlCupomLivro, setUrlCupomLivro] = useState<string>('');

    useEffect( () => {

        verificarDownload();
        buscarVersaoLivro(livro);
        buscarInformacoesCupom(livro);
    }, []);

    useEffect( () => {
        livro.comprado == 0 ? buscarInformacoesAmostra(livro) : null;
    }, [livro]);

    return (
        <>

            <HeaderPrimeiro />

        <Container>

            <ModalPageLivro modalVisible={modalVisible} />

            <ContainerImage>
                <ImageLivro source={{ uri: livro.url_capa ? livro.url_capa : livro.capa, }} key={livro.url_capa ? livro.url_capa : livro.capa} resizeMode="cover" />
                <ViewTextImage>
                    <TituloText>{livro.titulo}</TituloText>
                    {
                        livro.autores && livro.autores.length > 0 && livro.autores[0].nome && <AutorText>{livro.autores[0].nome}</AutorText> 
                        /* livro.autores && livro.autores.length > 0 && livro.autores && <AutorText>{livro.autores}</AutorText>*/
                    }
                </ViewTextImage>
            </ContainerImage>

            <ContainerButons>

                {downloaded && <ViewButtonLer>
                                    <TouchableOpacityButtonLer onPress={ () => abrir()}>
                                        <TextButtonLer> Ler </TextButtonLer>
                                    </TouchableOpacityButtonLer>
                                </ViewButtonLer>               
                }

                {(!downloaded || update) && <ViewButtonDownload>
                                                <TouchableOpacityButtonDownload onPress={ () => download(livro.id_livro)}>
                                                    <TextButtonDownload> {botao} </TextButtonDownload>
                                                </TouchableOpacityButtonDownload>
                                            </ViewButtonDownload>
                }

                {downloaded && <ViewButtonRemover>
                                    <TouchableOpacityButtonRemover onPress={ () => remover(livro.id_livro)}>
                                        <TextButtonRemover> Remover </TextButtonRemover>
                                    </TouchableOpacityButtonRemover>
                                </ViewButtonRemover>
                }

            </ContainerButons>

            <TextDescricao>Descrição </TextDescricao>

            {
                !descricaoCompleta
                    ? <>
                        <TextSinopse numberOfLines={2} ellipsizeMode={'tail'}>{livro.sinopse}</TextSinopse>
                        <TextSinopse style={{ marginTop: 10, fontWeight: "bold", fontStyle: "italic", textDecorationLine: "underline" }} onPress={ () => setDescricaoCompleta(descricaoCompleta ? false : true) }>{!descricaoCompleta ? 'Ler mais' : 'Ler menos'}</TextSinopse>
                    </>
                    : <>
                        <TextSinopse>{livro.sinopse}</TextSinopse>
                        <TextSinopse style={{ fontWeight: "bold", fontStyle: "italic", textDecorationLine: "underline" }} onPress={ () => setDescricaoCompleta(descricaoCompleta ? false : true) }>{!descricaoCompleta ? 'Ler mais' : 'Ler menos'}</TextSinopse>
                    </>
            }

            <TextDetalhes>Detalhes</TextDetalhes>

            {version == null 
                ? '' 
                : <ViewItensDetalhes>
                        <Text1ItensDetalhes>Versão:</Text1ItensDetalhes>
                        <Text2ItensDetalhes>{version}</Text2ItensDetalhes>
                    </ViewItensDetalhes>
            }

            {
                livro.paginas 
                    ? <ViewItensDetalhes>
                        <Text1ItensDetalhes>Número de páginas:</Text1ItensDetalhes>
                        <Text2ItensDetalhes>{livro.paginas}</Text2ItensDetalhes>
                    </ViewItensDetalhes> 
                    : ''
            }

            <ViewItensDetalhes>
                <Text1ItensDetalhes>ISBN:</Text1ItensDetalhes>
                <Text2ItensDetalhes>{livro.isbn_digital ? livro.isbn_digital : livro.isbn}</Text2ItensDetalhes>
            </ViewItensDetalhes>

            <ViewItensDetalhes>
                <Text1ItensDetalhes>Idioma:</Text1ItensDetalhes>
                <Text2ItensDetalhes>{livro.descricao_idioma ? livro.descricao_idioma : 'Português'}</Text2ItensDetalhes>
            </ViewItensDetalhes>

            <ViewItensDetalhes>
                <Text1ItensDetalhes>Editora:</Text1ItensDetalhes>
                <Text2ItensDetalhes>Intersaberes</Text2ItensDetalhes>
            </ViewItensDetalhes>


            {
                !isCupom
                    ? urlLivroImpresso
                        ? <View style={{ alignItems: 'center'}}>
                              <TouchableOpacity 
                                style={{ backgroundColor: '#B22222', gap: 0, paddingVertical: 10, borderRadius: 5, marginTop: 20, width: '90%' }}
                                onPress={ () => Linking.openURL(urlLivroImpresso) }
                                >
                                <View
                                  style={{ flexDirection: 'row' }}
                                >
                                  <Image style={{ height: 18, resizeMode: 'contain' }} source={require('../../assets/lib.png')}/>
                                  <Text style={{ color: '#fff' }}>Adquirir versão impressa</Text>
                                </View>
                              </TouchableOpacity>
                              <Text style={{ color: 'gray', marginTop: 10 }}>Versão impressa por {de}</Text>
                            </View> 
                        : null
                          
                    : <View style={{ marginTop: 20, alignItems: 'center', marginBottom: 30 }}>
                        <View style={{ flexDirection: 'row', gap: 24 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, textDecorationLine: 'line-through', color: 'gray' }}>{de}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'gray' }}>{por}</Text>
                      </View>

                        <Text style={{ fontWeight: 'bold', marginTop: 6, color: 'gray' }}>{desconto}</Text>
                        <Text style={{ fontSize: 11, textAlign: 'center', marginTop: 6, color: 'gray' }}>{descricaoImportante}</Text>
                        <Text style={{ fontSize: 11, justifyContent: 'center', fontWeight: 'bold', marginTop: 12, color: 'gray' }}>{copie}</Text>

                        <TouchableOpacity 
                            style={{ 
                                backgroundColor: '#fff', 
                                paddingVertical: 10, borderRadius: 5, 
                                marginTop: 6, 
                                width: '90%', 
                                borderWidth: 1, 
                                borderColor: '#000' 
                            }}
                            onPress={ () => copiarAreaTranferencia() }
                        >
                            <View>
                                <Text style={{ color: '#000', textAlign: 'center' }}>{codigoCupom}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={{ 
                                backgroundColor: '#fb4e47', 
                                paddingVertical: 10, 
                                borderRadius: 5, 
                                marginTop: 4, 
                                width: '90%', 
                                marginBottom: 20 
                            }}
                            onPress={ () => Linking.openURL(urlCupomLivro) }
                        >
                            <View>
                                <Text style={{ color: '#fff', textAlign: 'center'}}>Copiar e ir para o carrinho</Text>
                            </View>
                        </TouchableOpacity>
                          
                    </View>
        }




            {
                livro.comprado == 1
                    ? null
                    : loadingAmostra
                        ? null //<View style={{ marginTop: 20 }}><Loading /></View>
                        : <View style={{ marginTop: 20, marginBottom: 20 }}>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignSelf: "center",
                                            marginBottom: 10
                                        }}
                                    >
                                    
                                    {/*
                                        urlLivro    
                                            ? <TouchableOpacity
                                                style={{
                                                    backgroundColor: '#fb472b',
                                                    borderRadius: 4,
                                                    marginRight: 10
                                                }}
                                                onPress={ () => downloaded ? abrir() : download(livro.id_livro) }
                                            >
                                                <Text 
                                                    style={{ 
                                                        color: '#fff', 
                                                        marginTop: 10, 
                                                        marginBottom: 10, 
                                                        marginLeft: 52, 
                                                        marginRight: 52
                                                    }}>
                                                        Ler amostra
                                                </Text>
                                            </TouchableOpacity>
                                            
                                            : null
                                    */}

                                    {/*
                                        urlLojaImpresso
                                            ? <TouchableOpacity
                                                style={{
                                                    backgroundColor: '#fff',
                                                    borderRadius: 4,
                                                    borderWidth: 1
                                                }}
                                                onPress={ () => Linking.openURL(urlLojaImpresso) }
                                            >
                                                <Text 
                                                    style={{ 
                                                        color: '#000', 
                                                        marginTop: 10, 
                                                        marginBottom: 10, 
                                                        marginLeft: 10, 
                                                        marginRight: 10,
                                                        fontSize: 12
                                                    }}>
                                                        <AntDesign name='book' size={14} style={{ color: '#000', marginRight: 6 }}/>
                                                        <Text> </Text>
                                                        <Text style={{ fontWeight: "bold" }}>R$ {codigoCupomAmostra ? precoImpressoComDesconto : precoImpresso}</Text> 
                                                        <Text> </Text>
                                                        <Text>Livro impresso</Text>
                                                        
                                                </Text>
                                            </TouchableOpacity>
                                            : null
                                    */}
                                    
                                    </View>
                                 

                            { /* *************************************************************************************************************** */}
                            { /* *************************************************************************************************************** */}
                            { /* *************************************************************************************************************** */}

                                {
                                    /*
                                        Ler Amostra - url_livro
                                        Livro impresso - url_livraria_impresso

                                        Comprar na loja - url_livraria_impresso || url_livraria_digital
                                        Ebook - url_livraria_digital
                                    */
                                }
                                    
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignSelf: "center"
                                            }}
                                        >
            
                                        {/*
                                            urlLojaImpresso
                                                ? <TouchableOpacity
                                                    style={{
                                                        backgroundColor: '#fb472b',
                                                        borderRadius: 4,
                                                        marginRight: 10
                                                    }}
                                                    onPress={ () => Linking.openURL(urlLoja) }
                                                >
                                                    <Text 
                                                        style={{ 
                                                            color: '#fff', 
                                                            marginTop: 10, 
                                                            marginBottom: 10, 
                                                            marginLeft: 32, 
                                                            marginRight: 32,
                                                        }}>
                                                            <Text>Comprar na loja</Text>
                                                            <Text> </Text>
                                                            <Ionicons name='briefcase-outline' size={13} style={{ color: '#fff', marginRight: 6 }}/>
                                                    </Text>
                                                </TouchableOpacity>
                                                : null
                                        */}

                                        {/*
                                            urlLoja
                                                ? <TouchableOpacity
                                                    style={{
                                                        backgroundColor: '#fff',
                                                        borderRadius: 4,
                                                        borderWidth: 1
                                                    }}
                                                    onPress={ () => Linking.openURL(urlLoja) }
                                                >
                                                    <Text 
                                                        style={{ 
                                                            color: '#000', 
                                                            marginTop: 10, 
                                                            marginBottom: 10, 
                                                            marginLeft: 30, 
                                                            marginRight: 30,
                                                            fontSize: 12
                                                        }}>
                                                            <AntDesign name='book' size={14} style={{ color: '#000', marginRight: 6 }}/>
                                                            <Text> </Text>
                                                            <Text style={{ fontWeight: "bold" }}>R$ {codigoCupomAmostra ? precoEbookComDesconto : precoEbook}</Text> 
                                                            <Text> </Text>
                                                            <Text>Ebook</Text>
                                                    </Text>
                                                </TouchableOpacity>
                                            : null
                                        */}
                                        </View>
                           
                            
                        </View>
            }

        </Container>

        </>
    )

    function copiarAreaTranferencia(){
      Clipboard.setString(codigoCupom);
      Alert.alert("", "Copiado para a área de transferência!");
    };

    async function buscarInformacoesCupom(livro: any){

        let infoCupom = await getCupomImpressoDigitalApiService(livro.isbn_digital);

        let urlLivroImpresso = infoCupom.url_livraria_impresso;
        let de = infoCupom.preco_impresso;

        if(infoCupom.codigo && infoCupom.descricao_cupom && infoCupom.preco_impresso_com_desconto){

            var deNovo = "De R$ " + de;
            var por = "Por R$ " + infoCupom.preco_impresso_com_desconto;
            var desconto = "CUPOM COM " + infoCupom.porcentagem_cupom + "% de desconto*";
            var descricaoImportante = "Promoção por tempo limitado e desconto não cumulativo com outras promoções do site."; //infoCupom.descricao_cupom;
            var copie = "Copie e cole o código no carrinho de compras";
            var codigoCupom = infoCupom.codigo;
            var urlCupomLivro = infoCupom.url_cupom_livro;

            setIsCupom(true);
            setDe(deNovo);
            setPor(por);
            setDesconto(desconto);
            setDescricaoImportante(descricaoImportante);
            setCopie(copie);
            setCodigoCupom(codigoCupom);
            setUrlLivroImpresso(urlLivroImpresso);
            setUrlCupomLivro(urlCupomLivro);

        }else{
            setIsCupom(false);
            setUrlLivroImpresso(urlLivroImpresso);
            setDe(de);
        }

    }

    async function buscarInformacoesAmostra(livro: any){

        setLoadingAmostra(true);

        var amostra = await getCupomImpressoDigitalApiService(livro.isbn);

        setPrecoImpresso(amostra.preco_impresso);
        setPrecoEbook(amostra.preco_ebook);
        setUrlLivro(amostra.url_livro);
        setUrlLoja(amostra.url_livraria_digital);
        setUrlLojaImpresso(amostra.url_livraria_impresso);
        setCodigoCupomAmostra(amostra.codigo);
        setPrecoEbookComDesconto(amostra.preco_ebook_com_desconto);
        setPrecoImpressoComDesconto(amostra.preco_impresso_com_desconto);

        setLoadingAmostra(false);
    }

    async function verificarDownload(){
        let exists = await RNFetchBlob.fs.isDir(`${dirs.DocumentDir}/liberi/livros/livro${livro.id_livro}`);
        exists ? setDownloaded(true) : setDownloaded(false);
    }

    async function buscarVersaoLivro(livro: any){
        let version = await getVersionApiService(livro.id_livro);
        setVersion(version);

        if(!version){
            console.log("Ocorreu um erro a buscar a versão do livro - buscarVersaoLivro");
            return false;
        }

        let oldVersion = await LivroRepository.getVersion(livro.id_livro);
        let exists = await RNFetchBlob.fs.isDir(`${dirs.DocumentDir}/liberi/livros/livro${livro.id_livro}`);

        if(exists && version != oldVersion){
            setUpdate(true);
            setBotao("Atualizar");
        }
    }

    async function download(id: number){
        NetInfo.fetch().then( async (state) => {
            if(!state.isConnected){
                Alert.alert("Atenção", "É necessário estar online para fazer o download no App.");
                return false;
            }else{
                await downloadVerificado(id);
            }
        });
    }

    async function downloadVerificado(id: number){

        var livro_uri = `${dirs.DocumentDir}/liberi/livros/livro${id}`;

        setBotao("Baixando...");

        //Platform.OS === 'android' && await requestFolderPermission();

        let livro = await downloadApiService(id);

        if(!livro.sucesso){
            setBotao("Downalod");
            return;
        }

        await LivroRepository.setCripto(id, { chave:livro.chave, id_criptografia:livro.id_criptografia });
        await LivroRepository.setVersion(id, `${version}`);

        let existsLib = await RNFetchBlob.fs.isDir(`${dirs.DocumentDir}/liberi/lib`);

        if(existsLib){
          RNFetchBlob.fs.unlink(`${dirs.DocumentDir}/liberi/lib`);
        }

        await downloadLib();

        var path = `${livro_uri}.zip`;

        var targetPath = livro_uri;

        const charset = 'UTF-8';

        RNFetchBlob.fs.writeFile(path, livro.file, 'base64')
        .then((res) => {

            setBotao("Salvando...");

            unzip(path, targetPath, charset)
            .then((res) => {

              RNFetchBlob.fs.unlink(path);
              
              setDownloaded(true);
              setUpdate(false);
              setBotao("Download");

            })
            .catch((error) => {
              RNFetchBlob.fs.unlink(path);
            })
        });
        
    }

    async function downloadLib(){
        setModalVisible(true);

        //Platform.OS === 'android' && await requestFolderPermission();

        let lib = await downloadLibApiService();

        var path = `${dirs.DocumentDir}/liberi/lib.zip`;

        var targetPath = `${dirs.DocumentDir}/liberi`;

        const charset = 'UTF-8';

        RNFetchBlob.fs.writeFile(path, lib.file, 'base64')
        .then((res) => {

            console.log('File', res);
            setBotao("Salvando...");

            unzip(path, targetPath, charset)
            .then((res) => {

                console.log(`unzip completed at ${res}`)
                RNFetchBlob.fs.unlink(path);

                setModalVisible(false);
                setBotao("Download");
              
            })
            .catch((error) => {
                setModalVisible(false);
                RNFetchBlob.fs.unlink(path);
                console.log(error);
            })
        })
        .catch((error) => {
            setModalVisible(false);
            console.log(error)
        });

    }

    async function abrir(){
  
        //Platform.OS === 'android' && await requestFolderPermission();
  
        let existsLib = await RNFetchBlob.fs.isDir(`${dirs.DocumentDir}/liberi/lib`);
        
        if(!existsLib){
          await downloadLib();
        }
  
        var urlNova = `${dirs.DocumentDir}/liberi/livros/livro${livro.id_livro}`;
        setUri(urlNova);
        
        var targetPath = `file://${uri}/`;

        navigate("WebViewPage", { uri: targetPath, livro: livro, origemPagina });
        
    }

    async function remover(id: number){

        var livro_uri = `${dirs.DocumentDir}/liberi/livros/livro${id}`;
  
        Alert.alert(
            'Atenção',
            'Deseja realmente remover este livro?',
            [
                {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Sim', onPress: () => {

                    RNFetchBlob.fs.unlink(livro_uri);
                    setDownloaded(false);
                    setBotao("Download");

                }},
            ],
            { cancelable: false },
        );
  
      }

    async function requestFolderPermission(){

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the Folder 1');
            } else {
                console.log('Folder permission denied 1');
            }
            const granted2 = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted2 === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the Folder 2');
            } else {
                console.log('Folder permission denied 2');
            }
        } catch (err) {
            console.warn(err);
        }
  
    }

}

export default Livro;