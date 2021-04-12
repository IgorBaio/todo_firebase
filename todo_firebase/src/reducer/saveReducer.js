const initialState = {
    tasks: [],
    visibleTasks: [],
    user:{},
    tasksState: []
}

const saveReducer = (state = initialState, action) => {
    switch(action.type){
        case 'saveTask':
            console.log('reducer')
            state.tasks = [...state.tasks, action.tasks];
            return state;
        case 'refreshTask':
            console.log('reducer')
            state.tasks = action.tasks;
            return state;
        case 'refreshVisibleTask':
            console.log('reducer')
            state.visibleTasks = action.visibleTasks;
            return state;
        case 'refreshAllReducersTasks':
            console.log('reducer')
            state.tasks = action.tasks;
            state.visibleTasks = action.visibleTasks;
            return state;
        case 'tasksState':
            console.log('reducer login')
            state.tasksState = action.tasksState;
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