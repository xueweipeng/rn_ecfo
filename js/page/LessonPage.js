import React, {Component} from 'react';
import ReactNative, {Text, View, StyleSheet, Platform, TouchableOpacity, ListView, Image, PixelRatio, BackAndroid} from 'react-native';
import NavigationBar from '../component/SimpleNavigationBar';

export default class LessonPage extends Component {
    constructor(props){
        super(props);
    }

    _handleBack() {

    }

    render(){
        return(
            <View style={{flex: 1}}>
                {/* <NavigationBar title="课程详情" backOnPress={this._handleBack.bind(this)}/> */}
            </View>
        );
    }
}