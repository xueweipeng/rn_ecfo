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
    Animated,
    Easing,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'; // 引入connect函数
import * as loginAction from '../../action/loginAction';// 导入action方法

import { THEME_BACKGROUND, THEME_LABEL, THEME_TEXT, BUTTON_BACKGROUND } from "../../config/color"

export default class LoginPage extends Component {
    mobile = '';
    password = '';

    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    // 状态更新，判断是否登录并作出处理
    shouldComponentUpdate(nextProps, nextState) {
        // 登录完成,切成功登录
        if (nextProps.status === '登陆成功' && nextProps.isSuccess) {
            // this.props.navigation.dispatch(resetAction);
            this.checkHasLogin();
            return false;
        }
        return true;
    }

    doAuthCode() {
        // const { login } = this.props;
        // if (!this.mobile) {
        //     this.updateState('message', '请输入手机号码');
        //     return;
        // }
        // if (!this.password) {
        //     this.updateState('message', '请输入密码');
        //     return;
        // }
        // login(this.mobile, this.password);
        this.props.navigator.push({
            screen: 'AuthCode',
            title: '',
            passProps: {
                number: this.mobile
            }
        });
    }

    doPassword() {
        this.props.navigator.push({
            screen: 'Password',
            title: '',
        });
    }

    render() {
        const { login } = this.props;
        let message = this.state && this.state.message ? this.state.message : '';
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
        margin: 30,
        color: BUTTON_BACKGROUND,
        textAlign: 'center',
    },
    subButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 18
    },
    subButtonText: {
        color: BUTTON_BACKGROUND,
        fontSize: 14,
        textAlign: 'right',
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

connect(
    (state) => ({
        status: state.loginIn.status,
        isSuccess: state.loginIn.isSuccess,
        user: state.loginIn.user,
    }),
    (dispatch) => ({
        login: (m, p) => dispatch(loginAction.login(m, p)),
    })
)(LoginPage)