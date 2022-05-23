import axios from 'axios';

const path = process.env.PUBLIC_URL;

export const fetchFlickr = async (opt) => {
	const key = 'e5fd58b463c908a06f45410943608f02';
	const num = opt.count;
	const method_interest = 'flickr.interestingness.getList';
	const method_search = 'flickr.photos.search';
	const method_user = 'flickr.people.getPhotos';
	let url = '';

	if (opt.type === 'interest') {
		url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;
	}
	if (opt.type === 'search') {
		url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json&tags=${opt.tag}`;
	}
	if (opt.type === 'user') {
		url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json&user_id=${opt.user}`;
	}

	// 해당 axios로 받아온 결과값을 saga.js에서 데이터를 가공하거나 분기처리할 예정이므로 axios로 받아온 결과값만 리턴
	return await axios.get(url);
};

export const fetchYoutube = async () => {
	const key = 'AIzaSyCYd9SWqo1_9ckWvx--2D68sG_il9hYTtM';
	const playlistId = 'PLHtvRFLN5v-UVVpNfWqtgZ6YPs9ZJMWRK';
	const num = 5;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

	return await axios.get(url);
};

export const fetchMembers = async () => {
	const url = path + '/DB/member.json';
	return await axios.get(url);
};

/*
- redux로 관리되는 파일들은 컴포넌트 외부에서 전역으로 동작하기 때문에 부수효과를 발생시키지 않는 순수함수 형태로 제작
- 부수효과(side Effect) : DOM을 제어하는 등의 화면의 변경점을 야기시키는 효과
- 순수함수(Pure Function) : 부수효과를 발생시키지 않는 함수
*/
