import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity, Dimensions, Image, PixelRatio, BackAndroid, Alert, AlertIOS, FlatList } from 'react-native';
import theme from '../config/theme';
import px2dp from '../util/px2dp';

/**
 * 生命周期如下:
    constructor()
    componentWillMount()
    render()
    componentDidMount()
 */
export default class LessonPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            loadedData: false,
            lessonList: []
        }
    }

    _fetchData() {
        // fetch('http://gold.xitu.io/api/v1/hot/57fa525a0e3dd90057c1e04d/android')
        // 	.then((response) => response.json())
        // 	.then((responseData) => {
        // 		let data = responseData.data;
        // 		let entry = data.entry;
        var dataBlob = [];

        // 		for (let i in entry) {
        // 			let itemInfo = {
        // 				title: entry[i].title,
        // 				collectionCount: entry[i].collectionCount,
        // 				user: entry[i].user,
        // 				time: computeTime(entry[i].createdAtString),
        // 				url: entry[i].url,
        // 				commentsCount: entry[i].commentsCount,
        // 				viewsCount: entry[i].viewsCount,
        // 				screenshot: entry[i].screenshot ? entry[i].screenshot : null
        // 			}
        // 			dataBlob.push(itemInfo);
        // 		}

        this.setState({
            lessonList: dataBlob,
            loadedData: true,
            refreshing: false
        });
        // 	}).done();
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
                <Text style={styles.title}>{item.item.title}</Text>				
			</TouchableOpacity>
		)
    }

    _onItemClick = (item) => {
		this._alert(item.index);
		// this.props.navigator.push({
		// 	screen: 'LessonPage',
		// 	title: '课程详情'
		// });
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
        this._fetchData();
    }

    render() {
        var data = [];
        for (var i = 0; i < 5; i++) {
            data.push({ key: i, title: '第' + i + '课' });
        }
        if (!this.state.refreshing || this.state.loadedData) {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={(flatList) => this._flatList = flatList}
                        ListHeaderComponent={this._header}
                        keyExtractor={(item, index) => '' + index}
                        data={data}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        refreshing={false}
                    />
                </View>
            );
        }
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