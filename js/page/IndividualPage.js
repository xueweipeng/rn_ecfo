import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Platform, ScrollView, TextInput, TouchableOpacity, ListView, Image, PixelRatio, BackAndroid, NativeModules } from 'react-native';
import theme from '../config/theme'
import px2dp from '../util/px2dp'
import Avatar from '../component/Avatar'
import RBSheet from 'react-native-raw-bottom-sheet'
import ActionSheet from 'rn-actionsheet-module'
import ImagePicker from 'react-native-image-picker';
import alert from '../util/utils'
import storage from '../util/storage'

import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';

import {
    BaseComponent,
    BaseDialog,
    AreaPicker,
    CustomPicker,
    DatePicker,
    InputDialog,
    PickerView,
    SimpleChooseDialog,
    SimpleItemsDialog,
    AlertDialog,
    DownloadDialog,
    ToastComponent
} from 'react-native-pickers';

const options = {
    title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '图片库',
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 2,
    aspectY: 1,
    quality: 0.8,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class IndividualPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: 'http://www.ecfo.com.cn/img2/elevenV.png',
            nick_name: '',
            signature: '',
            sex: '',
            birthday: '',
            education: '',
            industry: '',
            fromLocal: false,
            customBackgroundDialog: false,
            defaultAnimationDialog: false,
            scaleAnimationDialog: false,
            slideAnimationDialog: false,
            dialog_title: '',
            input_type: 0,
            dialog_input_content: '',
            pickerData: [],
            unit: ['年', '月', '日'],
            startYear: 1950,
            active: false,
            modalVisible: false
        }
    }

    componentDidMount() {
        let token = ''
        storage.load({
            key: 'user',
            autoSync: false,
        }).then(ret => {
            if (ret && ret.token) {
                token = ret.token
                this._requestForProfile(token)
                this.setState({
                    token: ret.token
                })
            } else {
                this.setState({
                    token: ''
                })
            }
        }).catch(err => {
            // console.warn(err.message);
        });

    }

    _requestForProfile(token) {
        fetch('http://127.0.0.1:5000/profile/get_profile?token=' + token)
            .then((response) =>
                response.json()
            )
            .then((responseJson) => {
                console.log('请求资料成功')
                let message = responseJson.message
                if (message === 'success') {
                    let data = responseJson.data
                    this.setState({
                        nick_name: data.nick_name,
                        signature: data.signature,
                        sex: data.sex,
                        birthday: data.birthday,
                        education: data.education,
                        industry: data.industry,
                    })
                } else {
                    alert('请求个人资料失败，失败信息：' + message)
                }
            })
            .catch((error) => {
                alert('请检查您的网络')
            });
    }

    _handleBack() {

    }

    _onPressCallback(position) {
        switch (position) {
            case 2:  //昵称
                this.setState({
                    defaultAnimationDialog: true,
                    dialog_title: '请输入昵称',
                    input_type: 2,
                });
                break;
            case 3:  //个性签名
                this.setState({
                    defaultAnimationDialog: true,
                    dialog_title: '请输入签名',
                    input_type: 3,
                });
                break;
            case 4:  //性别
                // this.RBSheet.open()
                this._onSexPressed()
                break;
            case 5:  //出生年份
                this._onBirthPressed()
                break;
            case 6:  //学历
                this._onEducationPressed()
                break;
            case 7:  //行业
                this._onIndustryPressed()
                break;
        }
    }

    _createSexData() {
        let data = []
        data.push('男')
        data.push('女')
        return data
    }

    _createBirthData() {
        let data = []
        for (let i = 1970; i < 2020; i++) {
            data.push(i + '年')
        }
        return data
    }

    _onSexPressed() {
        let data = this._createSexData()
        this.setState({
            pickerData: data
        })
        this.SexChooseDialog.show()
    }

    _onBirthPressed() {
        this.DatePicker.show()
    }

    _onEducationPressed() {
        this.EducationChooseDialog.show()
    }

    _onIndustryPressed() {
        this.setState({
            defaultAnimationDialog: true,
            dialog_title: '请输入行业',
            input_type: 7,
        });
    }

    // _onAvatarPress() {
    // log.info('avatar clicked')
    // this.RBSheet.open()
    // ActionSheet(
    //     {
    //        title             : "选择上传头像方式",
    //        optionsIOS        : ["Cancel", "从相册选择", "拍照"],
    //        optionsAndroid        : ["从相册选择", "拍照"],
    //        destructiveButtonIndex: null, // undefined // 1, 2, etc.,
    //        cancelButtonIndex     : 0, // 
    //        onCancelAndroidIndex: 3 // android doesn't need any cancel option but back button or outside click will return onCancelAndroidIndex
    //     }, (index) => {
    //      switch (index) {
    //       case Platform.OS === "ios" ? 1 : 0 :{
    //         this._onPressSelect()
    //       }
    //       case Platform.OS === "ios" ? 2 : 1 :{
    //         this._onPressCapture()
    //       }
    //       case Platform.OS === "ios" ? 0 : 3 :{
    //         //cancel
    //       }
    //       default:{

    //       }
    //      }
    //     }
    // )
    // }

    _onSelectEducation(which) {
        let edu = ''
        switch (which) {
            case 0:
                edu = '高中'
                this.setState({
                    education: '高中'
                })
                break
            case 1:
                edu = '专科'
                this.setState({
                    education: '专科'
                })
                break
            case 2:
                edu = '本科'
                this.setState({
                    education: '本科'
                })
                break
            case 3:
                edu = '硕士'
                this.setState({
                    education: '硕士'
                })
                break
            case 4:
                edu = '博士'
                this.setState({
                    education: '博士'
                })
                break
        }
        this._postProfile('edu', edu)
    }

    _postProfile(key, value) {
        var opts = {
            method: "POST",   //请求方法
            body: JSON.stringify({
                key: key,
                value: value,
                token: this.state.token
            }),   //请求体
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        }

        fetch('http://localhost:5000/profile/upload_profile', opts)
            .then((response) => {
                response.json()
            })
            .then((responseText) => {
                alert(responseText)
            })
            .catch((error) => {
                alert(error)
            })
    }

    _postEducation(edu) {
        // let formData = new FormData();
        // formData.append("username", "hello");
        // formData.append("password", "1111aaaa");

        var opts = {
            method: "POST",   //请求方法
            body: JSON.stringify({
                key: 'education',
                value: edu,
                token: this.state.token
            }),   //请求体
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        }

        fetch('http://localhost:5000/profile/upload_profile', opts)
            .then((response) => {
                response.json()
            })
            .then((responseText) => {
                alert(responseText)
            })
            .catch((error) => {
                alert(error)
            })
    }

    _onAvatarPress() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source;
                if (Platform.OS === 'android') {
                    source = { uri: response.uri, isStatic: true }
                } else {
                    source = { uri: response.uri.replace('file://', ''), isStatic: true }
                }
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatar: source,
                    fromLocal: true,
                });
                let localUri;
                if (Platform.OS === 'android') {
                    localUri = response.uri
                } else {
                    localUri = response.uri.replace('file://', '')
                }
                let formData = new FormData();//如果需要上传多张图片,需要遍历数组,把图片的路径数组放入formData中
                let file = { uri: localUri, type: 'multipart/form-data', name: 'image.png' };   //这里的key(uri和type和name)不能改变,
                formData.append("myavatar", file);
                fetch('http://localhost:5000/profile/set_avatar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((responseData) => {

                    })
                    .catch((error) => { console.error('error', error) });
            }
        });
    }

    postText() {
        switch (this.state.input_type) {
            case 2://输入昵称
                console.log('post nick name :' + this.state.dialog_input_content)
                this.setState({
                    nick_name: this.state.dialog_input_content
                })
                this._postProfile('nick_name', this.state.dialog_input_content)
                break
            case 3://签名
                console.log('post signature :' + this.state.dialog_input_content)
                this.setState({
                    signature: this.state.dialog_input_content
                })
                this._postProfile('signature', this.state.dialog_input_content)
                break
            case 4:  //性别
                break
            case 5:  //出生年份
                break
            case 6:  //学历
                break
            case 7:  //行业
                this.setState({
                    industry: this.state.dialog_input_content
                })
                this._postProfile('industry', this.state.dialog_input_content)
                break
        }

    }

    _onPressMale() {
        // this.RBSheet.close()
        this.setState({
            sex: 'male'
        })
        this._postProfile('sex', '男')
    }

    _onPressFemale() {
        // this.RBSheet.close()
        this.setState({
            sex: 'female'
        })
        this._postProfile('sex', '女')
    }

    _onSelectBirthday(value) {
        this.setState({
            birthday: value
        })
        this._postProfile('birthday', value)
    }

    render() {
        return (
            <View style={styles.container}>
                {/*Android下必须有控件才能跳转*/}
                {/* <NavigationBar title="个人主页" backOnPress={this._handleBack.bind(this)}/> */}
                <ScrollView>
                    <TouchableOpacity onPress={this._onAvatarPress.bind(this)}>
                        <View style={styles.avatar}>
                            <Avatar image={source = this.state.fromLocal ? this.state.avatar : { uri: this.state.avatar }} size={px2dp(55)} textSize={px2dp(20)} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.list}>
                        <Item text="昵称:" subText={this.state.nick_name} onPress={this._onPressCallback.bind(this, 2)} />
                        <Item text="个性签名:" subText={this.state.signature} onPress={this._onPressCallback.bind(this, 3)} />
                        <Item text="性别:" subText={this.state.sex} onPress={this._onPressCallback.bind(this, 4)} />
                        <Item text="出生年份:" subText={this.state.birthday} onPress={this._onPressCallback.bind(this, 5)} />
                    </View>
                    <View style={styles.list}>
                        <Item text="学历:" subText={this.state.education} onPress={this._onPressCallback.bind(this, 6)} />
                        <Item text="行业:" subText={this.state.industry} onPress={this._onPressCallback.bind(this, 7)} />
                    </View>
                </ScrollView>
                <Dialog
                    onDismiss={() => {
                        this.setState({ defaultAnimationDialog: false });
                    }}
                    width={0.9}
                    visible={this.state.defaultAnimationDialog}
                    rounded
                    actionsBordered
                    dialogTitle={
                        <DialogTitle
                            title={this.state.dialog_title}
                            style={{
                                backgroundColor: '#F7F7F8',
                            }}
                            textStyle={{ color: '#000000', fontSize: 18 }}
                            hasTitleBar={false}
                            align="left" />
                    }
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="取消"
                                bordered
                                onPress={() => {
                                    this.setState({ defaultAnimationDialog: false });
                                }}
                                key="button-1" />
                            <DialogButton
                                text="确定"
                                bordered
                                onPress={() => {
                                    this.postText()
                                    this.setState({ defaultAnimationDialog: false })
                                }}
                                key="button-2" />
                        </DialogFooter>
                    }>
                    <DialogContent
                        style={{ backgroundColor: '#F7F7F8' }} >
                        <TextInput style={styles.inputStyle} autoCapitalize={'none'} maxLength={20}
                            onChangeText={(text) => this.state.dialog_input_content = text} />
                    </DialogContent>
                </Dialog>
                {/*此控件可用于自定义底部对话框的布局（如选择性别）*/}
                {/* <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={80}
                    duration={250}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}>
                    <TouchableOpacity onPress={this._onPressMale.bind(this)}>
                        <Text style={{ color: '#000000', fontSize: px2dp(16), marginTop: 1, marginBottom: 1 }}>男</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onPressFemale.bind(this)}>
                        <Text style={{ color: '#000000', fontSize: px2dp(16), marginTop: 1, marginBottom: 1 }}>女</Text>
                    </TouchableOpacity>
                </RBSheet> */}

                <SimpleChooseDialog ref={ref => this.SexChooseDialog = ref}
                    onPress={(which) => {
                        if (which === 0) {
                            this._onPressMale()
                        } else {
                            this._onPressFemale()
                        }
                    }}
                    items={['男', '女']} />
                <SimpleChooseDialog ref={ref => this.EducationChooseDialog = ref}
                    onPress={(which) => {
                        this._onSelectEducation(which)
                    }}
                    items={['高中', '专科', '本科', '硕士', '博士']} />
                <DatePicker
                    unit={this.state.unit}
                    startYear={this.state.startYear}
                    onPickerConfirm={(value) => {
                        this._onSelectBirthday(value)
                    }}
                    selectedValue={['1980年', '1月', '1日']}
                    HH={false}
                    mm={false}
                    onPickerCancel={() => {

                    }}
                    ref={ref => this.DatePicker = ref} />
            </View>
        );
    }
}

class Item extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        textColor: PropTypes.string,
        subText: PropTypes.string,
        onPress: PropTypes.func
    }

    static defaultProps = {
        textColor: '#333333',
        subTextColor: '#cccccc'
    }

    render() {
        const { textColor, text, subText, subTextColor, onPress } = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.listItem}>
                    <Text style={{ color: textColor, fontSize: px2dp(13) }}>{text}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: px2dp(15) }}>
                        <Text style={{ color: subTextColor }}>{subText}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'flex-start',
        backgroundColor: theme.pageBackgroundColor
    },
    avatar: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        borderTopColor: '#e4e4e4',
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
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#c4c4c4',
        borderTopColor: '#f7f7f7',
        marginTop: px2dp(10)
    },
    list: {
        flex: 1,
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: '#f7f7f7',
        marginTop: px2dp(10)
    },
    listItem: {
        flex: 1,
        height: px2dp(52),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(18),
        paddingRight: px2dp(18),
        borderBottomColor: '#dedede',
        borderBottomWidth: 1 / PixelRatio.get()
    },
    dialogContentView: {
        paddingLeft: 18,
        paddingRight: 18,
        // backgroundColor: '#000',
        // opacity: 0.4,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    customBackgroundDialog: {
        opacity: 0.5,
        backgroundColor: '#000',
    },
    inputStyle: {
        marginTop: 20,
        marginBottom: 8,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
});