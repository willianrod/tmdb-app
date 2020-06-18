import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import axios from 'axios';
import App from './src/App';
import { name as appName } from './app.json';

axios.defaults.baseURL = 'http://35.247.197.197:3000';

AppRegistry.registerComponent(appName, () => App);
