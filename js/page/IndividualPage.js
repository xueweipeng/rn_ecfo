import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Platform, ScrollView, TextInput, TouchableOpacity, ListView, Image, PixelRatio, BackAndroid, NativeModules } from 'react-native';
import theme from '../config/theme'
import px2dp from '../util/px2dp'
import Avatar from '../component/Avatar'
import RBSheet from 'react-native-raw-bottom-sheet'
import ActionSheet from 'rn-actionsheet-module'
import ImagePicker from 'react-native-image-picker';

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
            nick_name: 'ecfo',
            signature: 'hello',
            sex: 'male',
            birthday: '1990',
            education: '博士',
            industry: '互联网',
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
        switch (which) {
            case 0:
                this.setState({
                    education: '高中'
                })
                break
            case 1:
                this.setState({
                    education: '专科'
                })
                break
            case 2:
                this.setState({
                    education: '本科'
                })
                break
            case 3:
                this.setState({
                    education: '硕士'
                })
                break
            case 4:
                this.setState({
                    education: '博士'
                })
                break
        }
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
                let file;
                if (Platform.OS === 'android') {
                    file = response.uri
                } else {
                    file = response.uri.replace('file://', '')
                }


                // this.setState({
                //     loading:true
                // });
                // this.props.onFileUpload(file,response.fileName||'未命名文件.jpg')
                // .then((result)=>{
                //     this.setState({
                //         loading:false
                //     })
                // })
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
                break
            case 3://签名
                console.log('post signature :' + this.state.dialog_input_content)
                this.setState({
                    signature: this.state.dialog_input_content
                })
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
                break
        }

    }

    _postSex() {

    }

    _onPressMale() {
        // this.RBSheet.close()
        this.setState({
            sex: 'male'
        })
        this._postSex()
    }

    _onPressFemale() {
        // this.RBSheet.close()
        this.setState({
            sex: 'female'
        })
        this._postSex()
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
                        <Item text="昵称" subText={this.state.nick_name} textColor="#000000" onPress={this._onPressCallback.bind(this, 2)} />
                        <Item text="个性签名" subText={this.state.signature} textColor="#000000" onPress={this._onPressCallback.bind(this, 3)} />
                        <Item text="性别" subText={this.state.sex} textColor="#000000" onPress={this._onPressCallback.bind(this, 4)} />
                        <Item text="出生年份" subText={this.state.birthday} textColor="#000000" onPress={this._onPressCallback.bind(this, 5)} />
                    </View>
                    <View style={styles.list}>
                        <Item text="学历" subText={this.state.education} textColor="#000000" onPress={this._onPressCallback.bind(this, 6)} />
                        <Item text="行业" subText={this.state.industry} textColor="#000000" onPress={this._onPressCallback.bind(this, 7)} />
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
                        this.setState({
                            birthday: value
                        })
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
        textColor: '#aaaaaa',
    }

    render() {
        const { textColor, text, subText, onPress } = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.listItem}>
                    <Text style={{ color: textColor, fontSize: px2dp(15) }}>{text}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: px2dp(15) }}>
                        <Text style={{ color: this.props.textColor }}>{subText}</Text>
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
        borderTopColor: '#e4e4e4',
        marginTop: px2dp(10)
    },
    list: {
        flex: 1,
        borderTopWidth: 1 / PixelRatio.get(),
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