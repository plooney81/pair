import { combineReducers } from "redux";
import { SET_LOGIN, SET_LOGOUT } from "./action";


const userReducer = (state=[], action) => {
    switch (action.type){
        case SET_LOGIN:
            return action.payload.userInfo;
        case SET_LOGOUT:
            return [];
        default:
            return state;
    }
}


export const rootReducer = combineReducers({
    user: userReducer
})