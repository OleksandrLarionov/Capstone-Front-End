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
		dispatch(getHome(data));
		return data;
	} else {
		throw new Error('errore');
	}
};
