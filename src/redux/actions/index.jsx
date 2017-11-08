/**
 * 公共 action
 * @return
 */
import * as type from './types';
import * as http from '../../utils/httpUtil';
import { LOADING } from '../types/dispatch';

/**
 * 用于页面和区块的加载中状态
 * @return
 */
const loading = (isLoading) => {
  return {
    type: LOADING,
    loading: isLoading
  };
};

const requestData = category => ({
  type: type.REQUEST_DATA,
  category
});
export const receiveData = (data, category) => ({
  type: type.RECEIVE_DATA,
  data,
  category
});
/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
export const fetchData = ({funcName, params, stateName}) => dispatch => {
  !stateName && (stateName = funcName);
  dispatch(requestData(stateName));
  return http[funcName](params).then(res => dispatch(receiveData(res, stateName)));
};

export { loading };
