const initialState = {
    auth : false,
    nick: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOG_IN' : 
            return {
                auth: true,
                nick: action.nick
            }; 
        case 'LOG_OUT':
            return {
                auth: false,
                nick: null
            }
    }
    return state
}

export default reducer;