export const SET_LOGIN = 'SET_LOGIN';
export const SET_LOGOUT = 'SET_LOGOUT';
export const SET_READ_ERROR = 'SET_READ_ERROR';
export const SET_WRITE_ERROR = 'SET_WRITE_ERROR';

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

export const readError = (error) => {
    return {
        type: SET_READ_ERROR,
        payload: {
            error
        }
    }
}

export const writeError = (error) => {
    return {
        type: SET_WRITE_ERROR,
        payload: {
            error
        }
    }
}