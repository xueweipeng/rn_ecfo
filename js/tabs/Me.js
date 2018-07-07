import React, { Component } from 'react'
import PropTypes from 'prop-types';
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
	Platform,
	PixelRatio,
	Alert,
	AlertIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import IndividualPage from '../page/IndividualPage';
import TextButton from '../component/TextButton';
import theme from '../config/theme'
import px2dp from '../util/px2dp'
import Avatar from '../component/Avatar'



export default class Me extends Component {
	constructor(props){
        super(props);
        this.state = {

        };
	}
	_onPressCallback(position){
		switch(position){
			case 0:  //title
				this.props.navigator.push({
					component: IndividualPage
				});
				break;
 
			case 1:  // add occupation
				this._alert();
				break;
 
			case 2:  //collection
				this._alert();
				break;
 
			case 3:  //read articles
				this._alert();
				break;
 
			case 4:  //tags
				this._alert();
				break;
 
			case 5:  //rank
				this._alert();
				break;
 
			case 6: {  //setting
				this._alert();
				break;
			}
		}
	 }

	 _alert(){
        if(Platform.OS === 'android') {
            Alert.alert(
                'Message',
                "This function currently isn't available",
                [{text: 'OK', onPress: () => {}}]
            );
        }else if(Platform.OS === 'ios'){
            AlertIOS.alert(
                'Message',
                "This function currently isn't available",
                [{text: 'OK', onPress: () => {}}]
            );
        }
	}
	
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.actionBar}>
                    <Text style={{color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize}}>我</Text>
                </View>
                <ScrollView>
                {Platform.OS === 'android' ?
                    <TouchableOpacity onPress={this._onPressCallback.bind(this, 0)}>
                        <View style={styles.intro}>
                            <Avatar image={require('../image/logo_og.png')} size={px2dp(55)} textSize={px2dp(20)}/>
                            <View style={{marginLeft: px2dp(12)}}>
                                <Text style={{color: theme.text.color, fontSize: px2dp(20)}}>React_Native</Text>
                                <TextButton text="添加职位 @添加公司" color="#949494" fontSize={px2dp(13)} onPress={this._onPressCallback.bind(this, 1)}/>
                            </View>
                            <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end'}}>
                                <Icon name="ios-arrow-forward" color="#ccc" size={px2dp(30)}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={this._onPressCallback.bind(this, 0)} activeOpacity={theme.btnActiveOpacity}>
                        <View style={styles.intro}>
                            <Avatar image={require('../image/logo_og.png')} size={px2dp(55)} textSize={px2dp(20)}/>
                            <View style={{marginLeft: px2dp(12)}}>
                                <Text style={{color: theme.text.color, fontSize: px2dp(20)}}>WangdiCoder</Text>
                                <TextButton text="添加职位 @添加公司" color="#949494" fontSize={px2dp(13)} onPress={this._onPressCallback.bind(this, 1)}/>
                            </View>
                            <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end'}}>
                                <Icon name="ios-arrow-forward" color="#ccc" size={px2dp(30)}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
                <View style={styles.list}>
                    <Item icon="md-heart" text="我的收藏" subText="15篇" iconColor="#32cd32" onPress={this._onPressCallback.bind(this, 2)}/>
                    <Item icon="md-eye" text="阅读过的文章" subText="15篇" onPress={this._onPressCallback.bind(this, 3)}/>
                    <Item icon="md-pricetag" text="标签管理" subText="9个" onPress={this._onPressCallback.bind(this, 4)}/>
                </View>
                <View style={styles.list}>
                    <Item icon="md-ribbon" text="掘金排名" iconColor="#ff4500" onPress={this._onPressCallback.bind(this, 5)}/>
                    <Item icon="md-settings" text="设置" onPress={this._onPressCallback.bind(this, 6)}/>
                </View>
                </ScrollView>
            </View>
        );
    }
}

class Item extends Component{
    static propTypes = {
        icon: PropTypes.string.isRequired,
        iconColor: PropTypes.string,
        text: PropTypes.string.isRequired,
        subText: PropTypes.string,
        onPress: PropTypes.func
    }

    static defaultProps = {
        iconColor: 'gray'
    }

    render(){
        const {icon, iconColor, text, subText, onPress} = this.props;

        if(Platform.OS === 'android'){
            return(
                <TouchableOpacity onPress={onPress}>
                    <View style={styles.listItem}>
                        <Icon name={icon} size={px2dp(22)} color={iconColor}/>
                        <Text style={{color: 'black', fontSize: px2dp(15), marginLeft: px2dp(20)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text style={{color: "#ccc"}}>{subText}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
                    <View style={styles.listItem}>
                        <Icon name={icon} size={px2dp(22)} color={iconColor}/>
                        <Text style={{color: 'black', fontSize: px2dp(15), marginLeft: px2dp(20)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text style={{color: "#ccc"}}>{subText}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    actionBar: {
        height: theme.actionBar.height,
        backgroundColor: theme.actionBar.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0,
    },
    intro: {
        height: px2dp(100),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: px2dp(20),
        borderTopWidth: 1/PixelRatio.get(),
        borderBottomWidth: 1/PixelRatio.get(),
        borderBottomColor: '#c4c4c4',
        borderTopColor: '#e4e4e4',
        marginTop: px2dp(10)
    },
    list:{
        flex: 1,
        borderTopWidth: 1/PixelRatio.get(),
        borderTopColor: '#e4e4e4',
        marginTop: px2dp(15)
    },
    listItem: {
        flex: 1,
        height: px2dp(47),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(25),
        paddingRight: px2dp(25),
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 1/PixelRatio.get()
    }
});