export const ActionTypes = {
	SET_USER_DATA: 'SET_USER_DATA',
	SET_USER_TOKEN: 'SET_USER_TOKEN',
	SET_LOADING: 'SET_LOADING',
	LOGOUT_USER: 'LOGOUT_USER',
	SET_USER_GOOGLE_TOKEN: 'SET_USER_GOOGLE_TOKEN',
	GET_IMAGE: 'GET_IMAGE',
	GET_HOME: 'GET_HOME',
	GET_TOPIC_LIST: 'GET_TOPIC_LIST',
	GET_BLOG_POST_DATA: 'GET_BLOG_POST_DATA',
	GET_BLOG_POST_COMMENTS_DATA: 'GET_BLOG_POST_COMMENTS_DATA',
	SET_BLOG_TOPIC_NUMBER: 'SET_BLOG_TOPIC_NUMBER',
	GET_LIKES: 'GET_LIKES',
	GET_HOME_COLOR: 'GET_HOME_COLOR',
	GET_ALL_USERS: 'GET_ALL_USERS',
};

export const setUserGoogleToken = (token) => ({
	type: ActionTypes.SET_USER_GOOGLE_TOKEN,
	payload: token,
});

export const setLoading = (bool) => ({
	type: ActionTypes.SET_LOADING,
	payload: bool,
});
export const getImageAction = (image) => ({
	type: ActionTypes.GET_IMAGE,
	payload: image,
});

export const getHome = (data) => ({
	type: ActionTypes.GET_HOME,
	payload: data,
});

export const getTopicList = (data) => ({
	type: ActionTypes.GET_TOPIC_LIST,
	payload: data,
});

export const getBlogPostData = (data) => ({
	type: ActionTypes.GET_BLOG_POST_DATA,
	payload: data,
});
export const getBlogCommets = (data) => ({
	type: ActionTypes.GET_BLOG_POST_COMMENTS_DATA,
	payload: data,
});

export const setTopicsNumber = (data) => ({
	type: ActionTypes.SET_BLOG_TOPIC_NUMBER,
	payload: data,
});
export const getLikes = (data) => ({
	type: ActionTypes.GET_LIKES,
	payload: data,
});

export const SetHomeColor = (data) => ({
	type: ActionTypes.GET_HOME_COLOR,
	payload: data,
});

export const getAllUsers = (data) => ({
	type: ActionTypes.GET_ALL_USERS,
	payload: data,
});
