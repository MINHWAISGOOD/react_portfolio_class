import Layout from '../common/Layout';
import Popup from '../common/Popup';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masonry from 'react-masonry-component';
import * as types from '../../redux/actionType';

function Flickr() {
	const { flickr } = useSelector((store) => store.flickrReducer);
	const dispatch = useDispatch();
	const path = process.env.PUBLIC_URL;
	const frame = useRef(null);
	const input = useRef(null);
	const pop = useRef(null);
	//saga로 전달해서 api에 있는 axios함수에 인수로 전달한 객체가 담길 state생성
	const [opt, setOpt] = useState({
		type: 'user',
		count: 100,
		user: '195470813@N04',
	});
	const [loading, setLoading] = useState(true);
	const [index, setIndex] = useState(0);
	const [enableClick, setEnableClick] = useState(true);
	const masonryOptions = { transitionDuration: '0.5s' };

	//데이터 호출후 로딩 처리할 함수 따로 분리
	const endLoading = () => {
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
			setEnableClick(true);
		}, 1000);
	};

	const showSearch = () => {
		const result = input.current.value.trim();

		if (!result) {
			alert('검색어를 입력하세요');
			return;
		}

		input.current.value = '';

		if (enableClick) {
			setEnableClick(false);
			setLoading(true);
			frame.current.classList.remove('on');

			//검색요청 함수 호출시
			//axios에 전달이 되야 되는 옵션객체를 setOpt로 스테이트 변경
			//해당 스테이트가 변경될때마다 useEffect로 saga.js에 전달됨
			setOpt({
				type: 'search',
				count: 100,
				tag: result,
			});
		}
	};

	useEffect(() => {
		//의존성 배열을 opt로 해서 추후 setOpt를 통해서 axios로 전달되야 되는 옵션객체값이 변경될때마다
		//액션객체로 변환되서 dispatch로 saga.js로 전달
		dispatch({ type: types.FLICKR.start, opt });
		//데이터 전달후 로딩처리하는 함수 호출
	}, [opt]);

	useEffect(() => {
		// 기존의 endLoading 함수를 api 요청을 할때 실행하는게 아닌
		// store를 통해 데이터 호출이 완료될때마다 실행
		// 이때 처음 flickr 값은 빈 배열이 들어오니 그때만 조건문으로 실행되지 않도록 처리
		if (flickr.length !== 0) endLoading();
	}, [flickr]);

	return (
		<>
			<Layout name={'Flickr'} img={'pic3.jpg'}>
				{loading ? (
					<img className='loading' src={path + '/img/loading.gif'} />
				) : null}
				<button
					onClick={() => {
						if (enableClick) {
							setEnableClick(false);
							setLoading(true);
							frame.current.classList.remove('on');

							setOpt({
								type: 'interest',
								count: 100,
							});
						}
					}}>
					interest gallery
				</button>

				<div className='searchBox'>
					<input
						type='text'
						ref={input}
						onKeyUp={(e) => {
							if (e.key === 'Enter') showSearch();
						}}
					/>
					<button onClick={showSearch}>search</button>
				</div>

				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={masonryOptions}>
						{flickr.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												setIndex(idx);
												pop.current.open();
											}}>
											<img
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
											/>
										</div>
										<h2>{item.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
												onError={(e) => {
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span
												onClick={(e) => {
													if (enableClick) {
														setEnableClick(false);
														setLoading(true);
														frame.current.classList.remove('on');

														//유저 아이디 클릭시
														//axios에 전달이 되야 되는 옵션객체를 setOpt로 스테이트 변경
														//해당 스테이트가 변경될때마다 useEffect로 saga.js에 전달됨
														setOpt({
															type: 'user',
															count: 100,
															user: e.currentTarget.innerText,
														});
													}
												}}>
												{item.owner}
											</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>

			<Popup ref={pop}>
				{flickr.length !== 0 ? (
					<>
						<img
							src={`https://live.staticflickr.com/${flickr[index].server}/${flickr[index].id}_${flickr[index].secret}_b.jpg`}
						/>
						<span className='close' onClick={() => pop.current.close()}>
							close
						</span>
					</>
				) : null}
			</Popup>
		</>
	);
}

export default Flickr;
