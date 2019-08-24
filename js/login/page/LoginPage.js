import React, { Component } from 'react';
import {
    AppRegistry,
    Button,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    View,
    Slider,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ActivityIndicator,
    PixelRatio,
    NetInfo,
    Animated,
    Easing,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'; // 引入connect函数
import * as loginAction from '../../action/loginAction';// 导入action方法

import { THEME_BACKGROUND, THEME_LABEL, THEME_TEXT, BUTTON_BACKGROUND, THEME_TEXT_COLOR } from "../../config/color"
import alert from '../../util/utils'
import px2dp from '../../util/px2dp';

export default class LoginPage extends Component {
    mobile = '';
    password = '';

    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    requestForAuthCode(mobile) {
        fetch('http://127.0.0.1:5000/login/authcode?phone=' + mobile)
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
                            from: 'login'
                        }
                    });
                } else {
                    alert('请求验证码失败，失败信息：' + message)
                }
            })
            .catch((error) => {
                alert('请检查您的网络')
            });
    }

    doAuthCode() {
        if (this.mobile.length < 11) {
            alert('号码长度不对')
            return
        }
        // NetInfo.isConnected.fetch().then(isConnected => {
        //     if (isConnected === false) {
        //         alert('请检查手机网络状况')
        //         return
        //     }
        //   });

        this.requestForAuthCode(this.mobile)
    }

    doPassword() {
        this.props.navigator.push({
            screen: 'Password',
            title: '',
        });
    }

    render() {
        return (
            <View style={styles.loginPage}>
                <View style={styles.loginSection}>
                    <Text style={styles.loginTitle}>登录/注册</Text>
                    <TextInput style={styles.loginInput}
                        underlineColorAndroid='transparent'
                        autoFocus={true}
                        placeholderTextColor='#cccccc'
                        selectionColor='#ff4f39' placeholder='请输入手机号码' keyboardType={'numeric'}
                        defaultValue={this.mobile} autoCapitalize={'none'} maxLength={11}
                        onChangeText={(text) => this.mobile = text} />
                    <TouchableOpacity onPress={() => this.doAuthCode()}>
                        <View style={styles.buttonBackground} >
                            <Text style={styles.loginButton}>发送验证码</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.subButtonText} onPress={() => this.doPassword()}>使用密码登录</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loginPage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff'
    },
    loginSection: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    loginTitle: {
        fontSize: px2dp(24),
        color: '#333333',
        textAlign: 'left',
        marginTop: px2dp(54),
        marginLeft: px2dp(18),
    },
    buttonBackground: {
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: THEME_TEXT_COLOR,
        marginLeft: px2dp(24),
        marginRight: px2dp(24),
        marginTop: px2dp(30),
        height: px2dp(37),
    },
    loginButton: {
        textAlign: 'center',
        color: '#ffffff'
    },
    subButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 28
    },
    subButtonText: {
        color: THEME_TEXT_COLOR,
        fontSize: px2dp(11),
        textAlign: 'right',
        marginTop: px2dp(20),
        marginRight: 24
    },
    loginInput: {
        height: 40,
        borderColor: 'transparent',
        borderWidth: 1,
        fontSize: px2dp(13),
        marginLeft: px2dp(18),
        marginTop: px2dp(44),
        marginRight: px2dp(18),
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#dedede',
    },
    message: {
        marginTop: 16,
        color: THEME_TEXT,
        fontSize: 14
    }
});