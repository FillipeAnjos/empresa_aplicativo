import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';

const Auth = createStackNavigator();

function AuthRoutes(): React.JSX.Element {
    return (
        <Auth.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#6bccc5' }
            }}
        >
            <Auth.Screen name="Login" component={Login} />
        </Auth.Navigator>
    );
}

export default AuthRoutes;