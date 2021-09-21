const initialState = {
	popup: false,
	isLogin: false,
	isLoading: false,
	user: {},
	notes:[]
};

const popupReducer = (state = initialState, action) => {
	switch (action.type) {
		case "CHANGE_POPUP":
			return {
				...state,
				popup: action.payload,
			};
		case "CHANGE_LOGIN":
			return {
				...state,
				isLogin: action.payload,
			};
		case "CHANGE_USER":
			return {
				...state,
				user: action.payload,
			};
		case "CHANGE_LOADING":
			return {
				...state,
				isLoading: action.payload,
			};
		case "SET_NOTES":
			return {
				...state,
				notes: action.payload,
			};

		default:
			return state;
	}
};

export default popupReducer;
