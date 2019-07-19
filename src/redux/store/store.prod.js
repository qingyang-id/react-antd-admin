import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import history from '../../utils/history';
import * as rootReducer from '../reducers/index';
import saga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

// 1. 配置 middleware 中间件
const middleware = [
  routerMiddleware(history), // router-redux配置 history
  // thunk  // 异步
  sagaMiddleware, // 异步
];

// 2. 配置 combine: 组合 redux 与 router
const combine = combineReducers({
  ...rootReducer,
  router: connectRouter(history),
});

// 配置 store
const configureStore = (initialState) => {
  const store = createStore(
    combine,
    initialState,
    applyMiddleware(...middleware),
  );

  // 启动saga中间件
  sagaMiddleware.run(saga);

  return store;
};

export { configureStore, history };
