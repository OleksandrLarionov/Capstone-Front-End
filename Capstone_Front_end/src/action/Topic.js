import { getTopicList } from './actionTypes';

export const fetchTopicData = (token, topicId, page) => async (dispatch) => {
	const URL = import.meta.env.VITE_URL + '/home/topic/' + topicId + '?page=' + page;
	const response = await fetch(URL, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getTopicList(data));
		return data;
	} else {
		throw new Error('errore');
	}
};
