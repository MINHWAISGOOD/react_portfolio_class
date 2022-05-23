import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Btns from './Btns';
import Anime from '../../class/anime';
import { useRef, useEffect, useState } from 'react';

function Main() {
	const main = useRef(null);
	const pos = useRef([]);

	const [index, setIndex] = useState(0);
	const [num, setNum] = useState(0);

	// 현재 스크롤되는 값을 관리할 state 추가
	const [scrolled, setScrolled] = useState(0);

	const getPos = () => {
		// console.log('getPos');
		//getPos함수에 익명함수로 인수를 받지 않게 하기 위해 secs를 getPos함수 내부에서 구해줌
		const secs = main.current.querySelectorAll('.myScroll');
		pos.current = [];
		for (const sec of secs) pos.current.push(sec.offsetTop);
	};

	const activation = () => {
		const base = -200;
		const scroll = window.scrollY;
		// 현재 스크롤되는 거리값을 scrolled state에 저장해서 관리
		setScrolled(scroll);
		const btns = main.current.querySelectorAll('.scroll_navi li');
		const secs = main.current.querySelectorAll('.myScroll');

		pos.current.map((pos, idx) => {
			if (scroll >= pos + base) {
				for (let i = 0; i < secs.length; i++) {
					btns[i].classList.remove('on');
					secs[i].classList.remove('on');
				}
				btns[idx].classList.add('on');
				secs[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		const secs = main.current.querySelectorAll('.myScroll');
		setNum(secs.length);
		getPos();

		//window에 이벤트 등록시 선언적 함수로 연결해야 removeEventLister를 연결할 수 있으므로
		//인수를 전달하기 위해 익명함수로 감싸주면 안됨
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);

		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, []);

	useEffect(() => {
		new Anime(window, {
			prop: 'scroll',
			value: pos.current[index],
			duration: 500,
		});
	}, [index]);

	return (
		<main ref={main}>
			<Header type={'main'} />
			<Visual />
			<News />
			<Pics scrolled={scrolled} start={pos.current[2]} />
			<Vids />
			<Btns setIndex={setIndex} num={num} />
		</main>
	);
}

export default Main;
