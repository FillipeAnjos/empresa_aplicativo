import React, { useEffect, useState } from "react";
import { Dimensions, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import RNFetchBlob from 'rn-fetch-blob';
import { unzip } from 'react-native-zip-archive';
import { useAuth } from "../../hooks/auth";
import { WebView } from 'react-native-webview';
import { 
    getPoliticaPrivacidade as getPoliticaPrivacidadeApiService 
} from "../../services/ApiService";

import { 
    Container, 
} from './styles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

function PoliticaPrivacidade() {

    const [dirs, setDirs] = useState(RNFetchBlob.fs.dirs);
    
    const { signOut } = useAuth();

    const { navigate } = useNavigation<NavigationPropsI>();
    

    const [politica, setPolitica] = useState<any>();
    
    useEffect( () => {
        loadConteudo();
    }, []);

    async function loadConteudo(){
        let conteudo = await getPoliticaPrivacidadeApiService();

        setPolitica(conteudo.politica_privacidade.conteudo);
    }

    return (
        <View style={{ flex: 1 }}>
            
            <WebView 
                originWhitelist={['*']}
                allowFileAccess={true}
                allowUniversalAccessFromFileURLs={true}
                setAllowFileAccessFromFileURLs={true}
                javaScriptEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
                //source={{ uri: this.props.uri }}
                onMessage={ () => console.log("onMessage") }
                source={{ html: politica}}
                //ref={r => (this.webView = r)} 
            />
            
        </View>
    )

}

export default PoliticaPrivacidade;
