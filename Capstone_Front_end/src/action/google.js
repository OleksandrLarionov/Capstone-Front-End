import { setUserToken } from './actionTypes';
import { fetchUserData } from './user';

export const googleCallBack = (authorizationCode) => async (dispatch) => {
	const URL = `http://localhost:3001/google/callback?code=${authorizationCode}`;
	const response = await fetch(URL, {
		method: 'GET',
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(setUserToken(data.accessToken));
		dispatch(fetchUserData(data.accessToken));
		return data;
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
		return data;
	} else {
		throw new Error('errore');
	}
};
