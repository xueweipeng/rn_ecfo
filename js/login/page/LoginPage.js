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
    NetInfo,
    Animated,
    Easing,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'; // 引入connect函数
import * as loginAction from '../../action/loginAction';// 导入action方法

import { THEME_BACKGROUND, THEME_LABEL, THEME_TEXT, BUTTON_BACKGROUND } from "../../config/color"
import alert from '../../util/utils'

export default class LoginPage extends Component {
    mobile = '';
    password = '';

    constructor(props) {
        super(props);
        this.state = { message: '' };
    }
    
    requestForAuthCode(mobile) {
        fetch('http://localhost:8081/js/data/authCode.json?mobile=' + mobile)
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
				console.error(error);
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
                    <TextInput style={styles.loginInput} placeholder='请输入手机号码' keyboardType={'numeric'}
                        defaultValue={this.mobile} autoCapitalize={'none'} maxLength={11}
                        onChangeText={(text) => this.mobile = text} />
                    <Button style={styles.loginButton} title={'发送验证码'} color="#f27130" onPress={() => this.doAuthCode()} />
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
        padding: 20,
        backgroundColor: THEME_BACKGROUND
    },
    loginSection: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20
    },
    loginTitle: {
        fontSize: 28,
        fontWeight: '500',
        color: THEME_LABEL,
        textAlign: 'left',
        marginTop: 32,
        marginBottom: 32
    },
    loginButton: {
        margin: 40,
        color: BUTTON_BACKGROUND,
        textAlign: 'center',
    },
    subButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 28
    },
    subButtonText: {
        color: BUTTON_BACKGROUND,
        fontSize: 14,
        textAlign: 'right',
        marginTop: 18
    },
    loginInput: {
        marginBottom: 8,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    message: {
        marginTop: 16,
        color: THEME_TEXT,
        fontSize: 14
    }
});