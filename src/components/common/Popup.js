import { forwardRef, useState, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

//단계1 - 기존의 컴포넌트 함수를 대입형함수로(화살표함수)로 변경하고
//단계2 - 해당 화살표 함수를 forwardRef()함수로 wrapping
//단계3 - forwardRef의 두번째 인수로 ref추가
const Popup = forwardRef((props, ref) => {
	//자신의 open여부를 결정하는 state생성
	const [open, setOpen] = useState(false);

	//해당 컴포넌트에서 만들어지는 함수를 부모컴포넌트에서 사용가능하도록 외부로 반환가능
	// 해당 컴포넌트를 forwardRef로 감싸서
	// useImperativeHandle로 state 변경함수를 내보냄
	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true), //팝업여는 기능
			close: () => setOpen(false), //팝업닫는 기능
		};
	});

	return (
		// 해당 컴포넌트가 사라질때에도 모션처리가 가능
		<AnimatePresence>
			{open && (
				<motion.aside
					className='pop'
					initial={{ opacity: 0, scale: 0 }} // 초기상태
					animate={{ opacity: 1, scale: 1 }} // 해당 컴포넌트가 생성될때 실행될 값
					exit={{ opacity: 0, scale: 0 }} // 해당 컴포넌트가 소멸될 때 실행될 값
					// initial={{ opacity: 0, y: -300 }}
					// animate={{ opacity: 1, y: 0, trnsition: { duration: 1.5 } }}
					// exit={{ opacity: 0, y: 300, trnsition: { duration: 1 } }}
				>
					<motion.div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.3 } }} // aside 모션이 끝나는 순간인 0.3초 이후에 con fadeIn 처리
						exit={{ opacity: 0 }}>
						{props.children}
					</motion.div>
				</motion.aside>
			)}
		</AnimatePresence>
	);
});

export default Popup;
