import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import logger from "redux-logger" ; 
import rootReducer from "../root.reducer/root.reducer"

import { composeWithDevTools } from 'redux-devtools-extension';


const middlewares = [reduxThunk] ; 

if(process.env.NODE_ENV ==="development"){
   middlewares.push(logger) ; 
}


const store  = createStore(rootReducer,composeWithDevTools(
   applyMiddleware(...middlewares)),
) ; 


export default store  ;                                          