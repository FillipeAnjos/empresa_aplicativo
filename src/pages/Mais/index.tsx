import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';

import { useAuth } from "../../hooks/auth";
import { ImageBackground } from "react-native";
import UsuarioRepository from "../../repositories/UsuarioRepository";
import { HeaderPrimeiro } from "../../components/HeaderPrimeiro";

interface NavigationPropsI {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
};

function Mais() {

    const { signOut } = useAuth();

    const { navigate } = useNavigation<NavigationPropsI>();
    
    const [user, setUser] = useState<string>();

    useEffect( () => {
        loadUser();
    }, []); 

    return (
        <>

            <HeaderPrimeiro />

        <View>

            <ImageBackground style={{ backgroundColor: 'green', padding:15 }} source={ require("../../assets/backmenu.png") }>
                <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                    {   user 
                        ?   <>
                                <Image source={ require('../../assets/avatar.png') } style={{ height:40, resizeMode: 'contain' }}/>
                                <Text style={{ fontSize:20, color: '#fff' }}>{ user }</Text>
                            </>
                        : null
                    }
                </View>
            </ImageBackground>

            <View 
                style={{ 
                    alignItems: 'flex-end',
                    paddingBottom:5,
                    marginTop:10,
                    marginRight:10,
                    marginLeft:10,
                    borderBottomWidth: 1, 
                    borderBottomColor: 'gray'    
                }}
            >
                <TouchableOpacity accessible={true} accessibilityRole="button" onPress={ () => navigate("PoliticaPrivacidade") }>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize:18, fontWeight:'bold', color: 'gray' }}> Política de privacidade </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View 
                style={{ 
                    alignItems: 'flex-end',
                    paddingBottom:5,
                    marginTop:10,
                    marginRight:10,
                    marginLeft:10,
                    borderBottomWidth: 1, 
                    borderBottomColor: 'gray'    
                }}
            >
                <TouchableOpacity accessible={true} accessibilityRole="button" onPress={ () => navigate("Sobre") }>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize:18, fontWeight:'bold', color: 'gray' }}> Sobre </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View 
                style={{ 
                    alignItems: 'flex-end',
                    paddingBottom:5,
                    marginTop:10,
                    marginRight:10,
                    marginLeft:10,
                    borderBottomWidth: 1, 
                    borderBottomColor: 'gray'    
                }}
            >
                <TouchableOpacity accessible={true} accessibilityRole="button" onPress={ () => signOut() }>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize:18, fontWeight:'bold', color: 'gray' }}> Sair </Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>

        </>
    )

    async function loadUser(){
        let user = await new UsuarioRepository().get();
        setUser(user.usuario.nome);
    }

}

export default Mais;
