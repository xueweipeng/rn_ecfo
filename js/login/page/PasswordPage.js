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
import * as registerAction from '../../action/registerAction';// 导入action方法

import { THEME_BACKGROUND, THEME_LABEL, THEME_TEXT, BUTTON_BACKGROUND } from "../../config/color"

export default class PasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    // 状态更新
    shouldComponentUpdate(nextProps, nextState) {
        // 注册成功,切到登录
        if (nextProps.status === '注册成功' && nextProps.isSuccess) {
            this.props.navigation.dispatch(resetAction);
            return false;
        }
        return true;
    }

    updateState(key, val) {
        let state = this.state;
        state[key] = val;
        this.setState(state);
    }

    doLogin() {
        const { reg } = this.props;
        if (!this.mobile) {
            this.updateState('message', '请输入手机号码');
            return;
        }
        if (!this.password) {
            this.updateState('message', '请输入登录密码');
            return;
        }
        if (!this.password2) {
            this.updateState('message', '请输入确认密码');
            return;
        }
        if (this.password !== this.password2) {
            this.updateState('message', '前后两次密码不一致');
            return;
        }
        reg(this.mobile, this.password);
    }

    doForgetPassword() {

    }


    render() {
        let message = this.state && this.state.message ? this.state.message : '';
        return (
            <View style={styles.passwordPage}>
                <Text style={styles.textStyle}>手机账号登录</Text>
                <TextInput style={styles.passwordInput} placeholder='请输入手机号码' keyboardType={'numeric'}
                    autoCapitalize={'none'} maxLength={20}
                    onChangeText={(text) => this.mobile = text} />
                <TextInput style={styles.passwordInput} placeholder='请输入密码' secureTextEntry={true}
                    autoCapitalize={'none'} maxLength={20}
                    onChangeText={(text) => this.password = text} />
                <Button style={styles.button} title="登录" color="#f27130" onPress={() => this.doLogin()} />
                <Text style={styles.subButtonText} onPress={() => this.doForgetPassword()}>忘记密码?</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        textAlign: 'center',
        fontSize: 24,
        color: '#333333',
        margin: 30
    },
    passwordPage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: THEME_BACKGROUND
    },
    passwordInput: {
        marginBottom: 8,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    button: {
        marginBottom: 8,
    },
    subButtonText: {
        color: BUTTON_BACKGROUND,
        fontSize: 14,
        textAlign: 'right',
    },
    message: {
        marginTop: 16,
        color: THEME_TEXT,
        fontSize: 14
    }
});

connect(
    (state) => ({
        status: state.reg.status,
        isSuccess: state.reg.isSuccess
    }),
    (dispatch) => ({
        reg: (u, p) => dispatch(registerAction.reg(u, p)),
    })
)(PasswordPage)
