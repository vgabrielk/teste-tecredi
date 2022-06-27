const INITIAL_STATE = {
    users: [],
    user: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USERS_FETCH':
            return { ...state, users: action.payload }
            case 'USER_FETCH':
                return { ...state, user: action.payload }
        default:
            return state
    }
}