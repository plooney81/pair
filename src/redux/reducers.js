import { combineReducers } from "redux";
import { SET_LOGIN, SET_LOGOUT } from "./action";


const authinticationReducer = (state=false, action) => {
    switch (action.type){
        case SET_LOGIN:
            return true
        case SET_LOGOUT:
            return false
        default:
            return state
    }
}


export const rootReducer = combineReducers({
    authenticated: authinticationReducer
})