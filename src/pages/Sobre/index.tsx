import React, { useEffect, useState } from "react";
import { Dimensions, View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import { useAuth } from "../../hooks/auth";

import { 
    Container, 
} from './styles';

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

function Sobre() {

    const [dirs, setDirs] = useState(RNFetchBlob.fs.dirs);
    
      const { signOut } = useAuth();

    const { navigate } = useNavigation<NavigationPropsI>();

    return (
        <ScrollView >
            <View style={styles.container}>
                <Text style={styles.text}>
                    Por que a editora Intersaberes criou o selo infantil "Primeiros Saberes"?
                </Text>
                <Text style={styles.text2}>
                    Em um mercado editorial em constante evolução, a Intersaberes, tradicionalmente focada em livros acadêmicos, 
                    viu uma oportunidade estratégica ao lançar um selo infantil, "Primeiros Saberes". Essa iniciativa não só 
                    diversifica o portfólio, mas reforça a missão da editora em democratizar o conhecimento, mas agora com foco 
                    em uma nova faixa de público: crianças com idade entre 4 e 10 anos. Sendo assim, a Intersaberes lançou mão de 
                    todos os seus esforços para conceber uma linha de obras que irá propor reflexões fundamentais para o 
                    desenvolvimento socioemocional desses pequenos cidadãos que irão moldar o futuro do mundo.
                </Text>

                <TouchableOpacity
                    onPress={ () => navigate("Mais") }
                    style={{ alignItems: "flex-end", marginTop: 60, marginRight: 10 }}
                >
                    <Text style={{ fontSize: 16 }}>Voltar</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container:{
        padding:15,
        //backgroundColor: '#fff'
    },
    text:{
        fontSize:16,
        paddingTop:10,
        color: 'gray',
        fontWeight: "bold"
    },
    text2:{
        fontSize:16,
        paddingTop:10,
        color: 'gray'
    }
});

export default Sobre;
