/**
 * @description 服务管理操作方法
 * @author      yq
 * @date        2017-10-19 14:44:04
 */
import { UPDATE_STATE, QUERY_LIST, RESTART_API_SERVER } from '../types/server';

// 更新state
export const updateState = data => ({ type: UPDATE_STATE, payload: data });

// 查询列表(含count)
export const queryList = payload => ({ type: QUERY_LIST, payload });

// 重启api服务
export const restartApiServer = payload => ({ type: RESTART_API_SERVER, payload });
