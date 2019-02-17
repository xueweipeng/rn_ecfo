import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactNative, {Text, View, StyleSheet, Platform, TouchableOpacity, ListView, Image, PixelRatio, BackAndroid} from 'react-native';
import NavigationBar from '../component/SimpleNavigationBar';
import TextButton from '../component/TextButton';
import theme from '../config/theme'
import px2dp from '../util/px2dp'

export default class CompanyPage extends Component {
    constructor(props){
        super(props);
    }

    _handleBack() {

    }

    render(){
        return(
            <View style={{flex: 1}}>
                {/*Android下必须有控件才能跳转*/}
                {/* <NavigationBar title="个人主页" backOnPress={this._handleBack.bind(this)}/> */}
                <Text style={{ color: theme.text.color, fontSize: px2dp(20) }}>关于我们</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});