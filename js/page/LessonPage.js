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
        return <Text style={styles.txt}>总共{this.props.lessonList.length}集</Text>;
    }

    _separator = () => {
        return <View style={{ height: px2dp(0.5), backgroundColor: '#dedede' }} />;
    }

    _renderItem = (item) => {
        return (
            <TouchableOpacity
                onPress={this._onItemClick.bind(this, item)}>
                <View style={styles.item}>
                    <Text style={styles.title}>{item.item.name}</Text>
                    <Text style={styles.subTitle}>{item.item.length}</Text>
                </View>

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
                lessonPic: this.props.picUrl,
                lessonTeacher: this.props.teacher,
                lessonColor: this.props.color
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
            <View style={styles.container}>
                <View style={{flexDirection: 'row' ,backgroundColor: this.props.color}}>
					<Image source={{ uri: this.props.picUrl }} style={{ width: px2dp(90), height: px2dp(90), marginTop: 16, marginBottom:16,marginLeft:13,marginRight:13 }}></Image>
					<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch',marginTop:15,marginBottom:15}}>
						<Text style={styles.pageTitle}>{this.props.title}</Text>
						<Text style={styles.teacher}>解读人:{this.props.teacher}</Text>
					</View>
				</View>
                <FlatList
                    style={{backgroundColor: theme.pageBackgroundColor}}
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
        backgroundColor:'white'
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
        marginBottom:px2dp(9)
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
        color: '#333333',
        fontSize: 13,
        marginTop: 15,
        marginLeft: 10,
    },
	teacher: {
		textAlign: 'left',
		textAlignVertical: 'center',
		color: '#FFFFFF',
        fontSize: px2dp(10),
        alignItems:'center',
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