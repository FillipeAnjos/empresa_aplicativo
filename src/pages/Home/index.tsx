import React, { useEffect, useState } from "react";
import { Dimensions, View, Text, Image, TouchableOpacity, ActivityIndicator, Alert, Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useLogged } from "../../hooks/logged";
import RNFetchBlob from 'rn-fetch-blob';
import { useAuth } from "../../hooks/auth";


import { 

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

function Home() {

    const [dirs, setDirs] = useState(RNFetchBlob.fs.dirs);

    const { navigate } = useNavigation<NavigationPropsI>();
    
    useEffect( () => {
        
    }, []);
    
    return (
        <>

            <Container>

                <Text>Homeeeee - Usuário Logadooooooooo</Text>

            </Container>

        </>
    )

    
}

export default Home;
