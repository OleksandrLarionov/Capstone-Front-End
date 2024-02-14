import Cookies from 'js-cookie';
import { ActionTypes } from '../action/actionTypes';
const tokenFromCookie = Cookies.get('token');
const initialState = {
	userData: [],
	loading: true,
	token: tokenFromCookie ? tokenFromCookie : null,
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
			return { ...state, token: null, userData: [action.payload] };
		case ActionTypes.GET_IMAGE:
			return { ...state, image: action.payload };

		default:
			return state;
	}
};

export default userDataReducer;
