/**
 * @description 菜单管理服务类
 * @author yq
 * @date 2017/9/8 下午4:47
 */
import {
  queryMenuApi, queryMenusApi, createMenuApi,
  updateMenuApi, removeMenuApi, batchRemoveMenuApi,
} from '../config/api';
import HttpUtil from '../utils/httpUtil';

/**
 * 新建API
 * @param data
 * @returns {*}
 */
export const create = data => HttpUtil.send(Object.assign({
  encode: false,
  data,
}, createMenuApi));

/**
 * 删除API delete是关键字，因此采用remove
 * @param id
 * @returns {*}
 */
export const remove = id => HttpUtil.send(Object.assign({
  encode: false,
  params: { id },
}, removeMenuApi));

/**
 * 批量删除API
 * @param id
 * @returns {*}
 */
export const batchRemove = ids => HttpUtil.send(Object.assign({
  encode: false,
  data: { ids },
}, batchRemoveMenuApi));

/**
 * 分页查询列表
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
}, queryMenusApi));

/**
 * 查询详情
 * @param id
 * @returns {*}
 */
export const queryDetail = id => HttpUtil.send(Object.assign({
  encode: false,
  params: { id },
}, queryMenuApi));

/**
 * 修改API
 * @param data
 * @returns {*}
 */
export const update = data => HttpUtil.send(Object.assign({
  encode: false,
  params: { id: data.id },
  data,
}, updateMenuApi));
