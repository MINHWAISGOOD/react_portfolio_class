import Layout from '../common/Layout';
import { useState, useRef } from 'react';
import Popup from '../common/Popup';
import { useSelector } from 'react-redux';

function Youtube() {
	// 1. store에서 youtubeReducer 데이터를 가져옴 (빈배열)
	const vidData = useSelector((store) => store.youtubeReducer.youtube);
	console.log(vidData);

	// 2. 액션객체를 reducer로 전달해주는 함수 할당
	// const dispatch = useDispatch();
	const pop = useRef(null);
	const [index, setIndex] = useState(0);

	// const fetchYoutube = async () => {
	// 	const key = 'AIzaSyCYd9SWqo1_9ckWvx--2D68sG_il9hYTtM';
	// 	const playlistId = 'PLHtvRFLN5v-UVVpNfWqtgZ6YPs9ZJMWRK';
	// 	const num = 5;
	// 	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

	// 	await axios.get(url).then((json) => {
	// 		// 3. axios로 받아온 데이터를 setYoutube로 함수로 action객체를 반환하고
	// 		// 반환된 action객체를 dispatch로 reducer에 전달
	// 		dispatch(setYoutube(json.data.items));
	// 	});
	// };

	// useEffect(() => {
	// 	// 4. 해당 함수가 실행되면 axios가 받아진 데이타가 reducer로 전달되서
	// 	// 전역 store에 담기고 다시 store를 통해서 화면 랜더링
	// 	fetchYoutube();
	// }, []);

	return (
		<>
			<Layout name={'Youtube'} img={'pic6.jpg'}>
				{vidData.map((vid, idx) => {
					const tit = vid.snippet.title;
					const desc = vid.snippet.description;
					//리스트의 순서를 다룰 state추가
					const date = vid.snippet.publishedAt;
					// 아티클 클릭했을 때 setOpen이 true가 되서 팝업창 열림
					return (
						<article
							key={idx}
							onClick={() => {
								// Popup 컴포넌트의 함수를 이용해 팝업 열기
								pop.current.open();
								setIndex(idx);
							}}>
							<div className='pic'>
								<img src={vid.snippet.thumbnails.standard.url} />
							</div>
							{/* 문자열 줄이기 */}
							<h2>{tit.length > 50 ? tit.substr(0, 50) + '...' : tit}</h2>
							<p>{desc.length > 250 ? desc.substr(0, 150) + '...' : desc}</p>
							<span>{date.split('T')[0]}</span>
						</article>
					);
				})}
			</Layout>
			{/* 팝업 조건문 */}
			{/* 원래는 컴포넌트에는 ref 참조가 불가능하지만 Popup에서 forwardRef를
			해줘서 가능 */}
			<Popup ref={pop}>
				{vidData.length !== 0 ? (
					<>
						<iframe
							// 팝업이 호출될 때, 변경된 index 순번의 vids state 데이터값이 팝업 영상으로 출력
							src={`https://www.youtube.com/embed/${vidData[index].snippet.resourceId.videoId}`}
							frameBorder='0'></iframe>
						{/* Popup 컴포넌트의 함수를 이용해 팝업 닫기 */}
						<span className='close' onClick={() => pop.current.close()}>
							close
						</span>
					</>
				) : null}
			</Popup>
		</>
	);
}

export default Youtube;
