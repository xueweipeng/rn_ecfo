"use strict";

import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ViewPropTypes
} from 'react-native';

export default class CountDownButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timerCount: this.props.timerCount || 60,
            timerTitle: this.props.timerTitle || '重新获取',
            counting: true,
            selfEnable: false,
        };
        this._shouldStartCountting = this._shouldStartCountting.bind(this)
        this._countDownAction = this._countDownAction.bind(this)
    }
    static propTypes = {
        style: ViewPropTypes.style,
        textStyle: Text.propTypes.style,
        onClick: PropTypes.func,
        disableColor: PropTypes.string,
        timerTitle: PropTypes.string,
        enable: PropTypes.bool,
        timerEnd: PropTypes.func
    };

    _countDownAction() {
        const codeTime = this.state.timerCount;
        const now = Date.now()
        const overTimeStamp = now + codeTime * 1000 + 100
        this.interval = setInterval(() => {
            const nowStamp = Date.now()
            if (nowStamp >= overTimeStamp) {
                this.interval && clearInterval(this.interval);
                this.setState({
                    timerCount: codeTime,
                    timerTitle: this.props.timerTitle || '重新获取',
                    counting: false,
                    selfEnable: true
                })
                if (this.props.timerEnd) {
                    this.props.timerEnd()
                };
            } else {
                const leftTime = parseInt((overTimeStamp - nowStamp) / 1000, 10)
                this.setState({
                    timerCount: leftTime,
                    timerTitle: `重新获取(${leftTime}s)`,
                })
            }
        }, 1000)
    }

    _shouldStartCountting(shouldStart) {
        if (this.state.counting) { return }
        if (shouldStart) {
            this._countDownAction()
            this.setState({ counting: true, selfEnable: false })
        } else {
            this.setState({ selfEnable: true })
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    componentDidMount() {
        this._countDownAction()
    }

    render() {
        const { onClick, style, textStyle, enable, disableColor } = this.props
        const { counting, timerTitle, selfEnable } = this.state
        return (
            <TouchableOpacity onPress={() => {
                if (!counting && enable && selfEnable) {
                    this.setState({ selfEnable: false })
                    this.props.onClick(this._shouldStartCountting)
                };
            }}>
                <View style={styles.container}>
                    <Text style={[{ fontSize: 16 }, { color: ((!counting && enable && selfEnable) ? (textStyle ? textStyle.color : 'blue') : disableColor || 'gray') }]}>{timerTitle}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    },
})