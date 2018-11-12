import React, { Component } from 'react';
import {
    AppRegistry,
    Button,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    View,
    TextInput,
    Slider,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Animated,
    Easing,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'; // 引入connect函数
import * as loginAction from '../../action/loginAction';// 导入action方法

import { THEME_BACKGROUND, THEME_LABEL, THEME_TEXT, BUTTON_BACKGROUND, CLICKABLE_TEXT } from "../../config/color"
import AuthCodeInput from '../../component/AuthCodeInput';

export default class AuthCodePage extends Component {
    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    doConfirm() {

    }

    render() {
        let message = this.state && this.state.message ? this.state.message : '';
        return (
            <View style={styles.page}>
                <Text style={styles.textStyle}>请输入验证码</Text>
                <View style={styles.descFatherStyle}>
                    <Text style={styles.descStyle}>已发送至手机</Text>
                    <Text style={styles.descStyle}>{this.props.number}</Text>
                    <Text style={styles.clickableStyle}>重新发送</Text>
                </View>
                <TextInput style={styles.authInput} placeholder='请输入验证码' keyboardType={'numeric'}
                    autoCapitalize={'none'} maxLength={4}
                    onChangeText={(text) => this.authCode = text} />
                <Button style={styles.button} title={'确定'} color="#f27130" onPress={() => this.doConfirm()}/>
                {/* <AuthCodeInput style={styles.authCodeStyle} maxLength={4}/> */}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    textStyle: {
        textAlign: 'center',
        fontSize: 24,
        color: 'black',
        margin: 30
    },
    authCodeStyle: {
        margin: 30
    },
    page: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: THEME_BACKGROUND
    },
    descStyle: {
        fontSize: 16,
        color:'gray'
    },
    descFatherStyle: {
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        marginTop: 30
    },
    clickableStyle: {
        fontSize: 16,
        color: CLICKABLE_TEXT 
    },
    authInput: {
        marginTop: 20,
        marginBottom: 8,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    button: {
        margin: 30,
        color: BUTTON_BACKGROUND,
        textAlign: 'center',
    },
    message: {
        marginTop: 16,
        color: THEME_TEXT,
        fontSize: 14
    }
});