'use strict';

import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import reg from './regReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
    loginReducer: loginReducer, // 登录类型状态
    // reg: reg // 注册类型状态
    playerReducer: playerReducer //播放器类型状态
});

export default rootReducer;