const INITIAL_STATE = {
    todos: [],
    todo: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TODOS_FETCH':
            return { ...state, todos: action.payload }
        case 'TODO_FETCH':
            return { ...state, todo: action.payload }
        default:
            return state
    }
}