import { getHome } from './actionTypes';

export const fetchHomeData = (token) => async (dispatch) => {
	const URL = import.meta.env.VITE_URL + '/home';
	const response = await fetch(URL, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	});
	if (response.ok) {
		const data = await response.json();
		setTimeout(() => {
			dispatch(getHome(data));
		}, 500);
		return data;
	} else {
		throw new Error('errore');
	}
};
