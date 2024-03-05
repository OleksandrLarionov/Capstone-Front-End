import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: false,
	user: null,
	token: null,
	isAdmin: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
		},
		setToken: (state, action) => {
			state.token = action.payload.token;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
		},
		setRole: (state, action) => {
			state.isAdmin = action.payload.isAdmin;
		},
	},
});

export const { login, logout, setToken, setRole } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
