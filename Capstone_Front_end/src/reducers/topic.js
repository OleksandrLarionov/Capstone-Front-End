import { ActionTypes } from '../action/actionTypes';
const initialState = {
	topicListData: null,
};

const topicDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.GET_TOPIC_LIST:
			return { ...state, topicListData: [action.payload] };
		default:
			return state;
	}
};

export default topicDataReducer;
