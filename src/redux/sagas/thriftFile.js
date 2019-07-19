/**
 * @description 服务管理接口
 * @author      yq
 * @date        2017-10-19 13:19:27
 */
import {
  put, call, fork, takeLatest,
} from 'redux-saga/effects';
import {
  QUERY_SUCCESS, QUERY_LIST, UPLOAD,
  UPDATE_STATE as UPDATE_THRIFT_FILE_STATE,
} from '../types/thriftFile';
import { UPDATE_STATE, HANDLE_SUCCESS, HANDLE_FAILED } from '../types/app';
import * as ThriftFileService from '../../services/thriftFile';

/**
 * 上传thrift文件
 * @param action
 * @returns {boolean}
 */
function* doUpload(action) {
  try {
    // 显示loading
    yield put({ type: UPDATE_STATE, payload: { loading: true } });
    // 新增操作
    yield call(ThriftFileService.upload, action.payload);
    // 隐藏模态框
    yield put({ type: UPDATE_THRIFT_FILE_STATE, payload: { modalVisible: false } });
    // 显示修改成功
    yield put({ type: HANDLE_SUCCESS, payload: { msg: '上传成功' } });
    // 成功回调
    if (typeof action.cb === 'function') {
      action.cb();
    }
  } catch (error) {
    console.error(error);
    // If we get an error we send Redux the appropiate action and return
    yield put({ type: HANDLE_FAILED, payload: error });
    return false;
  } finally {
    // 隐藏loading
    yield put({ type: UPDATE_STATE, payload: { loading: false } });
  }
}

/**
 * 查询列表(含count)
 * @returns {boolean}
 */
function* doQueryList(action) {
  try {
    // 显示loading
    yield put({ type: UPDATE_STATE, payload: { loading: true } });
    const response = yield call(ThriftFileService.queryList, action.payload);
    yield put({
      type: QUERY_SUCCESS,
      payload: {
        list: response.data.list,
        pagination: {
          current: Number(action.payload.page || 1),
          pageSize: Number(action.payload.pageSize || 10),
          total: response.data.total,
        },
      },
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
 * 上传文件 saga
 * @returns {boolean}
 */
export function* upload() {
  yield takeLatest(UPLOAD, doUpload);
}

/**
 * 查询列表(含count) saga
 * @returns {boolean}
 */
export function* queryList() {
  yield takeLatest(QUERY_LIST, doQueryList);
}

export const thriftFileSagas = [
  fork(queryList),
  fork(upload),
];
