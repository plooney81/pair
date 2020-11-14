export const SET_LOGIN = 'SET_LOGIN';
export const SET_LOGOUT = 'SET_LOGOUT';

export const login = (userInfo) => {
    return {
        type: SET_LOGIN,
        payload: {
            userInfo
        }
    }
}

export const logout = () => {
    return {
        type: SET_LOGOUT,
    }
}