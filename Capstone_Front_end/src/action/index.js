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

export const getTokenFromLogin = (email, password) => async (dispatch) => {
	const URL = 'http://localhost:3001/auth/login';
	const response = await fetch(URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(setUserToken(data.token));
		Cookies.set('token', data.token);
		return data.token;
	} else {
		throw new Error('errore');
	}
};
export const getGoogleLoginUrl = () => async (dispatch) => {
	const URL = 'http://localhost:3001/google/authorization-url';
	const response = await fetch(URL, {
		method: 'GET',
	});
	if (response.ok) {
		const data = await response.text();
		window.location.href = data;
		const googleToken = Cookies.get('access_token');
		dispatch(setUserToken(googleToken));

		return googleToken;
	} else {
		throw new Error('errore');
	}
};
export const fetchUserData = (token) => async (dispatch) => {
	const URL = 'http://localhost:3001/users/me';
	const response = await fetch(URL, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(setUserData(data));
		console.log(data);
		return data;
	} else {
		throw new Error('errore');
	}
};
