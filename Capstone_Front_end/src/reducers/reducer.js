import { ActionTypes } from '../action/actionTypes';
const initialState = {
	isLoading: false,
	image: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.SET_LOADING:
			return { ...state, isLoading: action.payload };
		case ActionTypes.GET_IMAGE:
			return { ...state, image: action.payload };

		default:
			return state;
	}
};

export default reducer;
