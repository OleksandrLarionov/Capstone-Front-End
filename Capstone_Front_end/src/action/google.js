import { Navigate } from 'react-router-dom';
import { login, setToken } from '../reducers/authSlice';
import { fetchHomeData } from './homeAction';
import { fetchUserData } from './user';

export const googleCallBack = (authorizationCode, navigate) => async (dispatch) => {
	const URL = import.meta.env.VITE_GOOGLE_CALLBACK + `${authorizationCode}`;
	const response = await fetch(URL, {
		method: 'GET',
	});
	if (response.ok) {
		const data = await response.json();
		const token = data.accessToken;
		dispatch(setToken({ token: token }));
		dispatch(fetchUserData(token))
			.then((data) => login({ user: data }))
			.then(() => fetchHomeData(token))
			.then(() => {
				navigate('/home');
			});

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
