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
    InteractionManager,
    Platform,
    PlatformIOS,
    Alert,
    AlertIOS
} from 'react-native'
import { connect } from 'react-redux'; // 引入connect函数

import { THEME_BACKGROUND, THEME_LABEL, THEME_TEXT, BUTTON_BACKGROUND, CLICKABLE_TEXT } from "../../config/color"
import AuthCodeInput from '../../component/AuthCodeInput';
import alert from '../../util/utils';

export default class FindPasswordPage extends Component {
    mobile = ''
    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    doSendAuthCode() {
        if (this.mobile.length < 11) {
            alert('号码长度不对')
            return;
        }
        fetch('http://localhost:8081/js/data/authCode.json?mobile=' + this.mobile)
			.then((response) =>
				response.json()
			)
			.then((responseJson) => {
                console.log('验证码请求成功')
				let message = responseJson.message
				if (message === 'success') {
                    this.props.navigator.push({
                        screen: 'AuthCode',
                        title: '',
                        passProps: {
                            number: this.mobile,
                            from: 'find'
                        }
                    });
                } else {
                    alert('请求验证码失败，失败信息：' + message)
                }
			})
			.catch((error) => {
				console.error(error);
			});
        
    }

    render() {
        let message = this.state && this.state.message ? this.state.message : '';
        return (
            <View style={styles.page}>
                <Text style={styles.textStyle}>找回密码</Text>
                <TextInput style={styles.authInput} placeholder='请输入手机号' keyboardType={'numeric'}
                    autoCapitalize={'none'} maxLength={11}
                    onChangeText={(text) => this.mobile = text} />
                <Button style={styles.button} title={'发送验证码'} color="#f27130" onPress={() => this.doSendAuthCode()}/>
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