/**
 * @description thrift管理服务类
 * @author      yq
 * @date        2017-10-16 17:10:58
 */
import { queryThriftApi, queryThriftsApi, queryThriftListApi, createThriftApi, updateThriftApi,
  updateThriftStatusApi, removeThriftApi, batchRemoveThriftApi, } from '../config/api';
import HttpUtil from '../utils/httpUtil';

/**
 * 新增
 * @param data
 * @returns {*}
 */
export const create = (data) => {
  return HttpUtil.send(Object.assign({
    encode: false,
    data,
  }, createThriftApi));
};

/**
 * 删除 delete是关键字，因此采用remove
 * @param id
 * @returns {*}
 */
export const remove = (id) => {
  return HttpUtil.send(Object.assign({
    encode: false,
    params: { id },
  }, removeThriftApi));
};

/**
 * 批量删除
 * @param id
 * @returns {*}
 */
export const batchRemove = (ids) => {
  return HttpUtil.send(Object.assign({
    encode: false,
    data: { ids },
  }, batchRemoveThriftApi));
};

/**
 * 分页查询列表不含count
 * @param {Object} query  url中？后的参数
 *        例如： {
 *          page: 1,
 *          pageSize: 10,
 *        }
 * @returns {*}
 */
export const queryThrifts = (query) => {
  return HttpUtil.send(Object.assign({
    encode: false,
    query,
  }, queryThriftsApi));
};

/**
 * 分页查询列表(含count)
 * @param {Object} query  url中？后的参数
 *        例如： {
 *          page: 1,
 *          pageSize: 10,
 *        }
 * @returns {*}
 */
export const queryList = (query) => {
  return HttpUtil.send(Object.assign({
    encode: false,
    query,
  }, queryThriftListApi));
};

/**
 * 查询详情
 * @param id
 * @returns {*}
 */
export const queryDetail = (id) => {
  return HttpUtil.send(Object.assign({
    encode: false,
    params: { id },
  }, queryThriftApi));
};

/**
 * 修改
 * @param data
 * @returns {*}
 */
export const update = (data) => {
  return HttpUtil.send(Object.assign({
    encode: false,
    params: { id: data.id, },
    data,
  }, updateThriftApi));
};

/**
 * 修改状态
 * @param data
 * @returns {*}
 */
export const updateStatus = (data) => {
  return HttpUtil.send(Object.assign({
    encode: false,
    data,
  }, updateThriftStatusApi));
};
