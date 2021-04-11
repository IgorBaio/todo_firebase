const initialState = {
    tasks: [],
    user:{}
}

const saveReducer = (state = initialState, action) => {
    switch(action.type){
        case 'saveTask':
            console.log('reducer')
            state.tasks = [...state.tasks, action.tasks];
            return state;
        case 'login':
            console.log('reducer login')
            state.user = action.user;
            return state;
        default:
            return state;
    }
}

export default saveReducer;