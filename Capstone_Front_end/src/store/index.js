import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userDataReducer from '../reducers/user';

const allReducers = combineReducers({
	user: userDataReducer,
});
const store = configureStore({ reducer: allReducers });

export default store;
