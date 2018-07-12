

import React, { Component } from 'react';
import MainPage from './js/page/MainPage';
import { Navigation } from 'react-native-navigation';
import IndividualPage from './js/page/IndividualPage';
import { registerScreens } from './js/screens';

// const App = StackNavigator({
//     Main: { screen: MainPage },
//     Profile: { screen: IndividualPage },
// });
// export default App;

// export default class ecfoApp extends Component {
//     render() {
//         return (
//             <MainPage navigate={this.props.navigation} />
//         );
//     }
// }

registerScreens();
Navigation.startSingleScreenApp({screen:
    {
        label : '首页',
        screen : 'MainPage',
    }
});
