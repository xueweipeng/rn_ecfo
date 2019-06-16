import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    TextInput,
    PixelRatio,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'; // 引入connect函数
import * as loginAction from '../../action/loginAction';// 导入action方法
import alert from '../../util/utils'
import store from '../../screens'
import px2dp from '../../util/px2dp'
import { THEME_BACKGROUND, THEME_LABEL, THEME_TEXT, BUTTON_BACKGROUND, THEME_TEXT_COLOR, THEME_BACKGROUND_WHITE } from "../../config/color"

class PasswordPage extends Component {
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
        if (nextProps.status === '登录成功' && nextProps.isSuccess) {
            this.props.navigator.popToRoot({
                animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
            });
            return false;
        }
        return true;
    }

    _login(number, password) {
        const { login } = this.props;
        login(true, number, password)
        // fetch('http://localhost:8081/js/data/login.json?mobile=' + number + '&pwd=' + password)
        // 	.then((response) =>
        // 		response.json()
        // 	)
        // 	.then((responseJson) => {
        //         console.log('登录返回')
        // 		let message = responseJson.message
        // 		if (message === 'success') {
        //             let data = responseJson.data
        //             let user = data.user
        //             console.log('name=' + user.name)
        //             console.log('phone=' + user.phone)
        //             storage.save({
        //                 key: 'user',
        //                 data: user
        //             });
        //             this.props.navigator.popToRoot({
        //                 animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
        //                 animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
        //               });
        //         } else {
        //             alert('登录失败:' + message)
        //         }
        // 	})
        // 	.catch((error) => {
        // 		console.error(error);
        // 	});
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
            title: ' ',
        });
    }

    componentDidMount() {
        store.subscribe(() => {
            //监听state变化
            console.log('password page state change ' + store.getState().loginReducer.status);
            // let success = store.getState().loginReducer.isSuccess
            // if (success === true) {
            //     this.props.navigator.popToRoot({
            //         animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
            //         animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
            //     });
            // }

        });
    }

    render() {
        let message = this.state && this.state.message ? this.state.message : '';
        return (
            <View style={styles.passwordPage}>
                <Text style={styles.textStyle}>手机账号登录</Text>
                <TextInput style={styles.passwordInput}
                    underlineColorAndroid='transparent'
                    autoFocus={true}
                    placeholderTextColor='#cccccc'
                    selectionColor='#ff4f39'
                    defaultValue={this.mobile}
                    autoCapitalize={'none'}
                    maxLength={11}
                    placeholder='请输入手机号码'
                    keyboardType={'numeric'}
                    onChangeText={(text) => this.mobile = text} />
                <TextInput style={styles.passwordInput}
                    underlineColorAndroid='transparent'
                    placeholder='请输入密码' 
                    secureTextEntry={true}
                    autoCapitalize={'none'} 
                    selectionColor='#ff4f39'
                    maxLength={20}
                    onChangeText={(text) => this.password = text} />
                <Text style={styles.subButtonText} onPress={() => this.doForgetPassword()}>忘记密码?</Text>
                <TouchableOpacity onPress={() => this.doLogin()}>
                    <View style={styles.buttonBackground}>
                        <Text style={styles.button}>登录</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        textAlign: 'center',
        fontSize: px2dp(16),
        color: '#333333',
        marginTop: px2dp(80),
        marginBottom: px2dp(44)
    },
    passwordPage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: THEME_BACKGROUND_WHITE
    },
    passwordInput: {
        height: px2dp(52),
        borderColor: 'transparent',
        borderWidth: 1,
        fontSize: px2dp(13),
        marginLeft: px2dp(18),
        marginRight: px2dp(18),
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#dedede',
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
    button: {
        textAlign: 'center',
        color: '#ffffff'
    },
    subButtonText: {
        color: THEME_TEXT_COLOR,
        fontSize: px2dp(11),
        textAlign: 'right',
        marginTop: px2dp(10),
        marginRight: px2dp(24)
    },
    message: {
        marginTop: 16,
        color: THEME_TEXT,
        fontSize: 14
    }
});

export default connect(
    (store) => ({
        status: store.loginReducer.status,
        isSuccess: store.loginReducer.isSuccess,
        user: store.loginReducer.user,
    })
    ,
    (dispatch) => ({
        login: (isPassword, mobile, password) => dispatch(loginAction.login(isPassword, mobile, password)),
    })
)(PasswordPage)
