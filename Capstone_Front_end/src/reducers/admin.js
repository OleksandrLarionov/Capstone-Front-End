import { ActionTypes } from '../action/actionTypes';
const initialState = {
	usersData: null,
};

const adminReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.GET_ALL_USERS:
			return { ...state, usersData: action.payload };
		default:
			return state;
	}
};

export default adminReducer;
