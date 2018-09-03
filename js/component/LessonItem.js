
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import px2dp from '../util/px2dp';

export default class LessonItem extends Component{
    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func,
        color: PropTypes.string,
        fontSize: PropTypes.number,
        onPressItem: PropTypes.func.isRequired
    };

    static defaultProps = {
        color: 'white',
        fontSize: px2dp(12)
    };

    _onPress = () => {
        this.props.onPressItem(this.props.id);
      };

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}>
                <View style={{height: px2dp(16),flex: 1, flexDirection: 'row'}}>
                    <Text style={{fontSize:this.props.fontSize, color: this.props.color}}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        height: px2dp(40),
        paddingLeft: px2dp(15),
        justifyContent: 'center'
    },

    item: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: px2dp(80),
        backgroundColor: '#fff',
        paddingLeft: px2dp(15),
        paddingRight: px2dp(17),
        borderTopColor: '#d4d4d4',
        borderTopWidth: 1 / PixelRatio.get()
    },
});