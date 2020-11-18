import { combineReducers } from "redux";
import { ADD_NEW_USER_GROUP, SET_ALL_POSSIBLE_GROUPS, SET_ALL_USERS_GROUPS, SET_CURRENT_CHAT, SET_LOGIN, SET_LOGOUT, SET_MESSAGES, SET_READ_ERROR, SET_WRITE_ERROR } from "./action";


const userReducer = (state={checked: false, user:null}, action) => {
    switch (action.type){
        case SET_LOGIN:
            return {
                checked: true,
                user: action.payload.userInfo,
            };
        case SET_LOGOUT:
            return {checked: true, user:null};
        default:
            return state;
    }
}

const readErrorReducer = (state='', action) => {
    switch (action.type){
        case SET_READ_ERROR:
            return action.payload.error;
        default:
            return state;
    }
}

const writeErrorReducer = (state='', action) => {
    switch (action.type){
        case SET_WRITE_ERROR:
            return action.payload.error;
        default:
            return state;
    }
}

const setMessagesReducer = (state=[], action) => {
    switch (action.type){
        case SET_MESSAGES:
            return action.payload.messages;
        default:
            return state;
    }
}

const userGroupReducer = (state=[], action) => {
    switch (action.type){
        case SET_ALL_USERS_GROUPS:
            return action.payload.groups;
        case ADD_NEW_USER_GROUP:
            return state.concat(action.payload.group);
        default:
            return state
    }
}

const allGroupReducer = (state=[], action) => {
    switch (action.type){
        case SET_ALL_POSSIBLE_GROUPS:
            return action.payload.groups;
        default: return state
    }
}

const setCurrentChat = (state={}, action) => {
    switch (action.type) {
        case SET_CURRENT_CHAT:
            return action.payload.chat;
        default: return state
    }
}


export const rootReducer = combineReducers({
    user: userReducer,
    readError: readErrorReducer,
    writeError: writeErrorReducer,
    messages: setMessagesReducer,
    userGroups: userGroupReducer,
    allGroups: allGroupReducer,
    currentChatGroup: setCurrentChat
})