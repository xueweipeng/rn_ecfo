import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform, RefreshControl, ScrollView, ToastAndroid, Image, Dimensions, PixelRatio, Alert, AlertIOS, FlatList, TouchableOpacity } from 'react-native';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import computeTime from '../util/computeTime';
import Swiper from 'react-native-swiper';


const bannerImages = [
	require('../image/banner1.jpg'),
	require('../image/banner2.png')
];

export default class Lesson extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: true,
			loadedData: false,
			dataBlob: []
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh.bind(this)}
						colors={['red', '#ffd500', '#0080ff', '#99e600']}
						tintColor={theme.themeColor}
						title="Loading..."
						titleColor={theme.themeColor}
					/>
				}>
					<Swiper
						height={px2dp(130)}
						autoplay={true}
						bounces={true}>
						<View style={styles.slide}>
							<Image style={styles.image} source={bannerImages[0]} resizeMode="stretch" />
						</View>
						<View style={styles.slide}>
							<Image style={styles.image} source={bannerImages[1]} resizeMode="stretch" />
						</View>
					</Swiper>
					{this._renderListView()}
				</ScrollView >

			</View >
		)
	}

	_renderListView() {
		var data = [];
		for (var i = 0; i < 5; i++) {
			data.push({ key: i, title: i + '', content: 'good' });
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
						renderItem={this._renderLessonItem}
						refreshing={false}
					/>
				</View>
			);
		}
	}

	_header = () => {
		return <Text style={[styles.txt, { backgroundColor: 'white' }]}>这是头部</Text>;
	}

	_separator = () => {
		return <View style={{ height: 2, backgroundColor: 'gray' }} />;
	}

	_renderLessonItem = (item) => {
		var txt = '第' + item.index + '个' + ' title=' + item.item.title;
		var con = item.item.content + item.item.key;
		var bgColor = item.index % 2 == 0 ? 'red' : 'blue';
		return (
			<TouchableOpacity
				onPress={this._onItemClick.bind(this, item)}>
				<View style={{flex: 1, flexDirection: 'row'}}>
					<Image source={ require('../image/logo_og.png') } style={{ width: 70, height: 100, marginRight: 10}}></Image>
					<View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems:'stretch'}}>
						<Text style={styles.title}>title</Text>
						<Text style={styles.con}>content</Text>
						<Text style={styles.con}>content</Text>
					</View>
				</View>
				
			</TouchableOpacity>
		)
	}

	_onItemClick = (item) => {
		// this._alert(item.index);
		this.props.navigator.push({
			screen: 'LessonPage',
			title: '课程详情'
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

	componentDidMount() {
		this._fetchData();
	}

	_onRefresh() {
		this.setState({ refreshing: true });
		this._fetchData();
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
			dataBlob: dataBlob,
			loadedData: true,
			refreshing: false
		});
		// 	}).done();
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
		textAlign: 'left',
		textAlignVertical: 'center',
		color: 'black',
		fontSize: 30,
	},
	title: {
		textAlign: 'left',
		textAlignVertical: 'center',
		color: 'black',
		fontSize: 40,
	},
	content: {
		textAlign: 'left',
		textAlignVertical: 'center',
		color: 'gray',
		fontSize: 30,
	}
});