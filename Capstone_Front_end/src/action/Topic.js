import { getBlogCommets, getBlogPostData, getTopicList } from './actionTypes';

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

export const blogPostData = (token, blogPostId) => async (dispatch) => {
	const URL = import.meta.env.VITE_URL + '/blogposts/' + blogPostId;
	const response = await fetch(URL, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getBlogPostData(data));
		return data;
	} else {
		throw new Error('errore');
	}
};

export const blogCommentsData = (token, blogPostId, page) => async (dispatch) => {
	const URL = import.meta.env.VITE_URL + '/comments/blogPost/' + blogPostId + '?page=' + page;
	const response = await fetch(URL, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getBlogCommets(data));
		return data;
	} else {
		throw new Error('errore');
	}
};
