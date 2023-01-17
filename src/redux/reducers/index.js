import { combineReducers } from "redux";
import { habitsReducer  } from "./habitReducer";
import authReducer from './authReducer' ;

const rootReducer = combineReducers({
  habitsReducer , authReducer
});

export default rootReducer;
