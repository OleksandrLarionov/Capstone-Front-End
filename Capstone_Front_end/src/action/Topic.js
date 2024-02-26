import { getBlogCommets, getBlogPostData, getLikes, getTopicList, setLoading } from './actionTypes';

export const fetchTopicData = (token, topicId, page) => async (dispatch) => {
	dispatch(setLoading(true));
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
		setTimeout(() => {
			dispatch(getTopicList(data));
		}, 500);
		dispatch(setLoading(false));
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
		setTimeout(() => {
			dispatch(getBlogPostData(data));
		}, 500);
		dispatch(setLoading(false));
		return data;
	} else {
		throw new Error('errore');
	}
};

export const fetchBlogCommentsData = (token, blogPostId, page) => async (dispatch) => {
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
		setTimeout(() => {
			dispatch(getBlogCommets(data));
		}, 500);

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
				dispatch(fetchBlogCommentsData(token, blogPostId, page));
			}, 200);
	} else {
		throw new Error('errore');
	}
};

export const blogCommentsNumber = (token, blogPostId) => async (dispatch) => {
	const URL = import.meta.env.VITE_URL + '/comments/numberOfComments/' + blogPostId;
	const response = await fetch(URL, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	});
	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		throw new Error('errore');
	}
};

export const addNewBlog = (token, formData, topicId, page) => async (dispatch) => {
	const URL = import.meta.env.VITE_URL + '/blogposts/topic/addNewPost';
	const response = await fetch(URL, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
	if (response.ok) {
		response &&
			setTimeout(() => {
				dispatch(fetchTopicData(token, topicId, page));
			}, 200);
	} else {
		throw new Error('errore');
	}
};
