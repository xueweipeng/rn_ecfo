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

import { THEME_BACKGROUND, THEME_LABEL, THEME_TEXT, BUTTON_BACKGROUND, CLICKABLE_TEXT } from "../../config/color"
import AuthCodeInput from '../../component/AuthCodeInput';
import alert from '../../util/utils';
import storage from '../../util/storage';
import CountDownButton from '../../component/CountDownButton';
import { connect } from 'react-redux'; // 引入connect函数
import * as loginAction from '../../action/loginAction';// 导入action方法
import store from '../../screens'

class AuthCodePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            startCounting: true
        };
    }

    _checkAuthCode(number, authCode) {
        fetch('http://localhost:8081/js/data/check.json?mobile=' + number + '&auth=' + authCode)
            .then((response) =>
                response.json()
            )
            .then((responseJson) => {
                console.log('找回密码返回')
                let message = responseJson.message
                if (message === 'success') {
                    this.props.navigator.push({
                        screen: 'SetPassword',
                    })
                } else {
                    alert('验证码错误')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _fetchLoginData(number, authCode) {
        const { login } = this.props;
        login(false, number, authCode)
        // fetch('http://localhost:8081/js/data/login.json?mobile=' + number + '&auth=' + authCode)
        //     .then((response) =>
        //         response.json()
        //     )
        //     .then((responseJson) => {
        //         console.log('登录返回')
        //         let message = responseJson.message
        //         if (message === 'success') {
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
        //             });
        //         } else {
        //             alert('登录失败，失败信息：' + message)
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }

    componentDidMount() {
        store.subscribe(() => {
            //监听state变化
            console.log('auth code page state change ' + store.getState().loginIn.status);
            // let success = store.getState().loginIn.isSuccess
            // if (success === true) {
            //     this.props.navigator.popToRoot({
            //         animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
            //         animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
            //     });
            // }

        });
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

    requestForAuthCode(mobile, shouldStartCounting) {
        fetch('http://localhost:8081/js/data/authCode.json?mobile=' + mobile)
            .then((response) =>
                response.json()
            )
            .then((responseJson) => {
                let message = responseJson.message
                if (message === 'success') {
                    shouldStartCounting(true)
                    console.log('验证码请求成功')
                } else {
                    shouldStartCounting(false)
                    alert('请求验证码失败，失败信息：' + message)
                }
            })
            .catch((error) => {
                shouldStartCounting(false)
                alert('请求验证码失败，失败信息：' + error)
                console.error(error);
            });
    }

    doConfirm() {
        if (this.authCode.length < 4 || this.authCode.length > 4) {
            alert('验证码长度不正确')
            return
        }
        console.log('输入的验证码是:' + this.authCode)
        let number = this.props.number
        let from = this.props.from
        if (from === 'find') {
            this._checkAuthCode(number, this.authCode)
        } else {
            this._fetchLoginData(number, this.authCode)
        }
    }

    render() {
        return (
            <View style={styles.page}>
                <Text style={styles.textStyle}>请输入验证码</Text>
                <View style={styles.descFatherStyle}>
                    <Text style={styles.descStyle}>已发送至手机</Text>
                    <Text style={styles.descStyle}>{this.props.number + '，'}</Text>
                    <CountDownButton
                        enable={true}
                        textStyle={{ color: "#f27130" }}
                        timerActiveTitle={['(', 's)']}
                        onClick={(shouldStartCounting) => {
                            console.log('countdown clicked')
                            // shouldStartCountting是一个回调函数，根据调用接口的情况在适当的时候调用它来决定是否开始倒计时
                            this.requestForAuthCode(this.props.number, shouldStartCounting)
                        }} />
                </View>
                <TextInput style={styles.authInput} placeholder='请输入验证码' keyboardType={'numeric'}
                    autoCapitalize={'none'} maxLength={4}
                    onChangeText={(text) => this.authCode = text} />
                <Button style={styles.button} title={'确定'} color="#f27130" onPress={() => this.doConfirm()} />
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
        color: 'gray'
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

export default connect(
    (store) => ({
        status: store.loginIn.status,
        isSuccess: store.loginIn.isSuccess,
        user: store.loginIn.user,
    })
    ,
    (dispatch) => ({
        login: (isPassword, mobile, password) => dispatch(loginAction.login(isPassword, mobile, password)),
    })
)(AuthCodePage)