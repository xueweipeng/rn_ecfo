import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    View,
    Slider,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Animated,
    Easing,
    InteractionManager
} from 'react-native'
import Video from 'react-native-video'
import store from '../screens'
import { connect } from 'react-redux'; // 引入connect函数
import * as playAction from '../action/playerAction';// 导入action方法

class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            repeat: false,
            // playUrl: '',
            // pause: false,
            // playPosition: 0,
            playTime: 0.0
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     store.subscribe(() => {
    //         //监听state变化
    //         console.log('player state change ' + store.getState().playerReducer.status)
    //         playerState = store.getState().playerReducer.status
    //         if (playerState.playState === 0) {
    //             this.setState({
    //                 pause: true,
    //             })
    //         } else {
    //             if (playerState.playUrl === '') {//不是新的播放链接
    //                 this.setState({
    //                     pause: false,
    //                 })
    //                 if (playerState.position != 0) {
    //                     this.refs.player.seek(this.state.playPosition)
    //                 }
    //             } else {
    //                 this.setState({
    //                     playUrl: playerState.playUrl,
    //                     playPosition: playerState.position,
    //                 })
    //                 this.refs.player.seek(this.state.playPosition)
    //             }
    //         }

    //     });
    // }

    //播放器每隔250ms调用一次
    onProgress = (data) => {
        console.log('onProgress')
        const { onProgress } = this.props;
        onProgress(data.currentTime)
    }

    // 播放器加载好时调用,其中有一些信息带过来
    onLoad = (data) => {
        console.log('player loaded')
        const { loaded, url } = this.props;
        loaded(url, data.duration);
        // this.setState({ duration: data.duration });
    }

    onBuffer = () => {
        console.log('onbuffer')
    }

    onError = (e) => {
        console.log('error:' + e)
    }

    render() {
        let { playState, url } = this.props;
        console.log("URL:" + url);
        let paused = playState === 0 ? true : false;
        return (
            url ? 
            <Video
                source={{ uri: url }}
                ref='video'
                volume={1.0}
                paused={paused}
                // repeat={this.state.repeat}
                onProgress={(e) => this.onProgress(e)}
                onLoad={(e) => this.onLoad(e)}
                playInBackground={true}
                playWhenInactive={true}
                audioOnly={true}
                onError={(e) => this.onError(e)}
                onBuffer={() => this.onBuffer()}
            />
            : null
        )
    }
}

export default connect(
    (store) => ({
        playState: store.playerReducer.playState,
        url: store.playerReducer.url,
        playProgress: store.playerReducer.playProgress,
        position: store.playerReducer.position,
        playTime: store.playerReducer.playTime
    })
    ,
    (dispatch) => ({
        loaded: (url, playtime) => dispatch(playAction.loaded(url, playtime)),
        onProgress: (progress) => dispatch(playAction.onProgress(progress))
    })
)(Player)