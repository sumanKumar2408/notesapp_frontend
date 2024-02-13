import { applyMiddleware, compose, createStore } from 'redux'; 

import combineReducers from './redux/reducers/index.js';
import thunk from 'redux-thunk';

const store = createStore(combineReducers, compose(applyMiddleware(thunk)));

export default store;

