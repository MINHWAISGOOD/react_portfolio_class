import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

const path = process.env.PUBLIC_URL;

function Location() {
	// window 전역에서 kakao라는 이름으로 등록되어 있는 객체를 비구조할당으로 직접 변수에 할당
	const { kakao } = window;

	const container = useRef(null); // container 라는 맵 요소를 참조
	const branch = useRef(null);

	const info = [
		{
			title: '삼성동 코엑스',
			latlng: new kakao.maps.LatLng(37.51269197738182, 127.06068285145963),
			imgSrc: `${path}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '광화문 정문',
			latlng: new kakao.maps.LatLng(37.57610410883431, 126.97682701566524),
			imgSrc: `${path}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '남산타워',
			latlng: new kakao.maps.LatLng(37.55123829696399, 126.9882362909658),
			imgSrc: `${path}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	];

	const [map, setMap] = useState(null);
	const [mapInfo] = useState(info);
	const [traffic, setTraffic] = useState(false);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		// 컴포넌트가 재랜더링 될때마다 기존 map안쪽의 내용을 비워줌
		container.current.innerHTML = '';

		const options = {
			center: mapInfo[index].latlng,
			level: 3,
		};

		const map_instance = new kakao.maps.Map(container.current, options);
		// 컴포넌트가 처음 mount시 생성된 인스턴스 map 값을 해당 컴포넌트에서 자유롭게 쓰면서 상태관리하기 위해서 map state에 옮겨담음
		setMap(map_instance);

		// 마커 위치 인스턴스 생성
		const markerPosition = mapInfo[index].latlng;

		// 마커 이미지 인스턴스 생성
		const imageSrc = mapInfo[index].imgSrc;
		const imageSize = mapInfo[index].imgSize;
		const imageOption = mapInfo[index].imgPos;
		const markerImage = new kakao.maps.MarkerImage(
			imageSrc,
			imageSize,
			imageOption
		);

		// 마커 위치 인스턴스를 인수로 넣어서 마커 인스턴스 생성
		var marker = new kakao.maps.Marker({
			position: markerPosition,
			image: markerImage,
		});
		// 기존 인스턴스값을 인수로 넣어서 최종 마커 생성
		marker.setMap(map_instance);

		// 버튼 활성화
		const branch_li = branch.current.querySelectorAll('li');
		for (const btn of branch_li) btn.classList.remove('on');
		branch_li[index].classList.add('on');

		// 지도에 타입 컨트롤러 추가
		const mapTypeControl = new kakao.maps.MapTypeControl();
		map_instance.addControl(
			mapTypeControl,
			kakao.maps.ControlPosition.TOPRIGHT
		);

		// 지도에 줌 컨트롤러 추가
		const zoomControl = new kakao.maps.ZoomControl();
		map_instance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

		// 마커를 중앙으로 보내는 함수
		const mapInit = () => {
			console.log('마커 중앙 유지');
			map_instance.setCenter(mapInfo[index].latlng);
		};
		// 브라우저 리사이즈시 mapInit 호출
		window.addEventListener('resize', mapInit);

		// 해당 컴포넌트 소멸시 window 전역에 등록했던 핸들러 함수를 제거
		return () => {
			window.removeEventListener('resize', mapInit);
		};
	}, [index]);
	// 의존성 배열이 비어있을때는 해당 컴포넌트가 처음 로딩될때 딱 한번만 실행

	useEffect(() => {
		// 처음 mount시 map값이 비어있어서 오류나는걸 해결하기 위해 map이 담겨있을때만 구문실행되도록 조건문 결정
		if (map) {
			traffic
				? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
				: map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		}
	}, [traffic]);
	// 의존성 배열에 traffic이 담겨있음
	// 해당 컴포넌트에서 traffic 정보값이 변경될때마다 실행

	return (
		<Layout name={'Location'} img={'pic5.jpg'}>
			<div id='map' ref={container}></div>
			{/* traffic 버튼 toggle 버튼 */}
			<button
				onClick={() => {
					setTraffic(!traffic);
				}}>
				{/* traffic 값에 따라서 버튼 글자 변경 */}
				{traffic ? 'Traffic OFF' : 'Traffic ON'}
			</button>

			<ul className='branch' ref={branch}>
				{/* <li onClick={() => setIndex(0)}>삼성동 코엑스</li>
				<li onClick={() => setIndex(1)}>광화문 정문</li>
				<li onClick={() => setIndex(2)}>남산 타워</li> */}
				{mapInfo.map((item, idx) => {
					return (
						<li key={idx} onClick={() => setIndex(idx)}>
							{item.title}
						</li>
					);
				})}
			</ul>

			{/* 버튼 클릭시 map state에 담겨있는 인스턴스의 addOverlayMapTypeId 함수 호출 */}
			{/* <button
				onClick={() => {
					map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
				}}>
				Traffic ON
			</button>
			<button
				onClick={() => {
					map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
				}}>
				Traffic OFF
			</button> */}
		</Layout>
	);
}

export default Location;
