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
    PixelRatio,
    InteractionManager,
    Platform,
    PlatformIOS,
    Alert,
    AlertIOS
} from 'react-native'
import { connect } from 'react-redux'; // 引入connect函数

import { THEME_BACKGROUND, THEME_LABEL, THEME_TEXT, BUTTON_BACKGROUND, CLICKABLE_TEXT, THEME_BACKGROUND_WHITE, THEME_TEXT_COLOR } from "../../config/color"
import AuthCodeInput from '../../component/AuthCodeInput';
import alert from '../../util/utils';
import px2dp from '../../util/px2dp'

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
                alert('请检查网络设置')
            });

    }

    render() {
        let message = this.state && this.state.message ? this.state.message : '';
        return (
            <View style={styles.page}>
                <Text style={styles.textStyle}>找回密码</Text>
                <TextInput style={styles.loginInput}
                    underlineColorAndroid='transparent'
                    autoFocus={true}
                    placeholderTextColor='#cccccc'
                    selectionColor='#ff4f39' placeholder='请输入手机号码' keyboardType={'numeric'}
                    defaultValue={this.mobile} autoCapitalize={'none'} maxLength={11}
                    onChangeText={(text) => this.mobile = text} />
                <TouchableOpacity onPress={() => this.doSendAuthCode()}>
                    <View style={styles.buttonBackground} >
                        <Text style={styles.loginButton} >发送验证码</Text>
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
        marginTop: px2dp(54)
    },
    authCodeStyle: {
        margin: 30
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
    page: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: THEME_BACKGROUND_WHITE
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