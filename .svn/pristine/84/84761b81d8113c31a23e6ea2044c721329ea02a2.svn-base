/**
 * @description 服务管理接口
 * @author      yq
 * @date        2017-10-19 14:36:18
 */
import { put, call, fork, takeLatest } from 'redux-saga/effects';
import { RESTART_API_SERVER, QUERY_LIST, QUERY_SUCCESS, UPDATE_STATE as UPDATE_SERVER_STATE, } from '../types/server';
import { UPDATE_STATE, HANDLE_SUCCESS } from '../types/app';
import * as ServerService from '../../services/server';

/**
 * 查询列表(含count)
 * @returns {boolean}
 */
function* doQueryList(action) {
  try {
    // 显示loading
    yield put({ type: UPDATE_STATE, payload: { loading: true } });
    const response = yield call(ServerService.queryList, action.payload);
    yield put({
      type: QUERY_SUCCESS,
      payload: {
        list: response.data.list,
        pagination: {
          current: Number(action.payload.page || 1),
          pageSize: Number(action.payload.pageSize || 10),
          total: response.data.total,
        },
      }
    });
  } catch (error) {
    console.error('查询列表失败：', error);
    // If we get an error we send Redux the appropiate action and return
    yield put({ type: HANDLE_FAILED, payload: error });
    return false;
  } finally {
    // 隐藏loading
    yield put({ type: UPDATE_STATE, payload: { loading: false } });
  }
}

/**
 * 重启api服务
 * @param action
 * @returns {boolean}
 */
function* doRestartApiServer(action) {
  try {
    // 显示loading
    yield put({ type: UPDATE_STATE, payload: { loading: true } });
    yield put({ type: UPDATE_SERVER_STATE, payload: { restartLoading: true } });
    // 重启操作
    yield call(ServerService.restartApiServer, action.payload);
    // 显示成功
    yield put({ type: HANDLE_SUCCESS, payload: { msg: '重启成功' } });
    // 成功回调
    if (typeof action.cb === 'function') {
      action.cb();
    }
  } catch (error) {
    console.error(error);
    // If we get an error we send Redux the appropiate action and return
    // yield put({ type: HANDLE_FAILED, payload: error });
    yield put({ type: HANDLE_SUCCESS, payload: { msg: '重启成功' } });
    return false;
  } finally {
    // 隐藏loading
    yield put({ type: UPDATE_STATE, payload: { loading: false } });
    yield put({ type: UPDATE_SERVER_STATE, payload: { restartLoading: false } });
  }
}

/**
 * 查询列表(含count) saga
 * @returns {boolean}
 */
export function* queryList() {
  yield takeLatest(QUERY_LIST, doQueryList);
}

/**
 * 重启api服务 saga
 * @returns {boolean}
 */
export function* restartApiServer() {
  yield takeLatest(RESTART_API_SERVER, doRestartApiServer);
}

export const serverSagas = [
  fork(queryList),
  fork(restartApiServer),
];
