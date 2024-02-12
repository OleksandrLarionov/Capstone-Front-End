import Cookies from 'js-cookie';

export const ActionTypes = {
	SET_USER_DATA: 'SET_USER_DATA',
	SET_USER_TOKEN: 'SET_USER_TOKEN',
	SET_LOADING: 'SET_LOADING',
	LOGOUT_USER: 'LOGOUT_USER',
	SET_USER_GOOGLE_TOKEN: 'SET_USER_GOOGLE_TOKEN',
};

export const setUserToken = (token) => ({
	type: ActionTypes.SET_USER_TOKEN,
	payload: token,
});

export const setUserGoogleToken = (token) => ({
	type: ActionTypes.SET_USER_GOOGLE_TOKEN,
	payload: token,
});

export const setUserData = (data) => ({
	type: ActionTypes.SET_USER_DATA,
	payload: data,
});

export const setLoading = (bool) => ({
	type: ActionTypes.SET_LOADING,
	payload: bool,
});
export const logoutUser = () => {
	Cookies.remove('token');

	return {
		type: ActionTypes.LOGOUT_USER,
		payload: [],
	};
};
