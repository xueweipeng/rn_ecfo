
'use strict';

import {PixelRatio, Dimensions, Platform} from 'react-native';
import px2dp from '../util/px2dp';

const globalTextColor = '#000';

export default {
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    themeColor: '#faad27',
    pageBackgroundColor: '#f4f4f4',
    grayColor: '#c4c4c4',
    btnActiveOpacity: 0.7,
    actionBar: {
        height: (Platform.OS === 'android') ? px2dp(49) : px2dp(69),
        backgroundColor: '#faad27',
        fontSize: px2dp(16),
        fontColor: 'white'
    },
    text: {
        color: '#ffffff',
        fontSize: px2dp(20)
    },
    scrollView: {
        fontSize: px2dp(15),
        underlineStyle: {
            backgroundColor: 'white'
        }
    }
};