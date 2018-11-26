import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform, RefreshControl, ScrollView, ToastAndroid, Image, Dimensions, PixelRatio, Alert, AlertIOS, FlatList, SectionList, TouchableOpacity } from 'react-native';
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

	_fetchData() {
		fetch('http://localhost:8081/js/data/data.json')
			.then((response) =>
				response.json()
			)
			.then((responseJson) => {
				var dataBlob = [];
				let data = responseJson.data
				for (let i in data) {
					let dataItem = {
						lessonType: data[i].lessonType,
						lesson: data[i].lesson
					}
					dataBlob.push(dataItem)
				}

				this.setState({
					dataBlob: dataBlob,
					loadedData: true,
					refreshing: false
				})
			})
			.catch((error) => {
				console.error(error);
			});
	}

	_onBanner1Clicked = () => {
		this.props.navigator.push({
			screen: 'WebView',
			passProps: {
				url: 'https://github.com/facebook/react-native'
			}
		});
	}

	_onBanner2Clicked = () => {
		this.props.navigator.push({
			screen: 'WebView',
			passProps: {
				url: 'http://www.baidu.com'
			}
		});
	}

	componentWillMount() {
		this._fetchData();
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
						<TouchableOpacity onPress={this._onBanner1Clicked.bind(this)}>
							<Image style={styles.image} source={bannerImages[0]} resizeMode="stretch" />
						</TouchableOpacity>
						<TouchableOpacity onPress={this._onBanner2Clicked.bind(this)}>
							<Image style={styles.image} source={bannerImages[1]} resizeMode="stretch" />
						</TouchableOpacity>
					</Swiper>
					{this._renderListView()}
				</ScrollView >

			</View >
		)
	}

	_renderListView() {
		
		// for (var i = 0; i < this.state.dataBlob.length; i++) {
			// var datas = [];
			// for (var j = 0; j < 10; j++) {
			// 	datas.push({ title: 'title:' + j });
			// }
		// 	sections.push({ key: i, data: this.state.dataBlob });
		// }
		
		if (!this.state.refreshing || this.state.loadedData) {
			var sections = this.state.dataBlob.map(row => ({
				lessonType: row.lessonType,
				data: row.lesson,
			}));
			// let lesson = this.state.dataBlob[0].lesson
			return (
				<View style={{ flex: 1 }}>
					{/* <FlatList
						ref={(flatList) => this._flatList = flatList}
						ListHeaderComponent={this._header}
						keyExtractor={(item, index) => item + index}
						data={lesson}
						ItemSeparatorComponent={this._separator}
						renderItem={this._renderLessonItem}
						refreshing={false}
					/> */}
					<SectionList
						renderSectionHeader={this.renderHeader}
						renderItem={this.renderItem}
						sections={sections} 
						ItemSeparatorComponent={this._separator}
						refreshing={false}
						keyExtractor={(item, index) => item + index} />
				</View>
			);
		}
	}

	renderHeader = (item) => {
		return <Text style={styles.txt}>{item.section.lessonType}</Text>;
	}

	renderItem = (item) => {
		// console.log('!!!!!!!' + JSON.stringify(item));
		return (
			<TouchableOpacity
				onPress={this._onItemClick.bind(this, item)}>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<Image source={{ uri: item.item.pic }} style={{ width: 70, height: 100, margin: 10 }}></Image>
					<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
						<Text style={styles.title}>{item.item.lessonTitle}</Text>
					</View>
				</View>

			</TouchableOpacity>
		)
	}

	_header = () => {
		return <Text style={styles.txt}>{this.state.dataBlob[0].lessonType}</Text>;
	}

	_separator = () => {
		return <View style={{ height: 2, backgroundColor: 'gray' }} />;
	}

	_renderLessonItem = (item) => {
		return (
			<TouchableOpacity
				onPress={this._onItemClick.bind(this, item)}>
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<Image source={{ uri: item.item.pic }} style={{ width: 70, height: 100, margin: 10 }}></Image>
					<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }}>
						<Text style={styles.title}>{item.item.lessonTitle}</Text>
					</View>
				</View>

			</TouchableOpacity>
		)
	}

	_onItemClick = (item) => {
		this.props.navigator.push({
			screen: 'LessonPage',
			title: item.item.lessonTitle,
			passProps: {
				lessonList: item.item.lessonList,
				picUrl: item.item.pic
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

	_onRefresh() {
		this.setState({ refreshing: true });
		this._fetchData();
	}

	_renderItem = (info) => {
		var txt = 'index:' + info.index + ' ' + info.item.title;
		var bgColor = info.index % 2 == 0 ? 'red' : 'blue';
		return <Text
			style={{ height: 100, textAlignVertical: 'center', backgroundColor: bgColor, color: 'white', fontSize: 15 }}>{txt}</Text>
	}

	_sectionComp = (info) => {
		var txt = 'key:' + info.section.key;
		return <Text
			style={{ height: 50, textAlign: 'center', textAlignVertical: 'center', backgroundColor: 'black', color: 'white', fontSize: 30 }}>{txt}</Text>
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
		backgroundColor: 'white'
	},
	title: {
		textAlign: 'left',
		textAlignVertical: 'center',
		color: 'black',
		fontSize: 30,
		width: Dimensions.get('window').width - 100,
		marginRight: 20
	},
	content: {
		textAlign: 'left',
		textAlignVertical: 'center',
		color: 'gray',
		fontSize: 30,
	}
});