import {
    Platform,
    Alert,
    AlertIOS
} from 'react-native'

export default function alert(message) {
    if (Platform.OS === 'android') {
        Alert.alert(
            'Message',
            message,
            [{ text: 'OK', onPress: () => { } }]
        );
    } else if (Platform.OS === 'ios') {
        AlertIOS.alert(
            'Message',
            message,
            [{ text: 'OK', onPress: () => { } }]
        );
    }
}

/**
 * 生命周期如下:
    constructor()
    componentWillMount()
    render()
    componentDidMount()
 */