export const SET_LOGIN = 'SET_LOGIN';
export const SET_LOGOUT = 'SET_LOGOUT';
export const SET_READ_ERROR = 'SET_READ_ERROR';
export const SET_WRITE_ERROR = 'SET_WRITE_ERROR';
export const SET_MESSAGES = 'SET_MESSAGES';
export const SET_ALL_USERS_GROUPS = 'SET_ALL_USERS_GROUPS';
export const ADD_NEW_USER_GROUP = 'ADD_NEW_USER_GROUP';
export const SET_ALL_POSSIBLE_GROUPS = 'SET_ALL_POSSIBLE_GROUPS';
export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';
export const SET_SIDEBAR_SHOW = 'SET_SIDEBAR_SHOW';

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

export const setMessagesAction = (messages) => {
    return {
        type: SET_MESSAGES,
        payload: {
            messages
        }
    }
}

export const setUsersGroupsList = (groups) => {
    return {
        type: SET_ALL_USERS_GROUPS,
        payload: {
            groups
        }
    }
}

export const addNewUserGroup = (group) => {
    return {
        type: ADD_NEW_USER_GROUP,
        payload: {
            group
        }
    }
}

export const setAllPossibleGroups = (groups) => {
    return{
        type: SET_ALL_POSSIBLE_GROUPS,
        payload: {
            groups
        }
    }
}

export const setCurrentChat = (chat) => {
    return {
        type: SET_CURRENT_CHAT,
        payload: {
            chat
        }
    }
}

export const setSideBarShow = (shouldShow) => {
    return {
        type: SET_SIDEBAR_SHOW,
        payload: {
            shouldShow
        }
    }
}