import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import homeDataReducer from '../reducers/home';
import topicDataReducer from '../reducers/topic';
import authSlice from '../reducers/authSlice';
import reducer from '../reducers/reducer';

const persistConfig = {
	key: 'root',
	storage,
	transforms: [
		encryptTransform({
			secretKey: import.meta.env.VITE_SECRET_KEY,
			onError: function (error) {
				console.log('Errore durante la crittografia:', error);
			},
		}),
	],
};

const allReducers = combineReducers({
	home: homeDataReducer,
	topic: topicDataReducer,
	auth: authSlice,
	reducer: reducer,
});
const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false,
		});
	},
});

export const persistor = persistStore(store);
