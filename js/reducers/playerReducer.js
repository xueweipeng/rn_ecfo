import * as types from '../constants/playerTypes'

const initialState = {
    playState: 0, //代表播放状态 0为暂停 1为播放
    position: 0,
    playProgress: 0,
    playTime: 0.0
};

export default function playerReducer(state = initialState, action) {
    switch (action.type) {
        case types.PLAYER_PLAY:
            return {
                ...state,
                url: action.playUrl,
                playState: 1,
                position: action.position //播放器接收到的从哪里播放的位置
            }
        case types.PLAYER_PAUSE:
            return {
                ...state,
                playState: 0
            }
        case types.PLAYER_LOADED:
            return {
                ...state,
                url: action.playUrl,
                playTime: action.playTime
            }
        //播放器向外通知的进度
        case types.PLAYER_PROGRESSING:
            return {
                ...state,
                playProgress: action.progress
            }

        //set url
        case types.PLAYER_URL:
            return {
                ...state,
                url: action.url,
            }

        case types.PLAYER_CURRENTITEM:
            return {
                ...state,
                currentItem: action.currentItem,
            }

        default:
            console.log(state);
            return state;
    }
}