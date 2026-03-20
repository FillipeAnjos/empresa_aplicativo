import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Platform, View, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import AppProvider from './hooks';
import Routes from './routes';

const isAndroid15 = Platform.OS === 'android' && Platform.Version >= 35;

function App(): React.JSX.Element {

  const deviceTheme = useColorScheme();
  
  return (
      <NavigationContainer>
        <StatusBar barStyle={ isAndroid15 ? "dark-content" : "light-content" } />
        <AppProvider>
          <View style={{ flex: 1, marginTop: isAndroid15 ? 50 : 0 }}>
            <Routes />
          </View>
        </AppProvider>
      </NavigationContainer>
  );

}

export default App;
