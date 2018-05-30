import React, { Component } from 'react'
import {
	AppRegistry,
  	StyleSheet,
	Dimensions,
  	Text,
  	View,
	Image,
	ListView,
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	CameraRoll,
	Animated,
	Platform
} from 'react-native'


export default class Me extends Component {
    render() {
        return (<View style = {styles.container}>
            <Text style={styles.text}>我的</Text>
        </View>)
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'ios' ? 60 : 54,
		paddingBottom: 50
	},
	listItem: {
		backgroundColor: 'white',
		width: 300,
		padding: 10,
	},
	itemTitle: {
		flex: 1,
		lineHeight: 20,
		marginRight: 5
	},
	itemImage: {
		width: 60,
		height: 60
	},
	slideContainer: {
		height: 200,
		flex: 0
	},
	slide: {
		height: 200,
		backgroundColor: 'transparent',
	},
	slideTitle: {
		color: '#fff',
		fontSize: 18,
		marginTop: 100,
		marginLeft: 20,
		marginRight: 20,
		textAlign: 'center'
    },
    text: {
        color: '#000',
        fontSize: 16,
        marginLeft:10,
        marginTop:10,
        textAlign: 'center'
    }
})