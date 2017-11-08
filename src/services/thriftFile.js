/**
 * @description thrift文件管理服务类
 * @author      yq
 * @date        2017-10-19 13:20:54
 */
import { queryThriftFileListApi, uploadThriftFileApi, } from '../config/api';
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
export const queryList = (query) => {
  return HttpUtil.send(Object.assign({
    encode: false,
    query,
  }, queryThriftFileListApi));
};

/**
 * 上传thrift文件
 * @param data
 * @returns {*}
 */
export const upload = ({ data, onUploadProgress }) => {
  return HttpUtil.send(Object.assign({
    encode: false,
    headers: { 'Content-Type': 'multipart/form-data', },
    onUploadProgress,
    data,
  }, uploadThriftFileApi));
};
