const HomeListReducer = (state, action) => {
	const LOADMORE = "LOADMORE";
	const SETDATA = "SETDATA";
	const SET_FILTER = "SET_FILTER";
	const CLEAR_FILTER = "CLEAR_FILTER";
	const SET_FAVOURITE = "SET_FAVOURITE";
	const REMOVE_FAVOURITE = "REMOVE_FAVOURITE";
	const SET_LOADING = "SET_LOADING";
	const SET_LOADMORE = "SET_LOADMORE";
	switch (action.type) {
		// case SETDATA:
		// 	return {
		// 		...state,
		// 		data: Array.isArray(action.payload) ? [...action.payload] : [],
		// 	};
		// case LOADMORE:
		// 	return {
		// 		...state,
		// 		loadmore: false,
		// 		data: Array.isArray(action.payload)
		// 			? [...state.data, ...action.payload] // Safely append new products
		// 			: state.data, // Fallback to the current data if payload is invalid // Append new products
		// 	};
		case SET_LOADING:
			return { ...state, loading: action.payload };
		case SET_LOADMORE:
			return { ...state, loadmore: action.payload };
		case "LOADING_START":
			return { ...state, loading: true };
		case "LOADING_END":
			return { ...state, loading: false, loadmore: false };
		case "LOAD_MORE_START":
			return { ...state, loadmore: true };
		case SETDATA:
			return {
				...state,
				data: Array.isArray(action.payload)
					? action.page === 1
						? [...action.payload] // Replace data on first load
						: [...state.data, ...action.payload] // Append on "Load More"
					: state.data, // Keep existing data if payload is invalid
				loadmore: false, // Ensure loadmore state is updated correctly
				loading: false,
				productslenght: action.payload.length,
			};

		case SET_FILTER:
			// eslint-disable-next-line
			// const data = state.cocktails.filter((item) =>
			// 	item.strGlass.toLowerCase().includes(action.payload.toLowerCase())
			// );
			// if (data.length === 0) {
			// 	state.empty = true;
			// }
			return {
				...state,
				//filter: action.payload,
				loadingdata: false,
				data: [...action.payload],
			};
		default:
			return state;

		// case CLEAR_FILTER:
		// 	return {
		// 		...state,
		// 		filter: null,
		// 		cocktails: [...state.oldcocktails],
		// 		empty: false,
		// 	};
		// case SET_FAVOURITE:
		// 	// return {
		// 	// 	...state,
		// 	// 	favourite: true,
		// 	// 	cocktails: [...state.oldcocktails],
		// 	// 	empty: false,
		// 	// };

		// 	// const favdata = state.cocktails.map((item) => {
		// 	// 	//console.log(item.forfavourite);
		// 	// 	if (item.id === action.payload.id) {
		// 	// 		item.forfavourite = true;
		// 	// 	}
		// 	// });

		// 	const favdata = state.cocktails.map((item) => {
		// 		if (item.id === action.payload.id) {
		// 			item.forfavourite = true;
		// 		}
		// 		return item;
		// 	});

		// 	return {
		// 		...state,

		// 		cocktails: favdata,
		// 	};

		// case REMOVE_FAVOURITE:
		// 	const removefavdata = state.cocktails.map((item) => {
		// 		if (item.id === action.payload.id) {
		// 			item.forfavourite = false;
		// 		}
		// 		return item;
		// 	});
		// 	return {
		// 		...state,

		// 		cocktails: removefavdata,
		// 	};

		// default:
		// 	throw new Error("");
	}
};
export default HomeListReducer;
