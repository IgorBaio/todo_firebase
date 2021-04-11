import { createStore, combineReducers } from "redux";
import saveReducer from '../reducer/saveReducer'

const rootReducer = combineReducers({
    save: saveReducer
})

const configureSaveReducer = () => createStore(rootReducer);

export default configureSaveReducer;