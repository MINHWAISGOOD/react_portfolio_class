// // 인수로 전달된 값을 type이 SET_MEMBERS인 액션 객체를 반환하는 함수
// export const setMembers = (member) => {
// 	return {
// 		type: 'SET-MEMBERS',
// 		payload: member,
// 	};
// };

// export const setYoutube = (data) => {
// 	return {
// 		type: 'SET_YOUTUBE',
// 		payload: data,
// 	};
// };

// export const setGallery = (data) => {
// 	return {
// 		type: 'SET_GALLERY',
// 		payload: data,
// 	};
// };

export const FLICKR = {
	start: 'FLICKR_START',
	success: 'FLICKR_SUCCESS',
	err: 'FLICKR_ERROR',
};

export const YOUTUBE = {
	start: 'YOUTUBE_START',
	success: 'YOUTUBE_SUCCESS',
	err: 'YOUTUBE_ERROR',
};

export const MEMBERS = {
	start: 'MEMBERS_START',
	success: 'MEMBERS_SUCCESS',
	err: 'MEMBERS_ERROR',
};
