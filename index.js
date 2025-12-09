/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

if (typeof String.prototype.replaceAll == "undefined") {  
    String.prototype.replaceAll = function(match, replace) {  
      return this.replace(new RegExp(match, 'g'), () => replace);  
    }  
  }
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
AppRegistry.registerComponent(appName, () => App);


/*
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
*/