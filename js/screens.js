import { Navigation } from 'react-native-navigation';
import MainPage from './page/MainPage';
import IndividualPage from './page/IndividualPage';

export function registerScreens() {
    Navigation.registerComponent('MainPage', () => MainPage);
    Navigation.registerComponent('Personal', () => IndividualPage);
  }