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

import theme from '../config/theme';
import px2dp from '../util/px2dp';
var {width,height} = Dimensions.get('window');
import Video from 'react-native-video'

export default class PlayerPage extends Component {
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0)
        this.state = {
            songs: [],   //歌曲id数据源
            playModel:1,  // 播放模式  1:列表循环    2:随机    3:单曲循环
            btnModel:require('../image/list_loop.png'), //播放模式按钮背景图
            pic_small:'',    //小图
            pic_big:'',      //大图
            file_duration:0,    //歌曲长度
            song_id:'',     //歌曲id
            title:'',       //歌曲名字
            author:'',      //歌曲作者
            file_link:'',   //歌曲播放链接
            songLyr:[],     //当前歌词
            sliderValue: 0,    //Slide的value
            pause:false,       //歌曲播放/暂停
            currentTime: 0.0,   //当前时间
            duration: 0.0,     //歌曲时间
            currentIndex:0,    //当前第几首
            isplayBtn:require('../image/pause.png'),  //播放/暂停按钮背景图
            imgRotate: new Animated.Value(0),
        }
        this.myAnimate = Animated.timing(this.state.imgRotate, {
            toValue: 1,
            duration: 6000,
            easing: Easing.inOut(Easing.linear),
        });
    }

    render(){
        return(
            <View style={{flex: 1, flexDirection:'column'}}>
                {/*Android下必须有控件才能跳转*/}
                {/* <NavigationBar title="个人主页" backOnPress={this._handleBack.bind(this)}/> */}
                <Text style={{ color: theme.text.color, fontSize: px2dp(20) }}>播放页面</Text>
                <Text style={{ color: theme.text.color, fontSize: px2dp(20) }}>{this.props.lessonTitle}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1
    },
    playingControl: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    playingInfo: {
        flexDirection: 'row',
        alignItems:'stretch',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor:'rgba(255,255,255,0.0)'
    },
    text: {
        color: "black",
        fontSize: 22
    },
    modal: {
        height: 300,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingTop: 5,
        paddingBottom: 50
    },
    itemStyle: {
        paddingTop: 20,
        height:25,
        backgroundColor:'rgba(255,255,255,0.0)',
    }
})