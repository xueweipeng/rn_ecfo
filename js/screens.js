import { Navigation } from 'react-native-navigation';
import MainPage from './page/MainPage';
import IndividualPage from './page/IndividualPage';
import LessonPage from './page/LessonPage';
import PlayerPage from './page/PlayerPage';
import MyWebView from './page/MyWebView';
import LoginPage from './login/page/LoginPage';

import AuthCodePage from './login/page/AuthCodePage';
import PasswordPage from './login/page/PasswordPage';

export function registerScreens() {
    Navigation.registerComponent('MainPage', () => MainPage);
    Navigation.registerComponent('Personal', () => IndividualPage);
    Navigation.registerComponent('LessonPage', () => LessonPage);
    Navigation.registerComponent('Player', () => PlayerPage);
    Navigation.registerComponent('WebView', () => MyWebView);
    Navigation.registerComponent('Login', () => LoginPage);
    Navigation.registerComponent('Password', () => PasswordPage);
    Navigation.registerComponent('AuthCode', () => AuthCodePage);
  }