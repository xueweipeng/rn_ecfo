import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactNative, {Text, View, StyleSheet, Platform, TouchableOpacity, ListView, Image, PixelRatio, BackAndroid} from 'react-native';
import NavigationBar from '../component/SimpleNavigationBar';


export default class IndividualPage extends Component{
    constructor(props){
        super(props);
    }

    _handleBack() {

    }

    render(){
        return(
            <View style={{flex: 1}}>
                <NavigationBar title="个人主页" backOnPress={this._handleBack.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});