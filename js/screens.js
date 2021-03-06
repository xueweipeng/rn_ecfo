import { Navigation } from 'react-native-navigation';
import MainPage from './page/MainPage';
import IndividualPage from './page/IndividualPage';
import LessonPage from './page/LessonPage';
import PlayerPage from './page/PlayerPage';
import MyWebView from './page/MyWebView';
import LoginPage from './login/page/LoginPage';

import AuthCodePage from './login/page/AuthCodePage';
import PasswordPage from './login/page/PasswordPage';
import FindPasswordPage from './login/page/FindPasswordPage';
import SetPasswordPage from './login/page/SetPasswordPage';
import SettingPage from './page/SettingPage';
import { Provider } from 'react-redux';
import configureStore from './reducers/configureStore';
import CompanyPage from './page/CompanyPage';
import Player from './component/Player';

const store = configureStore();

export function registerScreens() {
    Navigation.registerComponent('MainPage', () => MainPage, store, Provider);
    Navigation.registerComponent('Personal', () => IndividualPage, store, Provider);
    Navigation.registerComponent('LessonPage', () => LessonPage, store, Provider);
    Navigation.registerComponent('PlayerPage', () => PlayerPage, store, Provider);
    Navigation.registerComponent('WebView', () => MyWebView, store, Provider);
    Navigation.registerComponent('Login', () => LoginPage, store, Provider);
    Navigation.registerComponent('Password', () => PasswordPage, store, Provider);
    Navigation.registerComponent('AuthCode', () => AuthCodePage, store, Provider);
    Navigation.registerComponent('FindPassword', () => FindPasswordPage, store, Provider);
    Navigation.registerComponent('SetPassword', () => SetPasswordPage, store, Provider);
    Navigation.registerComponent('Setting', () => SettingPage, store, Provider); 
    Navigation.registerComponent('About', () => CompanyPage, store, Provider);
    Navigation.registerComponent('Player', () => Player, store, Provider);
  }

  export default store