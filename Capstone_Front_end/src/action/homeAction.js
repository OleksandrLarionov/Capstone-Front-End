import { getHome, setLoading } from './actionTypes';

export const fetchHomeData = (token) => async (dispatch) => {
	dispatch(setLoading(true));
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
			console.log(data);
		}, 500);
		dispatch(setLoading(false));
		return data;
	} else {
		throw new Error('errore');
	}
};
