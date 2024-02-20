import { Navigate } from 'react-router-dom';
import { logoutUser, setUserData, setUserToken } from './actionTypes';

export const getTokenFromLogin = (email, password) => async (dispatch) => {
	const URL = import.meta.env.VITE_LOGIN;
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
		return data.token;
	} else {
		throw new Error('errore');
	}
};

export const fetchUserData = (token) => async (dispatch) => {
	const URL = import.meta.env.VITE_ME;
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
export const postImageAction = (token, formImg) => {
	return async (dispatch) => {
		const userUploadUrl = import.meta.env.VITE_ME + '/uploadImage';

		try {
			const response = await fetch(userUploadUrl, {
				method: 'POST',
				body: formImg,
				headers: {
					Authorization: 'Bearer ' + token,
				},
			});
			if (response.ok) {
				formImg &&
					setTimeout(() => {
						dispatch(fetchUserData(token));
					}, 200);
			}
		} catch (error) {
			console.log('Errore', error);
		}
	};
};

export const updateProfile = (token, newData) => {
	return async (dispatch) => {
		const URL = import.meta.env.VITE_ME + '/updateProfile';

		try {
			const response = await fetch(URL, {
				method: 'PUT',
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newData),
			});
			if (response.ok) {
				newData &&
					setTimeout(() => {
						dispatch(fetchUserData(token));
					}, 200);
			}
		} catch (error) {
			console.log('Errore', error);
		}
	};
};

export const tokenValidation = (token) => async (dispatch) => {
	const URL = import.meta.env.VITE_URL + '/auth/verify-token';
	const response = await fetch(URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			token,
		}),
	});
	if (response.ok) {
		const data = await response.json();
		return data.token;
	} else {
		throw new Error('errore');
	}
};

export const deleteCurretUser = (token) => {
	return async (dispatch) => {
		const URL = import.meta.env.VITE_ME + '/delete';

		try {
			const response = await fetch(URL, {
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer ' + token,
				},
			});
			if (response.ok) {
				console.log('hola');
				dispatch(logoutUser());
			}
		} catch (error) {
			console.log('Errore', error);
		}
	};
};
