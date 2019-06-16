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
    PixelRatio
} from 'react-native'

import { THEME_BACKGROUND, THEME_LABEL, THEME_TEXT, BUTTON_BACKGROUND, CLICKABLE_TEXT, THEME_BACKGROUND_WHITE,THEME_TEXT_COLOR } from "../../config/color"
import AuthCodeInput from '../../component/AuthCodeInput';
import alert from '../../util/utils';
import storage from '../../util/storage';
import CountDownButton from '../../component/CountDownButton';
import { connect } from 'react-redux'; // 引入connect函数
import * as loginAction from '../../action/loginAction';// 导入action方法
import store from '../../screens'
import px2dp from '../../util/px2dp';

class AuthCodePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authCode: '',
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
            console.log('auth code page state change ' + store.getState().loginReducer.status);
            // let success = store.getState().loginReducer.isSuccess
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
        if (this.state.authCode.length < 4 || this.state.authCode.length > 4) {
            alert('验证码长度不正确')
            return
        }
        console.log('输入的验证码是:' + this.state.authCode)
        let number = this.props.number
        let from = this.props.from
        if (from === 'find') {
            this._checkAuthCode(number, this.state.authCode)
        } else {
            this._fetchLoginData(number, this.state.authCode)
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
                        fontSize={px2dp(13)}
                        textColor={THEME_TEXT_COLOR}
                        timerActiveTitle={['(', 's)']}
                        onClick={(shouldStartCounting) => {
                            console.log('countdown clicked')
                            // shouldStartCountting是一个回调函数，根据调用接口的情况在适当的时候调用它来决定是否开始倒计时
                            this.requestForAuthCode(this.props.number, shouldStartCounting)
                        }} />
                </View>
                <TextInput style={styles.authInput} placeholder='请输入验证码' keyboardType={'numeric'}
                    autoCapitalize={'none'}
                    maxLength={4}
                    underlineColorAndroid='transparent'
                    autoFocus={true}
                    placeholderTextColor='#cccccc'
                    selectionColor='#ff4f39'
                    onChangeText={(text) => this.state.authCode = text} />
                <TouchableOpacity onPress={() => this.doConfirm()}>
                    <View style={styles.buttonBackground}>
                        <Text style={styles.button}>确定</Text>
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
        marginTop: px2dp(80)
    },
    authCodeStyle: {
        margin: 30
    },
    page: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: THEME_BACKGROUND_WHITE
    },
    descStyle: {
        fontSize: px2dp(13),
        color: '#aaaaaa'
    },
    descFatherStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: px2dp(14),
        marginLeft:px2dp(18)
    },
    authInput: {
        height: px2dp(52),
        borderColor: 'transparent',
        borderWidth: 1,
        fontSize: px2dp(13),
        marginLeft: px2dp(18),
        marginRight: px2dp(18),
        marginTop: px2dp(44),
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
)(AuthCodePage)