/**
 * @description 服务管理服务类
 * @author      yq
 * @date        2017-10-19 13:21:22
 */
import { queryRestartApiLogListApi, restartApiServerApi } from '../config/api';
import HttpUtil from '../utils/httpUtil';

/**
 * 分页查询列表(含count)
 * @param {Object} query  url中？后的参数
 *        例如： {
 *          page: 1,
 *          pageSize: 10,
 *        }
 * @returns {*}
 */
export const queryList = query => HttpUtil.send(Object.assign({
  encode: false,
  query,
}, queryRestartApiLogListApi));

/**
 * 重启API服务
 * @returns {*}
 */
export const restartApiServer = () => HttpUtil.send(Object.assign({
  encode: false,
}, restartApiServerApi));
