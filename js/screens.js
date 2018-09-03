import { Navigation } from 'react-native-navigation';
import MainPage from './page/MainPage';
import IndividualPage from './page/IndividualPage';
import LessonPage from './page/LessonPage';

export function registerScreens() {
    Navigation.registerComponent('MainPage', () => MainPage);
    Navigation.registerComponent('Personal', () => IndividualPage);
    Navigation.registerComponent('LessonPage', () => LessonPage);
  }