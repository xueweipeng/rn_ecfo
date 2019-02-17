import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative, { Text, View, StyleSheet, Platform, ScrollView, TouchableOpacity, ListView, Image, PixelRatio, BackAndroid } from 'react-native';
import NavigationBar from '../component/SimpleNavigationBar';
import TextButton from '../component/TextButton';
import theme from '../config/theme'
import px2dp from '../util/px2dp'
import Avatar from '../component/Avatar'

export default class IndividualPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar:'http://www.ecfo.com.cn/img2/elevenV.png',
            nick_name:'ecfo',
            signature:'hello',
            sex:'male',
            birth_year:'1990',
            education:'博士',
            industry:'互联网',
        }
    }

    _handleBack() {

    }

    _onPressCallback(position) {
        switch (position) {
            case 2:  //昵称
                break;
            case 3:  //个性签名
                break;
            case 4:  //性别
                break;
            case 5:  //出生年份
                break;
            case 6:  //学历
                break;
            case 7:  //行业
                break;
        }
    }

    _onAvatarPress() {
        // log.info('avatar clicked')
    }

    render() {
        return (
            <View style={styles.container}>
                {/*Android下必须有控件才能跳转*/}
                {/* <NavigationBar title="个人主页" backOnPress={this._handleBack.bind(this)}/> */}
                <ScrollView>
                    <TouchableOpacity onPress={this._onAvatarPress.bind(this)}>
                        <View style={styles.avatar}>
                            <Avatar image={source={uri: this.state.avatar}} size={px2dp(55)} textSize={px2dp(20)} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.list}>
                        <Item text="昵称" subText={this.state.nick_name} textColor="#000000" onPress={this._onPressCallback.bind(this, 2)} />
                        <Item text="个性签名" subText={this.state.signature} textColor="#000000" onPress={this._onPressCallback.bind(this, 3)} />
                        <Item text="性别" subText={this.state.sex} textColor="#000000" onPress={this._onPressCallback.bind(this, 4)} />
                        <Item text="出生年份" subText={this.state.birth_year} textColor="#000000" onPress={this._onPressCallback.bind(this, 5)} />
                    </View>
                    <View style={styles.list}>
                        <Item text="学历" subText={this.state.education} textColor="#000000" onPress={this._onPressCallback.bind(this, 6)} />
                        <Item text="行业" subText={this.state.industry} textColor="#000000" onPress={this._onPressCallback.bind(this, 7)} />
                    </View>
                </ScrollView>

            </View>
        );
    }
}

class Item extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        textColor: PropTypes.string,
        subText: PropTypes.string,
        onPress: PropTypes.func
    }

    static defaultProps = {
        textColor: '#aaaaaa',
    }

    render() {
        const { textColor, text, subText, onPress } = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.listItem}>
                    <Text style={{ color: textColor, fontSize: px2dp(15) }}>{text}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: px2dp(15)}}>
                        <Text style={{ color: this.props.textColor }}>{subText}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'flex-start',
        backgroundColor: theme.pageBackgroundColor
    },
    avatar: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        borderTopColor: '#e4e4e4',
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