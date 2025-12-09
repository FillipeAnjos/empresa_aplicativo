import React, { useEffect, useState } from "react";
import { Dimensions, View, Text, Image, TouchableOpacity, ActivityIndicator, Alert, Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useLogged } from "../../hooks/logged";
import LivroRepository from "../../repositories/LivroRepository";
import NetInfo from "@react-native-community/netinfo";
import RNFetchBlob from 'rn-fetch-blob';
import { unzip } from 'react-native-zip-archive';
import DeviceInfo from 'react-native-device-info';
import { useAuth } from "../../hooks/auth";

import HomeContinueLendo from "../HomeContinueLendo";
import HomeMinhaBiblioteca from "../HomeMinhaBiblioteca";
import HomeUltimasLeituras from "../HomeUltimasLeituras";
import HomeLivrosBaixados from "../HomeLivrosBaixados";
import { LoadingFlatlist } from "../../components/Loading";
import { HeaderPrimeiro } from "../../components/HeaderPrimeiro";
import { ModalAvaliarApp } from "../../components/modalAvaliarApp";

import { 
    listarBaixados as listarBaixadosApiService,
    listarUltimasLeituras as listarUltimasLeiturasApiService,
    livroListar as livroListarApiService, 
    mostrarModalAvaliacao as mostrarModalAvaliacaoApiService, 
    verificarPermissaoQtdDispositivos as verificarPermissaoQtdDispositivosApiService, 
} from "../../services/ApiService";
import { 
    Container, 
    LivrosBaixadosTexto,
    ViewNenhumaObra,
    TextNenhumaObra,
    MinhaBibliotecaTexto,
    UltimasLeiturasTexto
} from './styles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

function Home() {

    const [dirs, setDirs] = useState(RNFetchBlob.fs.dirs);

    const { buscarHistorico_logged, historicoLogged } = useLogged();
    const { signOut } = useAuth();

    const { navigate } = useNavigation<NavigationPropsI>();
    
    const [loading, setLoading] = useState(true);
    const [loadingUltimasLeituras, setLoadingUltimasLeituras] = useState(true);
    
    const [page, setPage] = useState(1);
    
    const [livroContinueLendo, setLivroContinueLendo] = useState<any>();
    const [uriContinueLendo, setUriContinueLendo] = useState<any>();
    
    const [continueOndeParouListaVazia, setContinueOndeParouListaVazia] = useState<boolean>(true);
    
    const [catalago, setCatalago] = useState<any>();
    const [totalDeRegistros, setTotalDeRegistros] = useState<number>(0);
    const [ultimasLeituras, setUltimasLeituras] = useState<any>([]);
    const [livrosBaixados, setLivrosBaixados] = useState<any>([]);
    const [loadingContinueLendoLivrosBaixados, setLoadingContinueLendoLivrosBaixados] = useState<any>([]);
    
    const [modalFiltrarAvaliarAppVisible, setModalFiltrarAvaliarAppVisible ] = useState(false);

    useEffect( () => {
        verificarDispositivosConectados();

        async function assincronas(): Promise<void> {  
            await chamarModalVerificarAvaliar();
        }

        assincronas();

    }, []);

    useEffect( () => {
        buscarCatalago();
        loadLivroContinueLendo();
        buscarLivrosJaBaixados();
        buscarListarUltimasLeituras();
    }, [historicoLogged]);
    
    return (
        <>

            <ModalAvaliarApp modalVisible={modalFiltrarAvaliarAppVisible} fecharAbrirMoral={ fecharAbrirMoralAvaliarApp } />
            
            <HeaderPrimeiro />

        <Container>

            { continueOndeParouListaVazia ? <View/> : <LivrosBaixadosTexto>Continue de onde parou</LivrosBaixadosTexto>}
        
            {
                continueOndeParouListaVazia
                    ? <View/>
                    : loading == false 
                        ? livroContinueLendo == null 
                            ?   <ViewNenhumaObra>
                                    <TextNenhumaObra>Nenhum Material Disponível</TextNenhumaObra>
                                </ViewNenhumaObra> 
                            : <HomeContinueLendo livro={livroContinueLendo} uri={uriContinueLendo} loading={loading} />
                        : <LoadingFlatlist />
            }

            <Text> </Text>    

            <UltimasLeiturasTexto>Últimas Leituras</UltimasLeiturasTexto>  
            <HomeUltimasLeituras loading={loadingUltimasLeituras} ultimas={ultimasLeituras} buscarUltimasLeituras={ () => buscarListarUltimasLeituras()} totalDeRegistros={0} />   

            <Text> </Text>

            <UltimasLeiturasTexto>Livros Baixados</UltimasLeiturasTexto>  

            {
                loadingContinueLendoLivrosBaixados
                    ? <ActivityIndicator size="large" />
                    : <HomeLivrosBaixados loading={loadingUltimasLeituras} livrosBaixados={livrosBaixados} /> 
            }
              
            <Text> </Text>

            <MinhaBibliotecaTexto>Minha biblioteca</MinhaBibliotecaTexto>  
            <HomeMinhaBiblioteca loading={loading} catalago={catalago} buscarCatalago={ () => buscarCatalago()} totalDeRegistros={totalDeRegistros} />   

            <Text> </Text>

        </Container>

        </>
    )

    async function chamarModalVerificarAvaliar(){

        var modalAvaliar = await mostrarModalAvaliacaoApiService();

        if(!modalAvaliar){
            console.log("Modal Avaliar está com erro (mostrarModalAvaliacaoApiService)! Verificar......");
            return;
        }

        if(modalAvaliar.mostrar){
            setTimeout(() => {
                setModalFiltrarAvaliarAppVisible(true);
            }, 900);
        }

    }

    function fecharAbrirMoralAvaliarApp(){
        var statusModal = modalFiltrarAvaliarAppVisible ? false : true;
        setModalFiltrarAvaliarAppVisible(statusModal);
    }

    async function verificarDispositivosConectados(){

        var phoneModel = DeviceInfo.getModel();
        var deviceId = DeviceInfo.getUniqueId();

        var qtdDispositivos = await verificarPermissaoQtdDispositivosApiService(phoneModel, deviceId);
    
        if(!qtdDispositivos.sucesso){

            Alert.alert('Error', renderizarTitulo(qtdDispositivos.mensagem), [
                {
                  text: 'Cancelar',
                  onPress: () => cancelar(),
                  //style: 'cancelar',
                },
                {text: 'Gerenciar Dispositivos', onPress: () => gerenciarDispositivos(qtdDispositivos.url_dispositivo) },
            ]);

        }
    
    }

    function renderizarTitulo(titulo: any){
        titulo = titulo.replaceAll("\\n", "\n\n")
        return titulo;
    }

    function cancelar(){
        signOut();
        //RNRestart.Restart(); //Reiniciar o App        
    }

    function gerenciarDispositivos(url: any){

        var aplicativo = url; //this.state.condicaoApp == 'liberi' ? 'https://www.liberidigital.com.br/login?redirect=leitor/dispositivo' : 'https://ebooks.intersaberes.com.br/login?redirect=leitor/dispositivo';

        Linking.openURL(aplicativo);

        setTimeout(async () => {
            signOut();
            //RNRestart.Restart(); //Reiniciar o App  
        }, 1000);      
    }

    async function buscarLivrosJaBaixados(): Promise<void> {

        setLivrosBaixados([]);
        setLoadingContinueLendoLivrosBaixados(true);

        let arrayDeLivrosBaixados: any = [];
        
        setTimeout(async () => {
        
            let lBaixados = await listarBaixadosApiService(1);

            lBaixados.forEach(async (e: any, i: number) => {
                var exists = await RNFetchBlob.fs.isDir(`${RNFetchBlob.fs.dirs.DocumentDir}/liberi/livros/livro${e.id_livro}`);

                if(exists){
                    //setLivrosBaixados({ livrosBaixados: [...livrosBaixados,...[e]] });  
                    arrayDeLivrosBaixados.push(e);
                }
            });
            
            setLoadingContinueLendoLivrosBaixados(false);
            
        }, 1500);
    
        setLivrosBaixados(arrayDeLivrosBaixados);              
    
    }

    async function atualizarLivrosBaixados(): Promise<void> {
        //await this.loadLivros();
        await buscarLivrosJaBaixados();
    }

    async function buscarCatalago(): Promise<void> {
        
        let totalRegistros = await livroListarApiService(1, 4);

        if(!totalRegistros.livros){
            console.log("Ocorreu um erro no totalRegistros.livros");
            return;
        }

        setTotalDeRegistros(totalRegistros.livros.length);

        // ----------------------------------------------------------------------------------------------------------------

        let catalagosBuscar = await livroListarApiService(1, 4);
        
        setLoading(false);

        if(catalagosBuscar.livros.length == 0){
            return;
        }

        setPage(page + 1);
        catalago == undefined ? setCatalago(catalagosBuscar.livros) : null;

    }

    async function buscarListarUltimasLeituras(): Promise<void> {

        setLoadingUltimasLeituras(true);

        setTimeout(async () => {
        
            let ultimas = await listarUltimasLeiturasApiService();
    
            if(!ultimas){
                console.log("Ocorreu um erro no buscarListarUltimasLeituras");
                return;
            }
    
            setUltimasLeituras(ultimas);
    
            setLoadingUltimasLeituras(false);

        }, 1500);

    }

    async function loadLivroContinueLendo(){

        // Regra de trazer somente 1 obra para a lista de "Continue de Onde Parou"
        var search = {
            pagina: 1,
            intervalo: 3
        }

        var historicoListar = await buscarHistorico_logged(search);

        if(historicoListar.ultimasLeituras.length == 0 || historicoListar.ultimasLeituras.length == undefined){
            setContinueOndeParouListaVazia(true);
            setLoading(false);
            return;
        }

        setContinueOndeParouListaVazia(false);

        var historicoContinueLendo = historicoListar[0];

        const livro = await LivroRepository.getContinueLendo();

        if(livro != null){
            const uri = await LivroRepository.verifyDownload(livro.id_livro);
    
            setLivroContinueLendo(livro);
            setUriContinueLendo(uri);
        }else{
            setLivroContinueLendo(null);
        }
        
        setLoading(false);

    }
}

export default Home;
