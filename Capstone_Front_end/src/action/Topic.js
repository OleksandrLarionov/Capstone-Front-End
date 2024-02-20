import { getBlogCommets, getBlogPostData, getLikes, getTopicList } from './actionTypes';

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

export const addLike = (token, blogPostId) => async (dispatch) => {
	const URL = import.meta.env.VITE_URL + '/blogposts/me/topic/' + blogPostId;
	const response = await fetch(URL, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	});
	if (response.ok) {
		response &&
			setTimeout(() => {
				dispatch(blogPostData(token, blogPostId));
			}, 200);
		console.log('like aggiunto');
	} else {
		throw new Error('errore');
	}
};

export const getLikesNumber = (token, blogPostId) => async (dispatch) => {
	const URL = import.meta.env.VITE_URL + '/blogposts/me/likes/' + blogPostId;
	const response = await fetch(URL, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getLikes(data));
		return data;
	} else {
		throw new Error('errore');
	}
};

export const removeLike = (token, blogPostId) => async (dispatch) => {
	const URL = import.meta.env.VITE_URL + '/blogposts/me/like/delete/' + blogPostId;
	const response = await fetch(URL, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});
	if (response.ok) {
		dispatch(getLikesNumber(token, blogPostId));
		dispatch(blogPostData(token, blogPostId));
		console.log('likeRimosso');
	} else {
		throw new Error('errore');
	}
};

export const addANewComment = (token, blogPostId, comment, page) => async (dispatch) => {
	const URL = import.meta.env.VITE_URL + '/comments/blogPost/' + blogPostId;
	console.log(blogPostId);
	const response = await fetch(URL, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			comment: comment,
			blogId: blogPostId,
		}),
	});
	if (response.ok) {
		response &&
			setTimeout(() => {
				dispatch(blogCommentsData(token, blogPostId, page));
			}, 200);
		console.log('like aggiunto');
	} else {
		throw new Error('errore');
	}
};
