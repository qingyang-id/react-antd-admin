import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import * as rootReducer from '../reducers/index';
import createHistory from 'history/createBrowserHistory';
import saga from '../sagas';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

// 1. 配置 middleware 中间件
const middleware = [
  routerMiddleware(history),  // router-redux配置 history
  // thunk  // 异步
  sagaMiddleware  // 异步
];

// 2. 配置 combine: 组合 redux 与 router
const combine = combineReducers({
  ...rootReducer,
  router: routerReducer
});

// 配置 store
const configureStore = (initialState) => {
  const store = createStore(
    combine,
    initialState,
    applyMiddleware(...middleware)
  );

  // 启动saga中间件
  sagaMiddleware.run(saga);

  return store;
};

export { configureStore, history };
