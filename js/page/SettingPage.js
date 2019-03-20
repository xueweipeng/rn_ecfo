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

//设置页面
export default class SettingPage extends Component {
    constructor(props) {
        super(props);
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

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.list}>
                        <Item icon="md-contacts" text="关于我们" textColor="black" onPress={this._onPressCallback.bind(this, 6)} />
                        <Item icon="md-pulse" text="检查升级" textColor="black" onPress={this._onPressCallback.bind(this, 5)} />
                        <Item icon="md-exit" text="退出登录" textColor="orange" onPress={this._onPressCallback.bind(this, 4)} />
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
        borderTopColor: '#e4e4e4',
        marginTop: px2dp(10)
    },
    list: {
        flex: 1,
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: '#e4e4e4',
        marginTop: px2dp(15)
    },
    listItem: {
        flex: 1,
        height: px2dp(47),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(25),
        paddingRight: px2dp(25),
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 1 / PixelRatio.get()
    }
});