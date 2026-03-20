import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import CadastrarEmpresa from '../pages/CadastrarEmpresa';
import CadastrarUsuario from '../pages/CadastrarUsuario';

const Auth = createStackNavigator();

function AuthRoutes(): React.JSX.Element {
    return (
        <Auth.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#fff' }
            }}
        >
            <Auth.Screen name="Login" component={Login} />
            <Auth.Screen name="CadastrarEmpresa" component={CadastrarEmpresa} />
            <Auth.Screen name="CadastrarUsuario" component={CadastrarUsuario} />
        </Auth.Navigator>
    );
}

export default AuthRoutes;