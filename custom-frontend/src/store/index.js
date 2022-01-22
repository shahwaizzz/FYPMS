import {createStore, applyMiddleware, combineReducers} from 'redux';
import ThunkMiddleware from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer';

const rootReducer = combineReducers({
    AuthReducer
});
const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));

export default store;