import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userDataReducer from '../reducers/user';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
};

const allReducers = combineReducers({
	user: userDataReducer,
});
const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
		});
	},
});

export const persistor = persistStore(store);
