'use strict';

import * as types from '../constants/loginTypes'
import storage from '../util/storage'
import alert from '../util/utils';

// 访问登录接口 根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理
export function login(isPassword, mobile, passwordOrAuthcode) {
    console.log('登录方法');
    return dispatch => {
        dispatch(isLogining());
        let url = ''
        if (isPassword === true) {
            url = 'http://localhost:5000/login/user?user_name=' + mobile + '&pwd=' + passwordOrAuthcode
        } else {
            url = 'http://localhost:5000/login/phone?phone=' + mobile + '&authcode=' + passwordOrAuthcode
        }
        fetch(url)
            .then((response) =>
                response.json()
            )
            .then((responseJson) => {
                console.log('登录返回')
                let message = responseJson.message
                if (message === 'success') {
                    let data = responseJson.data
                    let user = data.user
                    console.log('name=' + user.name)
                    console.log('phone=' + user.phone)
                    dispatch(loginSuccess(true, user));
                } else {
                    dispatch(loginError(false, message));
                }
            })
            .catch((error) => {
                alert('登录失败，失败信息：' + error)
            });
    }
}

export function logout() {
    console.log('退出登录')
    return dispatch => {
        dispatch(logout())
    }
}

function logout() {
    storage.save({
        key: 'user',
        data: {}
    })
    return {
        type: types.LOGIN_OUT,
        data: {}
    }
}

function isLogining() {
    return {
        type: types.LOGIN_IN_DOING
    }
}

function loginSuccess(isSuccess, user) {
    console.log('success');
    storage.save({
        key: 'user',
        data: user
    })
    return {
        type: types.LOGIN_IN_DONE,
        user: user,
    }
}

function loginError(isSuccess, message) {
    console.log('error');
    alert('登录失败，失败信息：' + message)
    return {
        type: types.LOGIN_IN_ERROR,
        msg: message
    }
}
