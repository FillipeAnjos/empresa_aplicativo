import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Biblioteca from '../pages/Biblioteca';
import Mais from '../pages/Mais';
import Livro from '../pages/Livro';
import Sobre from '../pages/Sobre';
import PoliticaPrivacidade from '../pages/PoliticaPrivacidade';
import WebViewPage from '../components/WebView';
import { Image } from 'react-native';
import WebViewDiversao from '../components/WebView/WebViewDiversao';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppRoutes(): React.JSX.Element {

    const HomeRoutersStack: React.FC = () => {
        return (
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Livro" component={Livro} />
                <Stack.Screen name="WebViewPage" component={WebViewPage} />
            </Stack.Navigator>
        );
    };

    const BibliotecaRoutersStack: React.FC = () => {
        return (
            <Stack.Navigator
                initialRouteName="Biblioteca"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Biblioteca" component={Biblioteca} />
                <Stack.Screen name="Livro" component={Livro} />
                <Stack.Screen name="WebViewPage" component={WebViewPage} />
            </Stack.Navigator>
        );
    };

    const MaisRoutersStack: React.FC = () => {
        return (
            <Stack.Navigator
                initialRouteName="Mais"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Mais" component={Mais} />
                <Stack.Screen name="Sobre" component={Sobre} />
                <Stack.Screen name="PoliticaPrivacidade" component={PoliticaPrivacidade} />
            </Stack.Navigator>
        );
    };

    // --------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------
    
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false, 
            }}
        >
            <Tab.Screen 
                options={{ 
                        headerShown: false, 
                        tabBarActiveTintColor: 'purple', 
                        tabBarIcon: ({ focused, color, size }) => ( 
                            focused  
                                ? <Image style={{ height: 46, resizeMode: 'contain', marginTop: 4  }} source={require('../assets/images/icones/homeSelecionado.png')}/>
                                : <Image style={{ height: 46, resizeMode: 'contain', marginTop: 4  }} source={require('../assets/images/icones/homeNaoSelecionado.png')}/>
                        ),
                        tabBarLabelStyle: { 
                            height: 22, 
                            fontSize: 10 
                        }, 
                        tabBarItemStyle: { 
                            borderTopColor: 'red', 
                            borderTopWidth: 1
                        } 
                    }} 
                name="Home " 
                component={HomeRoutersStack} 
            />
            <Tab.Screen 
                options={{ 
                        headerShown: false, 
                        tabBarActiveTintColor: 'purple', 
                        tabBarIcon: ({ focused, color, size }) => ( 
                            focused  
                                ? <Image style={{ height: 47, resizeMode: 'contain', marginTop: 4  }} source={require('../assets/images/icones/bibliotecaSelecionado.png')}/>
                                : <Image style={{ height: 47, resizeMode: 'contain', marginTop: 4  }} source={require('../assets/images/icones/bibliotecaNaoSelecionado.png')}/>
                        ),
                        tabBarLabelStyle: { 
                            height: 22, 
                            fontSize: 10 
                        }, 
                        tabBarItemStyle: { 
                            borderTopColor: 'red', 
                            borderTopWidth: 1
                        } 
                    }} 
                name="Biblioteca " 
                component={BibliotecaRoutersStack} 
            />
            <Tab.Screen 
                options={{ 
                        headerShown: false, 
                        tabBarActiveTintColor: 'purple', 
                        tabBarIcon: ({ focused, color, size }) => ( 
                            focused  
                                ? <Image style={{ height: 47, resizeMode: 'contain', marginTop: 4  }} source={require('../assets/images/icones/diversaoSelecionado.png')}/>
                                : <Image style={{ height: 47, resizeMode: 'contain', marginTop: 4  }} source={require('../assets/images/icones/diversaoNaoSelecionado.png')}/>
                        ),
                        tabBarLabelStyle: { 
                            height: 22, 
                            fontSize: 10 
                        }, 
                        tabBarItemStyle: { 
                            borderTopColor: 'red', 
                            borderTopWidth: 1
                        } 
                    }} 
                name="Diversao " 
                component={WebViewDiversao} 
            />
            <Tab.Screen 
                options={{ 
                        headerShown: false, 
                        tabBarActiveTintColor: 'purple', 
                        tabBarIcon: ({ focused, color, size }) => ( 
                            focused  
                                ? <Image style={{ height: 50, resizeMode: 'contain',  }} source={require('../assets/images/icones/maisSelecionado.png')}/>
                                : <Image style={{ height: 50, resizeMode: 'contain',  }} source={require('../assets/images/icones/maisNaoSelecionado.png')}/>
                        ),
                        tabBarLabelStyle: { 
                            height: 22, 
                            fontSize: 10 
                        }, 
                        tabBarItemStyle: { 
                            borderTopColor: 'red', 
                            borderTopWidth: 1
                        },
                    }} 
                name="Mais " 
                component={MaisRoutersStack} 
            />
        </Tab.Navigator>
    );
}

export default AppRoutes;