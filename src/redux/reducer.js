import { combineReducers } from 'redux';
import * as types from './actionType';

const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case types.MEMBERS.start:
			return { ...state, members: action.payload };

		case types.MEMBERS.success:
			return { ...state, members: action.payload };

		case types.MEMBERS.err:
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case types.YOUTUBE.start:
			return { ...state };

		case types.YOUTUBE.success:
			return { ...state, youtube: action.payload };

		case types.YOUTUBE.err:
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

const flickrReducer = (state = { flickr: [] }, action) => {
	switch (action.type) {
		case types.FLICKR.start:
			return { ...state };

		case types.FLICKR.success:
			return { ...state, flickr: action.payload };

		case types.FLICKR.err:
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

// 사가 안쓰는 버전
const galleryReducer = (state = { gallery: [] }, action) => {
	switch (action.type) {
		case 'SET_GALLERY':
			return { ...state, gallery: action.payload };

		default:
			return state;
	}
};

const reducers = combineReducers({
	memberReducer,
	youtubeReducer,
	galleryReducer,
	flickrReducer,
});

export default reducers;
