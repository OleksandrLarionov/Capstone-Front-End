import { ActionTypes } from '../action/actionTypes';
const initialState = {
	topicListData: null,
	blogPostData: null,
	blogCommentsData: null,
	topicNumber: null,
	like: null,
};

const topicDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.GET_TOPIC_LIST:
			return { ...state, topicListData: [action.payload] };
		case ActionTypes.GET_BLOG_POST_DATA:
			return { ...state, blogPostData: action.payload };
		case ActionTypes.GET_BLOG_POST_COMMENTS_DATA:
			return { ...state, blogCommentsData: action.payload };
		case ActionTypes.SET_BLOG_TOPIC_NUMBER:
			return { ...state, topicNumber: [action.payload] };
		case ActionTypes.GET_LIKES:
			return { ...state, like: [action.payload] };
		case ActionTypes.LOGOUT_USER:
			return initialState;
		default:
			return state;
	}
};

export default topicDataReducer;
