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
import alert from '../../util/utils'
import { THEME_BACKGROUND, THEME_LABEL, THEME_TEXT, BUTTON_BACKGROUND } from "../../config/color"
import storage from '../../util/storage'

export default class PasswordPage extends Component {
    mobile = ''
    password = ''
    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    updateState(key, val) {
        let state = this.state;
        state[key] = val;
        this.setState(state);
    }

    // 状态更新，判断是否登录并作出处理
    shouldComponentUpdate(nextProps, nextState) {
        // 登录完成,切成功登录
        // if (nextProps.status === '登陆成功' && nextProps.isSuccess) {
        //     // this.props.navigation.dispatch(resetAction);
        //     this.checkHasLogin();
        //     return false;
        // }
        return true;
    }

    _login(number, password) {
        fetch('http://localhost:8081/js/data/login.json?mobile=' + number + '&pwd=' + password)
			.then((response) =>
				response.json()
			)
			.then((responseJson) => {
                console.log('登录返回')
				let message = responseJson.message
				if (message === 'success') {
                    let data = responseJson.data
                    let user = data.user
                    console.log('name=' + user.name)
                    console.log('phone=' + user.phone)
                    storage.save({
                        key: 'user',
                        data: user
                    });
                    this.props.navigator.popToRoot({
                        animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
                      });
                } else {
                    alert('登录失败:' + message)
                }
			})
			.catch((error) => {
				console.error(error);
			});
    }

    doLogin() {
        if (this.mobile.length <= 0) {
            alert('号码长度不正确')
            return
        } 
        if (this.password.length === 0) {
            alert('密码不能为空')
            return
        }
        this._login(this.mobile, this.password)
    }

    doForgetPassword() {
        this.props.navigator.push({
            screen: 'FindPassword',
            title: '',
        });
    }

    render() {
        let message = this.state && this.state.message ? this.state.message : '';
        return (
            <View style={styles.passwordPage}>
                <Text style={styles.textStyle}>手机账号登录</Text>
                <TextInput style={styles.passwordInput} placeholder='请输入手机号码' keyboardType={'numeric'}
                    autoCapitalize={'none'} maxLength={11}
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
        marginTop: 28,
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
