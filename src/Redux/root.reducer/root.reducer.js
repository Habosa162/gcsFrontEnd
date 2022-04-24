import { combineReducers } from "redux";
import userReducer from "../reducers/user.reducer";
import taskReducer from "../reducers/tasks.reducer";
const rootReducer = combineReducers({
   userData : userReducer,
   tasksData:taskReducer,
})


export default rootReducer ; 