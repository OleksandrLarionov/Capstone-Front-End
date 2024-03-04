import { ActionTypes } from '../action/actionTypes';
const initialState = {
	homeData: null,
};

const homeDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.GET_HOME:
			return { ...state, homeData: action.payload };
		case ActionTypes.LOGOUT_USER:
			return initialState;
		default:
			return state;
	}
};

export default homeDataReducer;
