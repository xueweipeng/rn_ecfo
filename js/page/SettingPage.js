import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative, {
    AppRegistry,
    StyleSheet,
    Dimensions,
    Text,
    View,
    Image,
    ListView,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    CameraRoll,
    Animated,
    Platform,
    PixelRatio,
    Alert,
    AlertIOS
} from 'react-native';
import NavigationBar from '../component/SimpleNavigationBar';
import TextButton from '../component/TextButton';

import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme'
import px2dp from '../util/px2dp'
import Avatar from '../component/Avatar'
import storage from '../util/storage'
import store from '../screens'
import { connect } from 'react-redux' // 引入connect函数
import * as loginAction from '../action/loginAction'// 导入action方法

//设置页面
class SettingPage extends Component {
    constructor(props) {
        super(props);
    }

    // 状态更新，判断是否登录并作出处理
    shouldComponentUpdate(nextProps, nextState) {
        // 登录完成,切成功登录
        if (nextProps.status === '退出成功') {
            this.props.navigator.popToRoot({
                animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
            });
            return false;
        }
        return true;
    }

    _handleBack() {

    }

    _onPressCallback(position) {
        switch (position) {
            case 0:  //title
                break;

            case 1:  // add occupation

                break;

            case 2:  //collection

                break;

            case 3:  //read articles

                break;

            case 4:  //quit
                const { logout } = this.props;
                logout()
                break;

            case 5:  //update
                this._checkUpgrade();
                break;

            case 6: {  //about us
                this.props.navigator.push({
                    screen: 'About',
                    title: '关于我们',
                });
                break;
            }
        }
    }

    _checkUpgrade() {
        fetch('http://localhost:5000/upgrade/check')
			.then((response) =>
				response.json()
			)
			.then((responseJson) => {
				let data = responseJson.data
				alert(data.url + ' ' + data.version)
			})
			.catch((error) => {
				alert('请检查您的网络')
			});
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.list}>
                        <Item icon="md-contacts" text="关于我们" textColor="#333333" onPress={this._onPressCallback.bind(this, 6)} />
                        <Item icon="md-pulse" text="检查升级" textColor="#333333" onPress={this._onPressCallback.bind(this, 5)} />
                    </View>
                    <View style={styles.list}>
                        <Item icon="md-exit" text="退出登录" textColor="#faad27" onPress={this._onPressCallback.bind(this, 4)} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

class Item extends Component {
    static propTypes = {
        icon: PropTypes.string.isRequired,
        iconColor: PropTypes.string,
        text: PropTypes.string.isRequired,
        textColor: PropTypes.string,
        subTextColor: PropTypes.string,
        subText: PropTypes.string,
        onPress: PropTypes.func
    }

    static defaultProps = {
        iconColor: 'gray'
    }

    render() {
        const { icon, iconColor, text, textColor, subTextColor, subText, onPress } = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.listItem}>
                    <Icon name={icon} size={px2dp(22)} color={iconColor} />
                    <Text style={{ color: textColor, fontSize: px2dp(15), marginLeft: px2dp(20) }}>{text}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={{ color: subTextColor }}>{subText}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    actionBar: {
        height: theme.actionBar.height,
        backgroundColor: theme.actionBar.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0,
    },
    intro: {
        height: px2dp(100),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: px2dp(20),
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#c4c4c4',
        borderTopColor: '#dedede',
        marginTop: px2dp(10)
    },
    list: {
        flex: 1,
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: '#dedede',
        marginTop: px2dp(10)
    },
    listItem: {
        flex: 1,
        height: px2dp(47),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(25),
        paddingRight: px2dp(25),
        borderBottomColor: '#dedede',
        borderBottomWidth: px2dp(1)
    }
})

export default connect(
    (store) => ({
        status: store.loginReducer.status,
        user: store.loginReducer.user,
    })
    ,
    (dispatch) => ({
        logout: () => dispatch(loginAction.logout()),
    })
)(SettingPage)