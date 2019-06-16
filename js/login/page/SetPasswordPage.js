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
    PixelRatio,
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
import { Navigation } from 'react-native-navigation';
import { THEME_TEXT_COLOR, THEME_LABEL, THEME_TEXT, BUTTON_BACKGROUND, CLICKABLE_TEXT, THEME_BACKGROUND_WHITE } from "../../config/color"
import AuthCodeInput from '../../component/AuthCodeInput';
import alert from '../../util/utils';
import px2dp from '../../util/px2dp'

export default class SetPasswordPage extends Component {
    mobile = ''
    password = ''
    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    doFinish(number, password) {
        fetch('http://localhost:8081/js/data/setPwd.json?mobile=' + number + '&pwd=' + password)
            .then((response) =>
                response.json()
            )
            .then((responseJson) => {
                console.log('设置密码返回')
                let message = responseJson.message
                if (message === 'success') {
                    this._jumpToLoginPage()
                } else {
                    alert('设置密码发生错误:' + message)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _jumpToLoginPage() {
        this.props.navigator.popToRoot({ animated: true })
        // this.props.navigator.push({
        //     screen: 'Login',
        // })
        // this.props.navigator.pop({animated: true})
    }

    render() {
        return (
            <View style={styles.page}>
                <Text style={styles.textStyle}>请设置密码</Text>
                <TextInput style={styles.authInput}
                    placeholder='请输入密码'
                    placeholderTextColor='#cccccc'
                    selectionColor='#ff4f39'
                    autoFocus={true}
                    underlineColorAndroid='transparent'
                    autoCapitalize={'none'}
                    maxLength={20}
                    secureTextEntry={true}
                    onChangeText={(text) => this.password = text} />
                <TouchableOpacity onPress={() => this.doFinish()}>
                    <View style={styles.buttonBackground}>
                        <Text style={styles.button}>完成</Text>
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
        marginBottom: px2dp(40)
    },
    page: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: THEME_BACKGROUND_WHITE
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
        height: px2dp(52),
        borderColor: 'transparent',
        borderWidth: 1,
        fontSize: px2dp(13),
        marginLeft: px2dp(18),
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