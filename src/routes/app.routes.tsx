import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Sobre from '../pages/Sobre';
import EditarLancamento from '../pages/EditarLancamento';

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
                <Stack.Screen name="EditarLancamento" component={EditarLancamento} />
            </Stack.Navigator>
        );
    };

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
                                ? <Image style={{ height: 46, resizeMode: 'contain', marginTop: 4  }} source={require('../assets/images/icones/maisSelecionado.png')}/>
                                : <Image style={{ height: 46, resizeMode: 'contain', marginTop: 4  }} source={require('../assets/images/icones/maisNaoSelecionado.png')}/>
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
                name="Sobre " 
                component={Sobre} 
            />
            
        </Tab.Navigator>
    );
}

export default AppRoutes;