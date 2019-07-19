/**
 * @description thrift文件操作方法
 * @author      yq
 * @date        2017-10-19 14:39:32
 */
import { UPLOAD, QUERY_LIST, UPDATE_STATE } from '../types/thriftFile';

// 更新state
export const updateState = data => ({ type: UPDATE_STATE, payload: data });

// 查询列表(含count)
export const queryList = payload => ({ type: QUERY_LIST, payload });

// 上传文件
export const upload = payload => ({ type: UPLOAD, payload });
