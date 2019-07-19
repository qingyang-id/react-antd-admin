/**
 * @description thrift action
 * @author      yq
 * @date        2017-10-16 17:24:02
 */

import {
  UPDATE, UPDATE_THRIFT_STATUS, CREATE, DELETE, QUERY, QUERY_LIST,
  BATCH_DELETE, UPDATE_THRIFT_STATE,
} from '../types/thrift';

// 更新state
export const updateThriftState = data => ({ type: UPDATE_THRIFT_STATE, payload: data });

// 查询列表(不含count)
export const query = payload => ({ type: QUERY, payload });

// 查询列表(含count)
export const queryList = payload => ({ type: QUERY_LIST, payload });

// 删除
export const remove = (id, cb) => ({ type: DELETE, payload: id, cb });

// 批量删除
export const batchRemove = (ids, cb) => ({ type: BATCH_DELETE, payload: ids, cb });

// 新增
export const create = (data, cb) => ({ type: CREATE, payload: data, cb });

// 更新
export const update = (data, cb) => ({ type: UPDATE, payload: data, cb });

// 更新状态
export const updateStatus = (data, cb) => ({ type: UPDATE_THRIFT_STATUS, payload: data, cb });
