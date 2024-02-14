import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userDataReducer from '../reducers/user';

const allReducers = combineReducers({
	user: userDataReducer,
});
const store = configureStore({
	reducer: allReducers,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
		});
	},
});

export default store;
