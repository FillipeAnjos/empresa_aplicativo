import { useState, useEffect } from "react";
import { View, Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import KeepAwake from 'react-native-keep-awake';
import { Loading } from "../Loading";

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

function WebViewDiversao(props: any) {

    const { navigate } = useNavigation<NavigationPropsI>();
    
    const [loading, setLoading] = useState<boolean>(true);
    const [uri, setUri] = useState<string>('');

    var webView: any = null;

    useEffect( () => {
        montarPage();
    }, []);

    return(
        <>
            {
                loading
                    ? <Loading />
                    :   <View style={{ flex: 1 }}>     
                            <WebView 
                                useWebKit={true}
                                allowsFullscreenVideo={true}
                                originWhitelist={['*']}
                                allowFileAccess={true}
                                allowUniversalAccessFromFileURLs={true}
                                setAllowFileAccessFromFileURLs={true}
                                javaScriptEnabled={true}
                                startInLoadingState={true}
                                scalesPageToFit={true}
                                onMessage={(v) => onMessage(v)}
                                //source={{ uri: 'https://primeirossaberes.intersaberes.com/extras/mapa-galactico', headers: { "Authorization": `Bearer ${this.state.token}` } }}
                                source={{ uri: uri }}
                            />
                            <KeepAwake />
                        </View>
            }  
        </>   
    )

    function montarPage(){
        setUri('https://primeirossaberes.intersaberes.com/extras/mapa-galactico');

        setTimeout( () => {
            setLoading(false);  
        }, 1000);
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

                //navigate("Livro", { livro: livro });
                navigate("Home");
                
                break;
            case 'requestApi':

                //let data = await execApiService(cmd.data.url, cmd.data.body);
                //sendPostMessage(cmd, data);
                
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

}

export default WebViewDiversao;