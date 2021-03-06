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
//无法请求时要配置xcode
//1. 在Info.plist中添加NSAppTransportSecurity类型Dictionary。 
//2. 在NSAppTransportSecurity下添加NSAllowsArbitraryLoads类型Boolean,值设为YES
import theme from '../config/theme';
import px2dp from '../util/px2dp';
var { width, height } = Dimensions.get('window');
import Video from 'react-native-video'
import Icon from 'react-native-vector-icons/FontAwesome'
import { THEME_TEXT_COLOR, THEME_LABEL, THEME_TEXT, BUTTON_BACKGROUND, CLICKABLE_TEXT, THEME_BACKGROUND_WHITE } from "../config/color"
import * as playAction from '../action/playerAction';// 导入action方法
import store from '../screens'
import { connect } from 'react-redux'; // 引入connect函数


class PlayerPage extends Component {
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0);
        this.state = {
            songs: [],   //歌曲id数据源
            playModel: 1,  // 播放模式  1:列表循环    2:随机    3:单曲循环
            btnModel: require('../image/list_loop.png'), //播放模式按钮背景图
            pic_small: '',    //小图
            file_duration: 0,    //歌曲长度
            song_id: '',     //歌曲id
            title: '',       //歌曲名字
            author: '',      //歌曲作者
            file_link: '',   //歌曲播放链接
            sliderValue: 0,    //Slide的value
            pause: false,       //歌曲播放/暂停
            currentTime: 0.0,   //当前时间
            duration: 0.0,     //歌曲时间
            currentIndex: 0,    //当前第几首
            isplayBtn: require('../image/pause.png'),  //播放/暂停按钮背景图
            imgRotate: new Animated.Value(0),
        }
        this.myAnimate = Animated.timing(this.state.imgRotate, {
            toValue: 1,
            duration: 6000,
            easing: Easing.inOut(Easing.linear),
        });
    }

    // componentWillReceiveProps(nextProps) {
    //     store.subscribe(() => {
    //         //监听state变化
    //         console.log('player state change ' + store.getState().playerReducer.status)
    //         playerState = store.getState().playerReducer.status
    //         let val = parseInt(playerState.playTime)
    //         this.setState({
    //             sliderValue: val,
    //             currentTime: playerState.playProgress
    //         })
    //     });
    // }

    componentDidMount() {
        let { play, url, position } = this.props;
        play(url, position);
    }

    imgMoving = () => {

        if (this.isGoing) {
            this.state.imgRotate.setValue(0);
            this.myAnimate.start(() => {
                this.imgMoving()
            })
        }
    }

    stop = () => {
        this.isGoing = !this.isGoing;

        if (this.isGoing) {
            this.myAnimate.start(() => {
                this.myAnimate = Animated.timing(this.state.imgRotate, {
                    toValue: 1,
                    duration: 6000,
                    easing: Easing.inOut(Easing.linear),
                });
                this.imgMoving()
            })
        } else {
            this.state.imgRotate.stopAnimation((oneTimeRotate) => {
                //计算角度比例
                this.myAnimate = Animated.timing(this.state.imgRotate, {
                    toValue: 1,
                    duration: (1 - oneTimeRotate) * 6000,
                    easing: Easing.inOut(Easing.linear),
                });
            });

        }

    }

    //上一曲
    prevAction = (index) => {
        this.recover()
        lyrObj = [];
        if (index == -1) {
            index = this.state.songs.length - 1 // 如果是第一首就回到最后一首歌
        }
        this.setState({
            currentIndex: index  //更新数据
        })
        // this.loadSongInfo(index)  //加载数据
    }

    //下一曲
    nextAction = (index) => {
        this.recover()
        lyrObj = [];
        if (index == 10) {
            index = 0 //如果是最后一首就回到第一首
        }
        this.setState({
            currentIndex: index,  //更新数据
        })
        // this.loadSongInfo(index)   //加载数据
    }

    //上一首/下一首
    playPreAndNextAction = index => {
        let { lessonList, play, pause, setCurrentItem } = this.props;
        pause()
        play(lessonList[index].url, 0)
        setCurrentItem(lessonList[index]);
    }

    //播放/暂停
    playAction = () => {
        const { play, pause, url } = this.props
        //判断按钮显示什么
        if (this.state.pause == false) {
            this.setState({
                isplayBtn: require('../image/play.png')
            })
            pause()
        } else {
            this.setState({
                isplayBtn: require('../image/pause.png')
            })
            play(url, 0)
        }
        this.setState({
            pause: !this.state.pause
        })
    }

    //换歌时恢复进度条 和起始时间
    recover = () => {
        this.setState({
            sliderValue: 0,
            currentTime: 0.0
        })
    }

    //播放器每隔250ms调用一次
    onProgress = (data) => {
        console.log('onProgress')
        let val = parseInt(data.currentTime)
        this.setState({
            sliderValue: val,
            currentTime: data.currentTime
        })

        //如果当前歌曲播放完毕,需要开始下一首
        if (val == this.state.file_duration) {
            if (this.state.playModel == 1) {
                //列表 就播放下一首
                this.nextAction(this.state.currentIndex + 1)
            } else if (this.state.playModel == 2) {
                let last = this.state.songs.length //json 中共有几首歌
                let random = Math.floor(Math.random() * last)  //取 0~last之间的随机整数
                this.nextAction(random) //播放
            } else {
                //单曲 就再次播放当前这首歌曲
                this.refs.video.seek(0) //让video 重新播放
            }
        }

    }
    //把秒数转换为时间类型
    formatTime(time) {
        // 71s -> 01:11
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }

    // 播放器加载好时调用,其中有一些信息带过来
    onLoad = (data) => {
        console.log('player loaded')
        this.setState({ duration: data.duration });
    }

    onBuffer = () => {
        console.log('onbuffer')
    }

    onError = (e) => {
        console.log('error:' + e)
    }

    //播放模式 接收传过来的当前播放模式 this.state.playModel
    playModel = (playModel) => {
        playModel++;
        playModel = playModel == 4 ? 1 : playModel
        //重新设置
        this.setState({
            playModel: playModel
        })
        //根据设置后的模式重新设置背景图片
        if (playModel == 1) {
            this.setState({
                btnModel: require('../image/list_loop.png'),
            })
        } else if (playModel == 2) {
            this.setState({
                btnModel: require('../image/random.png'),
            })
        } else {
            this.setState({
                btnModel: require('../image/single_loop.png'),
            })
        }
    }

    loadSongList = () => {
        //先从总列表中获取到song_id保存
        fetch('http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=2&size=10&offset=0',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                Origin: "xxxx"
            })
            .then((response) => {
                console.log(response.text())
                response.json()
            })
            .then((json) => {
                if (Platform.OS === 'android') {
                    json = json.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, '');
                    console.log(json)
                }
                return json

            }).then(
                json => { console.log(json) }
            )
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            })
    }

    // componentWillReceiveProps(nextProps) {
    //     // this.loadSongList()
    //     // this.stop()
    //     // this.play()
    //     const { play } = this.props
    //     let url = this.props.lessonUrl
    //     play(url, 0)
    // }

    render() {
        let { playTime, url, lessonList, currentItem } = this.props;
        let currentIndex = lessonList.findIndex(list => list.url === url);
        let preIndex = currentIndex === 0 ? lessonList.length - 1 : currentIndex - 1;
        let nextIndex = currentIndex === lessonList.length - 1 ? 0 : currentIndex + 1;
        return (
            <View style={styles.container}>
                {/*Android下必须有控件才能跳转*/}
                {/* <NavigationBar title="个人主页" backOnPress={this._handleBack.bind(this)}/> */}
                <View style={styles.lessonDetail} backgroundColor={this.props.lessonColor}>
                    <Image source={{ uri: this.props.lessonPic }} style={styles.image} alignSelf={'center'}></Image>
                    <Text style={{ color: '#ffffff', fontSize: px2dp(15), textAlign: 'center' }}>{currentItem.name}</Text>
                    <Text style={{ color: '#ffffff', fontSize: px2dp(10), textAlign: 'center', marginTop: px2dp(10) }}>解读人:{this.props.lessonTeacher}</Text>
                </View>
                {/*播放器*/}

                {/* <Video
                    source={{ uri: this.props.lessonUrl }}
                    ref='video'
                    volume={1.0}
                    paused={0}
                    onProgress={(e) => this.onProgress(e)}
                    onLoad={(e) => this.onLoad(e)}
                    playInBackground={true}
                    playWhenInactive={true}
                    audioOnly={true}
                    onError={(e) => this.onError(e)}
                    onBuffer={() => this.onBuffer()}
                /> */}
                {/*进度条*/}
                <Slider
                    style={styles.slider}
                    ref='slider'
                    value={parseInt(playTime)}
                    maximumValue={this.state.duration}
                    step={1}
                    minimumTrackTintColor={THEME_TEXT_COLOR}
                    onValueChange={(value) => {
                        // this.setState({
                        //     currentTime: value
                        // })
                        const { play } = this.props
                        play('', value)
                    }
                    }
                // onSlidingComplete={(value) => {
                //     this.refs.video.seek(value)
                // }}
                />
                <View style={styles.playingInfo}>
                    {/*歌曲按钮*/}
                    <View style={styles.playingControl}>
                        <TouchableOpacity onPress={() => this.playPreAndNextAction(preIndex)}>
                            <Image source={require('../image/previous.png')} style={{ width: px2dp(19), height: px2dp(19) }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.playAction}>
                            <Image source={this.state.isplayBtn} style={{ width: px2dp(38), height: px2dp(38) }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.playPreAndNextAction(nextIndex)}>
                            <Image source={require('../image/next.png')} style={{ width: px2dp(19), height: px2dp(19) }} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
}

//https://juejin.im/entry/5753bed0207703006cf5e43d 布局详解
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    lessonDetail: {
        flexDirection: 'column',
        height: px2dp(427)
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        width: px2dp(181),
        height: px2dp(181),
        marginTop: px2dp(50),
        marginBottom: px2dp(20),
    },
    slider: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    playingControl: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20
    },
    playingInfo: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'rgba(255,255,255,0.0)'
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
        height: 25,
        backgroundColor: 'rgba(255,255,255,0.0)',
    }
})

export default connect(
    (store) => ({
        playState: store.playerReducer.playState,
        url: store.playerReducer.url,
        playProgress: store.playerReducer.playProgress,
        position: store.playerReducer.position,
        playTime: store.playerReducer.playTime,
        currentItem: store.playerReducer.currentItem,
    })
    ,
    (dispatch) => ({
        play: (url, position) => dispatch(playAction.play(url, position)),
        pause: () => dispatch(playAction.pause()),
        setCurrentItem: (currentItem) => dispatch(playAction.setCurrentItem(currentItem)),
    })
)(PlayerPage)