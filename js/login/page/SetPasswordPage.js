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
    Platform,
    PlatformIOS,
    Alert,
    AlertIOS
} from 'react-native'
import { Navigation } from 'react-native-navigation';
import { THEME_BACKGROUND, THEME_LABEL, THEME_TEXT, BUTTON_BACKGROUND, CLICKABLE_TEXT } from "../../config/color"
import AuthCodeInput from '../../component/AuthCodeInput';
import alert from '../../util/utils';

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
        this.props.navigator.popToRoot({animated: true})
        // this.props.navigator.push({
        //     screen: 'Login',
        // })
        // this.props.navigator.pop({animated: true})
    }

    render() {
        return (
            <View style={styles.page}>
                <Text style={styles.textStyle}>请设置密码</Text>
                <TextInput style={styles.authInput} placeholder='请输入密码'
                    autoCapitalize={'none'} maxLength={20} secureTextEntry={true}
                    onChangeText={(text) => this.password = text} />
                <Button style={styles.button} title={'完成'} color="#f27130" onPress={() => this.doFinish()}/>
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
        color:'gray'
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