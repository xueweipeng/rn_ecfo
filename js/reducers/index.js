'use strict';

import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import reg from './regReducer';

const rootReducer = combineReducers({
    loginReducer: loginReducer, // 登录类型状态
    // reg: reg // 注册类型状态
});

export default rootReducer;