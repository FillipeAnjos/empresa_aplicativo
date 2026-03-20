import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import { Image } from 'react-native';

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
                {/*<Stack.Screen name="Livro" component={Livro} />
                <Stack.Screen name="WebViewPage" component={WebViewPage} />*/}
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
            
        </Tab.Navigator>
    );
}

export default AppRoutes;