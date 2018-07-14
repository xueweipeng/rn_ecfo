
'use strict';

import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    Platform
} from 'react-native'

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome'
import Lesson from '../tabs/Lesson';
import Me from '../tabs/Me';
import px2dp from '../util/px2dp'


export default class MainPage extends Component {
    state = {
        selectedTab: 'lesson'
    };

    static navigatorStyle = {
        navBarHidden: true, //隐藏系统导航栏
    };

    _backAndroidHandler() {
        if (Platform.OS === 'android') {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                return false
            }
            this.lastBackPressed = Date.now()
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
            return true
        } else {
            return true
        }
    }

    render() {

        return (
            <TabNavigator style={styles.container}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'lesson'}
                    title="课程"
                    selectedTitleStyle={{ color: "#3496f0" }}
                    renderIcon={() => <Icon name="book" size={px2dp(22)} color="#666" />}
                    renderSelectedIcon={() => <Icon name="book" size={px2dp(22)} color="#3496f0" />}
                    onPress={() => this.setState({ selectedTab: 'lesson' })}>
                    {<Lesson navigator={this.props.navigator} />}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'me'}
                    title="我的"
                    selectedTitleStyle={{ color: "#3496f0" }}
                    renderIcon={() => <Icon name="user" size={px2dp(22)} color="#666" />}
                    renderSelectedIcon={() => <Icon name="user" size={px2dp(22)} color="#3496f0" />}
                    onPress={() => this.setState({ selectedTab: 'me' })}>
                    {/* <将导航组件对象设置给使用该对象的组件/> */}
                    {<Me navigator={this.props.navigator} />} 
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});