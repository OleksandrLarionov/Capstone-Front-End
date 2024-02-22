import { login } from '../reducers/authSlice';
import { fetchUserData } from './user';

export const googleCallBack = (authorizationCode) => async (dispatch) => {
	const URL = import.meta.env.VITE_GOOGLE_CALLBACK + `${authorizationCode}`;
	const response = await fetch(URL, {
		method: 'GET',
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(login(data.accessToken));
		setTimeout(() => {
			dispatch(fetchUserData(data.accessToken));
		}, 200);
		return data;
	} else {
		throw new Error('errore');
	}
};
export const getGoogleLoginUrl = () => async (dispatch) => {
	const URL = import.meta.env.VITE_GOOGLE_AUTH;
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
