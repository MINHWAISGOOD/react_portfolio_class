import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { setGallery } from './redux/actionType';
import * as types from './redux/actionType';

// common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// main
import Main from './components/main/Main';

// sub
import Department from './components/sub/Department';
import Community from './components/sub/Community';
import Gallery from './components/sub/Gallery';
import Youtube from './components/sub/Youtube';
import Location from './components/sub/Location';
import Join from './components/sub/Join';
import Flickr from './components/sub/Flickr';

// scss
import './scss/style.scss';

function App() {
	// 루트 컴포넌트인 App에서 youtube data를 가져와서 전역 store에 저장하는 함수
	const dispatch = useDispatch();

	// // 이 안의 내용을 api.js fetch안으로
	// const fetchGallery = async () => {
	// 	const key = 'e5fd58b463c908a06f45410943608f02';
	// 	const method_interest = 'flickr.interestingness.getList';
	// 	const num = 20;
	// 	const url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&nojsoncallback=1&format=json`;

	// 	await axios.get(url).then((json) => {
	// 		dispatch(setGallery(json.data.photos.photo));
	// 	});
	// };

	// 해당 루트 컴포넌트가 마운트 되면 store에 데이터 저장
	useEffect(() => {
		// App에서 옵션 객체를 전달에서 초기 flickr 데이터 store에 저장
		dispatch({
			type: types.FLICKR.start,
			opt: { type: 'user', count: 100, user: '195470813@N04' },
		});
		// 유튜브 액션 객체를 saga.js에 전달
		dispatch({ type: types.YOUTUBE.start });
		dispatch({ type: types.MEMBERS.start });
		// fetchGallery();
	}, []);

	return (
		<>
			<Switch>
				{/* exact는 오로지 / 만 있을때 불러온다 
				switch가 없으면 /가 2개 중복되므로 헤더가 2개 불러와짐 */}
				<Route exact path='/' component={Main} />
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			<Route path='/department' component={Department} />

			<Route path='/community' component={Community} />

			<Route path='/gallery' component={Gallery} />

			<Route path='/flickr' component={Flickr} />

			<Route path='/youtube' component={Youtube} />

			<Route path='/location' component={Location} />

			<Route path='/join' component={Join} />

			<Footer />
		</>
	);
}

export default App;

/*
- Switch : 라우터 연결시 중복되는 url이 있을때 더 구체적인 라우터 하나만 적용 (상위에 있는 것)
*/

// rfce (React functional Component Export) - ES7 react snippets 기능

/*
- SSR vs CSR
- SSR (Server Side Rendering) : 페이지 이동할때마다 일일이 서버쪽에 출력된 html 파일을 요청 (기존의 html)
- 장점 : 초기 로딩속도가 빠름, 검색최적화 SEO
- 단점 : 페이지 이동시, 같은 페이지 안에서 컨텐츠가 동적으로 바꿔야될때 사용성 낮음

- CSR (Client Side Rendering) : 초기에 화면에 출력될 모든 정보 데이터를 chunk 단위로 모두 불러옴
- 장점 : 같은 페이지안에서 서로 다른 컨텐츠를 실시간으로 변경하면서 출력하므로 사용성이 좋음
- 단점 : 초기 로딩속도가 느림, 검색엔진 비최적화
*/
