import { ActionTypes } from '../action/actionTypes';
const initialState = {
	userData: [],
	loading: true,
	token: null,
	image: null,
};

const userDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.SET_USER_TOKEN:
			return { ...state, token: action.payload };
		case ActionTypes.SET_USER_DATA:
			return { ...state, userData: [action.payload] };
		case ActionTypes.SET_LOADING:
			return { ...state, loading: action.payload };
		case ActionTypes.LOGOUT_USER:
			return initialState;
		case ActionTypes.GET_IMAGE:
			return { ...state, image: action.payload };

		default:
			return state;
	}
};

export default userDataReducer;
