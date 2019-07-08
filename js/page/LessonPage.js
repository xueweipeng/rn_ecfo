import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity, Dimensions, Image, PixelRatio, BackAndroid, Alert, AlertIOS, FlatList } from 'react-native';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
import * as playAction from '../action/playerAction';// 导入action方法
import store from '../screens'
import { connect } from 'react-redux'; // 引入connect函数
import { THEME, THEME_TEXT_COLOR } from '../config/color';

class LessonPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            loadedData: false,
            lessonList: [],
            currentIndex: 0
        }
    }

    _handleBack() {

    }

    _header = () => {
        return <Text style={styles.txt}>总共{this.props.lessonList.length}集</Text>;
    }

    _separator = () => {
        return <View style={{ height: px2dp(0.5), backgroundColor: '#dedede' }} />;
    }

    _renderItem = (item, lessonList) => {
        let { url } = this.props;
        let isSelectedItem = url === item.item.url;
        return (
            <TouchableOpacity
                onPress={this._onItemClick.bind(this, item, lessonList)}>
                <View style={styles.item}>
                    <Text style={isSelectedItem ? styles.selectedTitle: styles.title}>{item.item.name}</Text>
                    <Text style={styles.subTitle}>{item.item.length}</Text>
                </View>
            </TouchableOpacity >
        )
    }

    _onItemClick = (item, lessonList) => {
        // this._alert(item.index);
        // this.props.navigator.popToRoot({
        //     animated: false, // does the popToRoot have transition animation or does it happen immediately (optional)
        //     // animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
        //   })
        //导航器官方文档 https://wix.github.io/react-native-navigation/#/screen-api?id=poptorootparams-
        let { setURL, setCurrentItem } = this.props;
        setURL(item.item.url);
        setCurrentItem(item.item);
        this.props.navigator.push({
            screen: 'PlayerPage',
            title: '',
            passProps: {
                lessonPic: this.props.picUrl,
                lessonTeacher: this.props.teacher,
                lessonColor: this.props.color,
                lessonList,
            }
        });

    }

    _alert(index) {
        if (Platform.OS === 'android') {
            Alert.alert(
                'Message',
                "This function currently isn't available" + index,
                [{ text: 'OK', onPress: () => { } }]
            );
        } else if (Platform.OS === 'ios') {
            AlertIOS.alert(
                'Message',
                "This function currently isn't available" + index,
                [{ text: 'OK', onPress: () => { } }]
            );
        }
    }

    componentWillMount() {

    }

    render() {
        let { lessonList } = this.props;
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', backgroundColor: this.props.color }}>
                    <Image source={{ uri: this.props.picUrl }} style={{ width: px2dp(90), height: px2dp(90), marginTop: 16, marginBottom: 16, marginLeft: 13, marginRight: 13 }}></Image>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch', marginTop: 15, marginBottom: 15 }}>
                        <Text style={styles.pageTitle}>{this.props.title}</Text>
                        <Text style={styles.teacher}>解读人:{this.props.teacher}</Text>
                    </View>
                </View>
                <FlatList
                    style={{ backgroundColor: theme.pageBackgroundColor }}
                    ref={(flatList) => this._flatList = flatList}
                    ListHeaderComponent={this._header}
                    keyExtractor={(item, index) => item + index}
                    data={lessonList}
                    ItemSeparatorComponent={this._separator}
                    renderItem={(item) => this._renderItem(item, lessonList)}
                    refreshing={false}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: theme.backgroundColor
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        marginLeft: 9,
        marginRight: 9,
        backgroundColor: 'white'
    },
    image: {
        height: px2dp(130),
        width: Dimensions.get('window').width
    },
    imageBtnLine: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#c4c4c4'
    },
    imgBtn: {
        height: px2dp(80),
        width: Dimensions.get('window').width / 3,
    },
    txt: {
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#999999',
        fontSize: px2dp(11),
        padding: px2dp(9),
        backgroundColor: 'white',
        marginBottom: px2dp(9)
    },
    pageTitle: {
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#FFFFFF',
        fontSize: 13,
        marginBottom: px2dp(15),
        width: Dimensions.get('window').width - 100,
        marginRight: 13
    },
    title: {
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 13,
        marginTop: 15,
        marginLeft: 10,
        color: '#333333',
    },
    selectedTitle: {
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 13,
        marginTop: 15,
        marginLeft: 10,
        color: THEME_TEXT_COLOR,
    },
    teacher: {
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#FFFFFF',
        fontSize: px2dp(10),
        alignItems: 'center',
        width: Dimensions.get('window').width - 100,
        marginRight: 13
    },
    subTitle: {
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#999999',
        fontSize: 11,
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 10,
    },
    content: {
        textAlign: 'left',
        textAlignVertical: 'center',
        color: 'gray',
        fontSize: 30,
    }
});

export default connect(
    (store) => ({
        url: store.playerReducer.url,
    })
    ,
    (dispatch) => ({
        setURL: (url) => dispatch(playAction.setURL(url)),
        setCurrentItem: (currentItem) => dispatch(playAction.setCurrentItem(currentItem)),
    })
)(LessonPage)