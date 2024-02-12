import Cookies from 'js-cookie';
import { ActionTypes } from '../action';
const tokenFromCookie = Cookies.get('token');
const initialState = {
	userData: [],
	loading: true,
	token: tokenFromCookie ? tokenFromCookie : null,
};

const userDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.SET_USER_TOKEN: // Correggi il tipo di azione qui
			return { ...state, token: action.payload };
		case ActionTypes.SET_USER_DATA:
			return { ...state, userData: [action.payload] };
		case ActionTypes.SET_LOADING:
			return { ...state, loading: action.payload };
		case ActionTypes.LOGOUT_USER:
			return { ...state, token: null, userData: [action.payload] };

		default:
			return state;
	}
};

export default userDataReducer;
