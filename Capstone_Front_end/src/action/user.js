import { login, logout, setToken } from '../reducers/authSlice';
import { setLoading } from './actionTypes';
import { fetchHomeData } from './homeAction';

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
		dispatch(setToken({ token: data.token }));
		return data.token;
	} else {
		throw new Error('errore');
	}
};

export const fetchUserData = (token) => async (dispatch) => {
	dispatch(setLoading(true));
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
		dispatch(login({ user: data }));
		dispatch(fetchHomeData(token));

		dispatch(setLoading(false));
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

export const deleteCurretUser = (token, navigate) => {
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
				setTimeout(() => {
					dispatch(logout());
				}, 500);
			}
		} catch (error) {
			console.log('Errore', error);
		}
	};
};
