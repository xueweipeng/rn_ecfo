

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

registerScreens();
Navigation.startSingleScreenApp({
    screen:
    {
        label: '首页',
        screen: 'MainPage',
    },
    drawer: { // optional, add this if you want a side menu drawer in your app
        left: { // optional, define if you want a drawer from the left
          screen: 'Player' // unique ID registered with Navigation.registerScreen
        },
        disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
      },
});


// export default class App extends Component {
//     componentDidMount() {
//         console.log('init app')
//     }

//     render() {
//         return (
//             // 实现app和store的关联，等于整个系统的组件都被包含住了
//             <Provider store={store}>
//                 <App />
//             </Provider>
//         )
//     }
// }


