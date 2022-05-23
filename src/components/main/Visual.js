import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
// import { useRe } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const path = process.env.PUBLIC_URL;

function Visual() {
	// const frame = useRef(null);
	// const cursor = useRef(null);
	// let isCursor = false;

	// 다른 페이지로 갔을대 마우스 무브 이벤트를 제거해야한다!
	// window.addEventListener('mousemove', (e) => {
	// 	cursor.current.style.left = e.clientX + 'px';
	// 	cursor.current.style.top = e.clientY + 'px';
	// });

	// const mouseMove = (e) => {
	// 	if (isCursor) {
	// 		cursor.current.style.left = e.clientX + 'px';
	// 		cursor.current.style.top = e.clientY + 'px';
	// 	}
	// };

	// 다른 페이지로 갔을대 마우스 무브 이벤트를 제거
	// useEffect(() => {
	// 	// visual 영역밖으로 나가면 커서 이벤트 없애기
	// 	frame.current.addEventListener('mouseenter', () => {
	// 		isCursor = true;
	// 		cursor.current.style.display = 'block';
	// 	});
	// 	frame.current.addEventListener('mouseleave', () => {
	// 		isCursor = false;
	// 		cursor.current.style.display = 'none';
	// 	});

	// 	window.addEventListener('mousemove', mouseMove);

	// 	return () => window.removeEventListener('mousemove', mouseMove);
	// }, []);

	return (
		<figure className='myScroll on'>
			<Swiper
				spaceBetween={50}
				centeredSlides={true}
				grabCursor={true}
				loop={true}
				slidesPerView={3}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				modules={[Pagination, Navigation]}>
				<SwiperSlide>
					<video src={`${path}/img/visual.mp4`} loop autoPlay muted></video>
				</SwiperSlide>
				<SwiperSlide>
					<video src={`${path}/img/visual.mp4`} loop autoPlay muted></video>
				</SwiperSlide>
				<SwiperSlide>
					<video src={`${path}/img/visual.mp4`} loop autoPlay muted></video>
				</SwiperSlide>
				<SwiperSlide>
					<video src={`${path}/img/visual.mp4`} loop autoPlay muted></video>
				</SwiperSlide>
				<SwiperSlide>
					<video src={`${path}/img/visual.mp4`} loop autoPlay muted></video>
				</SwiperSlide>
			</Swiper>

			{/* <div className='cursor' ref={cursor}></div> */}
		</figure>
	);
}

export default Visual;
