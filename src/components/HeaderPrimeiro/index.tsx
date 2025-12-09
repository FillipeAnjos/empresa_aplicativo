import React from 'react';
import { ActivityIndicator, Text, View, Dimensions, Image } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function HeaderPrimeiro(){
    return (
      <View style={{ width: windowWidth * 1.0 }}>
              <View style={{ backgroundColor: '#fff', width: windowWidth * 1.0 }}>
              
                  <View style={{ position: 'relative', width: windowWidth * 1.0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center'}}>
                          <Image style={{ height: 50, width: 70, resizeMode: 'contain' }} source={require('../../assets/images/logo-primeirossaberes-cinza-e-vermelha.png')}/>
                          {/*<TouchableOpacity style={{ alignSelf: 'center', position: 'absolute', right: 0 }} onPress={ () => console.log("eeeeeeeeeeeeeeeeeee") }>
                              <Image style={{ height: 25, width: 40, resizeMode: 'contain' }} source={require('../../assets/images/logo-primeirossaberes-cinza-e-vermelha.png')}/>
                          </TouchableOpacity>*/}
                      </View>
              
              </View>
              <View style={{ backgroundColor: 'red', height: 1 }}></View>
      </View>
    );
}
