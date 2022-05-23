//미들웨어 추가기능 모듈 import
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';
//saga middleware import
import createSagaMiddleware from '@redux-saga/core';
//미들웨어로 적용할 saga파일 import
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
//store생성시 리듀서에 saga미들웨어 적용후 저장
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

//store에 적용된 sagaMiddleware를 통해 rootSaga기능 활성화
sagaMiddleware.run(rootSaga);

export default store;
