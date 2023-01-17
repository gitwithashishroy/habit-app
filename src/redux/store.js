import { applyMiddleware,compose ,  createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from "./reducers";

const persistentState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {}
// const store = createStore(rootReducer, persistentState) ; 
// console.log("store",store);

const middleware = [thunk] ; 
// const store = createStore(rootReducer, applyMiddleware(thunk) ,persistentState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) ; 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,persistentState, composeEnhancers(applyMiddleware(...middleware)));

store.subscribe(() => {
    const state = store.getState();
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  }) ; 

export default store ; 
