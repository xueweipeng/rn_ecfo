import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
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

import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme'
import px2dp from '../util/px2dp'
import Avatar from '../component/Avatar'
import storage from '../util/storage'
import store from '../screens'

export default class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '未登录',
            hasLogin: false,
            avatar: ''
        };
    }
    _onPressCallback(position) {
        switch (position) {
            case 0:  //title
                if (this.state.hasLogin === true) {
                    this.props.navigator.push({
                        screen: 'Personal',
                        title: '我的信息',
                    });
                } else {
                    this.props.navigator.push({
                        screen: 'Login',
                        title: '登录',
                    });
                }

                break;

            case 1:  // add occupation
                this._alert();
                break;

            case 2:  //collection
                this._alert();
                break;

            case 3:  //read articles
                this._alert();
                break;

            case 4:  //tags
                this._alert();
                break;

            case 5:  //rank
                this._alert();
                break;

            case 6: {  //setting
                this.props.navigator.push({
                    screen: 'Setting',
                    title: '设置',
                });
                break;
            }
        }
    }

    componentWillMount() {
        this.checkHasLogin()
    }

    componentDidMount() {
        store.subscribe(() => {
            //监听state变化
            console.log('me page state change ' + store.getState().loginReducer.status);
            this.checkHasLogin()
        });
    }

    _alert() {
        if (Platform.OS === 'android') {
            Alert.alert(
                '敬请期待',
                '',
                [{ text: 'OK', onPress: () => { } }]
            );
        } else if (Platform.OS === 'ios') {
            AlertIOS.alert(
                '敬请期待',
                '',
                [{ text: 'OK', onPress: () => { } }]
            );
        }
    }

    checkHasLogin() {
        storage.load({
            key: 'user',
            autoSync: false,
        }).then(ret => {
            if (ret && ret.token) {
                console.log('checkHasLogin:' + ret.token)
                this.setState({
                    name: ret.name,
                    hasLogin: true,
                    avatar: ret.avatar
                })
            } else {
                this.setState({
                    name: '未登录',
                    hasLogin: false,
                    avatar: ''
                })
            }
        }).catch(err => {
            // console.warn(err.message);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <View style={styles.actionBar}>
                    <Text style={{ color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize }}>我的</Text>
                </View> */}
                <ScrollView>
                    {Platform.OS === 'android' ?
                        <TouchableOpacity onPress={this._onPressCallback.bind(this, 0)}>
                            <View style={styles.intro}>
                                {/* 设置头像后要同步过来 */}
                                <Avatar image={source = this.state.hasLogin ?  { uri: this.state.avatar } : require('../image/logo_og.png')} size={px2dp(55)} textSize={px2dp(20)} />
                                <View style={{ marginLeft: px2dp(12) }}>
                                    <Text style={{ color: theme.text.color, fontSize: px2dp(20) }}>{this.state.name}</Text>
                                    {/* <TextButton text="添加职位 @添加公司" color="#949494" fontSize={px2dp(13)} onPress={this._onPressCallback.bind(this, 1)} /> */}
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight:18 }}>
                                    <Icon name="ios-arrow-forward" color="#ffffff" size={px2dp(30)} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={this._onPressCallback.bind(this, 0)} activeOpacity={theme.btnActiveOpacity}>
                            <View style={styles.intro}>
                                <Avatar image={source = this.state.hasLogin ?  { uri: this.state.avatar } : require('../image/logo_og.png')} size={px2dp(57)} textSize={px2dp(20)} />
                                <View style={{ marginLeft: px2dp(12) }}>
                                    <Text style={{ color: theme.text.color, fontSize: px2dp(20) }}>{this.state.name}</Text>
                                    {/* <TextButton text="添加职位 @添加公司" color="#949494" fontSize={px2dp(13)} onPress={this._onPressCallback.bind(this, 1)} /> */}
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Icon name="ios-arrow-forward" color="#ffffff" size={px2dp(30)} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    <View style={styles.list}>
                        <Item icon="md-heart" text="我的收藏" subText="" iconColor="gray" onPress={this._onPressCallback.bind(this, 2)} />
                        <Item icon="md-eye" text="阅读过的文章" subText="" onPress={this._onPressCallback.bind(this, 3)} />
                        <Item icon="md-card" text="标签管理" subText="" onPress={this._onPressCallback.bind(this, 4)} />
                    </View>
                    <View style={styles.list}>
                        {/* <Item icon="md-ribbon" text="掘金排名" iconColor="#ff4500" onPress={this._onPressCallback.bind(this, 5)} /> */}
                        <Item icon="md-settings" text="设置" onPress={this._onPressCallback.bind(this, 6)} />
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
        subText: PropTypes.string,
        onPress: PropTypes.func
    }

    static defaultProps = {
        iconColor: 'gray'
    }

    render() {
        const { icon, iconColor, text, subText, onPress } = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.listItem}>
                    <Icon name={icon} size={px2dp(13)} color={iconColor} />
                    <Text style={{ color: '#333333', fontSize: px2dp(13), marginLeft: px2dp(8) }}>{text}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={{ color: "#333333" }}>{subText}</Text>
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
        height: px2dp(216),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.themeColor,
        padding: px2dp(18),
        // borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#dedede',
        borderTopColor: '#e4e4e4',
    },
    list: {
        flex: 1,
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: '#f7f7f7',
        marginTop: px2dp(10)
    },
    listItem: {
        flex: 1,
        height: px2dp(52),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(18),
        paddingRight: px2dp(18),
        borderBottomColor: '#dedede',
        borderBottomWidth: 1 / PixelRatio.get()
    }
});