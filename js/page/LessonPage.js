import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity, Dimensions, Image, PixelRatio, BackAndroid, Alert, AlertIOS, FlatList } from 'react-native';
import theme from '../config/theme';
import px2dp from '../util/px2dp';


export default class LessonPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            loadedData: false,
            lessonList: []
        }
    }

    _handleBack() {

    }

    _header = () => {
        return <Text style={[styles.txt, { backgroundColor: 'gray' }]}>课程详情</Text>;
    }

    _separator = () => {
        return <View style={{ height: 1, backgroundColor: 'gray' }} />;
    }

    _renderItem = (item) => {
        return (
            <TouchableOpacity
                onPress={this._onItemClick.bind(this, item)}>
                <Text style={styles.title}>{item.item.name}</Text>
            </TouchableOpacity>
        )
    }

    _onItemClick = (item) => {
        // this._alert(item.index);
        // this.props.navigator.popToRoot({
        //     animated: false, // does the popToRoot have transition animation or does it happen immediately (optional)
        //     // animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
        //   })
        //导航器官方文档 https://wix.github.io/react-native-navigation/#/screen-api?id=poptorootparams-
        this.props.navigator.push({
            screen: 'Player',
            title: '',
            passProps: {
                lessonTitle: item.item.name,
                lessonUrl: item.item.url,
                lessonPic: this.props.picUrl
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
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    ref={(flatList) => this._flatList = flatList}
                    ListHeaderComponent={this._header}
                    keyExtractor={(item, index) => item + index}
                    data={this.props.lessonList}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    refreshing={false}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    slide: {

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
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'black',
        fontSize: 30,
    },
    title: {
        textAlign: 'left',
        textAlignVertical: 'center',
        color: 'black',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
    content: {
        textAlign: 'left',
        textAlignVertical: 'center',
        color: 'gray',
        fontSize: 30,
    }
});