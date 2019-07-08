'use strict';

import * as types from '../constants/playerTypes'
import alert from '../util/utils'


//set current selected item
export function setCurrentItem(currentItem) {
    return {
        type: types.PLAYER_CURRENTITEM,
        currentItem,
    }
}

//set url
export function setURL(url) {
    console.log('playerAction --------- play:' + url)
    return {
        type: types.PLAYER_URL,
        url,
    }
}

//播放
export function play(url, position) {
    console.log('playerAction --------- play:' + url + ' position:' + position)
    return dispatch => {
        dispatch(play(url, position))
    }
}

//暂停
export function pause() {
    console.log('playerAction --------- pause')
    return dispatch => {
        dispatch(pause())
    }
}

//通知读取结束
export function loaded(url, playTime) {
    console.log('playerAction --------- loaded:' + url, ' playtime:' + playTime)
    return dispatch => {
        dispatch(loaded(url, playTime))
    }
}

//通知进度
export function onProgress(progress) {
    console.log('playerAction --------- progress:' + progress)
    return dispatch => {
        dispatch(onProgress(progress))
    }
}

function play(url, position) {
    return {
        type: types.PLAYER_PLAY,
        playUrl : url,
        position : position
    }
}

function pause() {
    return {
        type: types.PLAYER_PAUSE
    }
}

function loaded(url, playTime) {
    return {
        type: types.PLAYER_LOADED,
        playTime: playTime,
        playUrl: url,
    }
}

function onProgress(progress) {
    return {
        type: types.PLAYER_PROGRESSING,
        progress : progress
    }
}