import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const editInput = useRef(null);
	const editTextarea = useRef(null);

	// 로컬저장소에서 데이터를 받아와서 json 형태로 변환해 반환
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};

	// 반환된 값을 바로 posts state에 저장
	const [posts, setPosts] = useState(getLocalData());
	// 중복 수정을 막을 state 추가
	const [allowed, setAllowed] = useState(true);

	const createPost = () => {
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			alert('제목과 본문을 입력하세요.');
			return;
		}

		setPosts([
			{ title: input.current.value, content: textarea.current.value },
			...posts,
		]);
		resetPost();
	};

	const resetPost = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	const deletePost = (index) => {
		// filter : 기존 배열을 반복을 돌면서 특정 조건에 부합되는 값만 리턴
		// 인수로 받은 해당 순번을 제외한 나머지 모든 포스트를 리턴
		// 딜리트 버튼을 누를때 그 post == index이므로 누른 post 빼고 나머지 값들 리턴
		setPosts(posts.filter((post, idx) => idx !== index));
	};

	// 수정 버튼 클릭시 실행되는 함수
	// 클릭한 버튼의 포스트 순번을 파라미터로 전달
	const enableUpdate = (index) => {
		// 수정모드 진입시 수정버튼 클릭 방지
		setAllowed(false);

		setPosts(
			// 기존 배열값을 반복돌면서 인수로 전달된 순번과 현재 반복도는 순번이 같은 포스트만 찾아서
			// enableUpdate:true 라는 값을 추가한뒤 setPosts로 기존 state값 변경
			posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = true;
				// 새로운 post 출력
				return post;
			})
		);
	};

	// 다시 출력모드로 변경하는 함수
	const disableUpdate = (index) => {
		// 출력모드 진입시 수정버튼 클릭 가능
		setAllowed(true);

		setPosts(
			posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = false;
				return post;
			})
		);
	};

	// post 수정 함수
	const updatePost = (index) => {
		if (!editInput.current.value.trim() || !editTextarea.current.value.trim()) {
			alert('수정할 제목과 본문을 입력하세요.');
			return;
		}

		// 수정완료시 다시 allowed true로 변경
		setAllowed(true);

		setPosts(
			posts.map((post, idx) => {
				if (idx === index) {
					post.title = editInput.current.value;
					post.content = editTextarea.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		);
	};

	// posts 값이 변경될때마다 콘솔로 출력
	useEffect(() => {
		// posts가 변경될때마다 해당 state를 문자열로 변환해서 로컬 저장소에 저장
		localStorage.setItem('post', JSON.stringify(posts));
	}, [posts]);

	return (
		<Layout name={'Community'} img={'pic1.jpg'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea
					ref={textarea}
					cols='30'
					rows='10'
					placeholder='본문을 입력하세요'></textarea>
				<br />

				<button onClick={resetPost}>cancel</button>
				<button onClick={createPost}>create</button>
			</div>

			<div className='showBox'>
				{posts.map((post, idx) => {
					return (
						<article key={idx}>
							{/* {post.enableUpdate ? 수정모드 : 출력모드} */}
							{post.enableUpdate ? (
								// 수정모드
								<>
									<input
										type='text'
										defaultValue={post.title}
										ref={editInput}
									/>
									<br />
									<textarea
										cols='30'
										rows='10'
										defaultValue={post.content}
										ref={editTextarea}></textarea>

									<div className='btns'>
										<button onClick={() => disableUpdate(idx)}>cancel</button>
										{/* 수정모드에서 저장버튼 클릭시 수정함수 호출 */}
										<button onClick={() => updatePost(idx)}>save</button>
									</div>
								</>
							) : (
								// 출력모드
								<>
									<h2>{post.title}</h2>
									<p>{post.content}</p>

									<div className='btns'>
										{/* 수정 버튼 클릭시 enableUpdate 호출하면서 인수로 수정할 post 순번 전달 */}
										<button
											onClick={() => {
												// allowed가 true 일때만 수정모드 변경 가능
												if (allowed) enableUpdate(idx);
											}}>
											edit
										</button>
										<button onClick={() => deletePost(idx)}>delete</button>
									</div>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
