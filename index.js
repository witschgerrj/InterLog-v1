import {AppRegistry} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {decode, encode} from 'base-64';
import {name as appName} from './app.json';
import RenderFlow from './RenderFlow';

//optimize memory usage and performance for react-navigation
enableScreens();

//to fix Firebase btoa() error
if (!global.btoa) {
  global.btoa = encode;
}
//to fix Firebase atob() error
if (!global.atob) {
  global.atob = decode;
}

AppRegistry.registerComponent(appName, () => RenderFlow);
