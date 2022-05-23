import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr, fetchYoutube, fetchMembers } from './api';
import * as types from './actionType';

/*
- takeLatest : 액션 요청이 여러번 들어오면 제일 최근 요청 하나만 실행 (takeEvery: 들어오는 요청 모두 처리)
- all : 여러개의 함수를 한번에 호출
- call : 특정함수를 동기적으로 호출 (api 요청시 주로 사용, 두번째 인수값으로 받은 내용을 첫번째 인수로 받은 함수에 적용)
- fork : 특정함수를 비동기적으로 호출
- put : 리듀서에 액션객체를 전달 (dispatch와 동일)
*/

// 컴포넌트에서 받은 인수값을 api.js에 있는 axios함수에 연결하는 함수
// flickr 관련 action 생성함수
export function* returnFlickr(action) {
	try {
		const response = yield call(fetchFlickr, action.opt);
		yield put({
			type: types.FLICKR.success,
			payload: response.data.photos.photo,
		});
	} catch (err) {
		// 해당 api 호출이 실패했을때 예외처리
		// 에러 내용을 reducer에 전달
		yield put({ type: types.FLICKR.err, payload: err });
	}
}
// 요청받은 액션 타입에 따라 함수호출
export function* callFlickr() {
	yield takeLatest(types.FLICKR.start, returnFlickr);
}

// youtube 관련 action 생성함수
export function* returnYoutube(action) {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		yield put({ type: types.YOUTUBE.err, payload: err });
	}
}
export function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

// member 관련 action 생성함수
export function* returnMember(action) {
	try {
		const response = yield call(fetchMembers);
		yield put({ type: types.MEMBERS.success, payload: response.data.members });
	} catch (err) {
		yield put({ type: types.MEMBERS.err, payload: err });
	}
}
export function* callMember() {
	yield takeLatest(types.MEMBERS.start, returnMember);
}

// reducer에 적용될 rootSaga 생성함수
export default function* rootSaga() {
	yield all([fork(callFlickr), fork(callYoutube), fork(callMember)]);
}
