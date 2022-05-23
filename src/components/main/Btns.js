function Btns(props) {
	//숫자값을 가지고 해당 숫자의 갯수만큼 배열생성
	const arr = Array.from(Array(props.num).keys());

	return (
		<ul className='scroll_navi'>
			{arr.map((_, idx) => {
				let active = '';
				idx === 0 ? (active = 'on') : (active = '');

				return (
					<li
						key={idx}
						className={active}
						onClick={() => props.setIndex(idx)}></li>
				);
			})}
		</ul>
	);
}
export default Btns;
