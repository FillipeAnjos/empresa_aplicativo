import { useState, useEffect, useRef } from "react";
import { View, Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import KeepAwake from 'react-native-keep-awake';
import RNFetchBlob from 'rn-fetch-blob';
import DeviceInfo from 'react-native-device-info';
import LivroRepository from '../../repositories/LivroRepository';
import { getHtml } from '../../helpers/Functions';
import { useLogged } from "../../hooks/logged";
import { 
    exec as execApiService, 
    registrarAcesso as registrarAcessoApiService
} from '../../services/ApiService';

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

function WebViewPage(props: any) {

    const { uri, livro, origemPagina } = props.route.params;
    
    const { navigate } = useNavigation<NavigationPropsI>();

    const [html, setHtml] = useState(getHtml());
    const [dirs, setDirs] = useState(RNFetchBlob.fs.dirs);

    const { atualizarHistorico_logged } = useLogged();

    //var webView = useRef<any>(null);
    var webView: any = null;

    useEffect( () => {
        renderizarLivro();
        salvarHistorico();
    }, [livro.id_livro]);

    return(
        <View style={{ flex: 1 }}>     
            <WebView 
                originWhitelist={['*']}
                allowFileAccess={true}
                allowUniversalAccessFromFileURLs={true}
                setAllowFileAccessFromFileURLs={true}
                javaScriptEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
                onMessage={onMessage}
                source={{ html: html, baseUrl: uri }}
                ref={(r: any) => webView = r} 
            />
            <KeepAwake />
        </View>
    )

    async function renderizarLivro(){

        KeepAwake.activate();

        const keys = await LivroRepository.getCripto(livro.id_livro);
        RNFetchBlob.fs.readFile(`${dirs.DocumentDir}/liberi/index.html`, 'utf8')
        .then((html) => {
            //keys{cha ve, id_criptografia}

            html = html.replaceAll('<div id="crt">',"");
            html = html.replaceAll('${this.props.route.params.uri}', uri);
            html = html.replaceAll('##URI##', uri);
            
            html = html.replaceAll('##APPID##', 4);

            html = html.replaceAll('##IDCRIPTOGRAFIA##',keys.id_criptografia);
            html = html.replaceAll('##CHAVE##',keys.chave);
            //html = html.replaceAll('##PHONEMODEL##',DeviceInfo.getSystemName());
            /*DeviceInfo.getDevice().then(value => {
                let html = this.state.html;
                html = html.replaceAll('##PHONEMODEL##',value);
                this.setState({html});
            });*/
            //html = html.replaceAll('e-shadow','Amendoim');
            html = html.replaceAll('##UNIQUEKEY##',DeviceInfo.getUniqueId());
            html = html.replaceAll('##PHONEMODEL##',DeviceInfo.getModel());
            html = html.replaceAll('##SYSTEM##',DeviceInfo.getSystemName());

            DeviceInfo.getMacAddress().then(value => {
                    html = html.replaceAll('##MACADDRESS##',value);
                    setHtml(html);
                });
            DeviceInfo.getManufacturer().then(value => {
                    html = html.replaceAll('##MANUFACTURER##',value);
                    setHtml(html);
                });
            DeviceInfo.getDevice().then(value => {
                    html = html.replaceAll('##DEVICE##',value);
                    setHtml(html);
                });
            DeviceInfo.getDeviceName().then(value => {
                    html = html.replaceAll('##DEVICENAME##',value);
                    setHtml(html);
                });
            setHtml(html);
        })

        LivroRepository.setContinueLendo(livro);

    }

    async function onMessage(event: any){
        
        var cmd = JSON.parse(event.nativeEvent.data);

        switch (cmd.functionName) {
            case 'open':
                Linking.canOpenURL(cmd.data.url).then(supported => {
                    if (supported) {
                      Linking.openURL(cmd.data.url);
                    } else {
                      console.log("Don't know how to open URI: " + cmd.data.url);
                    }
                  });
                break;
            case 'backMenu':

                origemPagina ? navigate("Biblioteca") : navigate("Home");
                
                break;
            case 'requestApi':

                let data = await execApiService(cmd.data.url, cmd.data.body);
                sendPostMessage(cmd, data);
                
                break;
            default:
                break;
        }

    }

    function sendPostMessage(cmd: any, result: any){
        webView.postMessage(JSON.stringify({ cmd, result }));


        /*const message = 'Hello from React Native!';
        webView.current.injectJavaScript(`
          (function() {
            document.dispatchEvent(new MessageEvent('message', { data: '${message}' }));
          })();
        `);*/

    }

    async function salvarHistorico(){

        var inserirHistorico = {
            id: livro.id_acervo ? livro.id_acervo : livro.id,
            tipo: livro.tipo
        }

        var res = await registrarAcessoApiService(inserirHistorico);
        res.sucesso

        atualizarHistorico_logged();

    }


}

export default WebViewPage;