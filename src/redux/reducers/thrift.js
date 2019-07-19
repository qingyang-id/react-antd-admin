/**
 * @description thrift reduce
 * @author      yq
 * @date        2017-10-16 17:22:52
 */

import {
  UPDATE_THRIFT_STATE, DELETE_SUCCESS, QUERY_SUCCESS,
  BATCH_DELETE_SUCCESS, SHOW_MODAL, HIDE_MODAL,
} from '../types/thrift';

const userReducer = (state = {
  // 列表数据
  list: [],
  // 分页信息
  pagination: {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `总共 ${total} 条`,
    current: 1,
    page: 1,
    pageSize: 20,
    total: 0,
  },
  thrifts: [],
  currentItem: {}, // 当前选择的类目
  modalVisible: false, // 模态框是否可见
  modalType: 'create', // 模态框类型
  selectedRowKeys: [], // 已选择的编号
}, action) => {
  console.warn('action---', action.type, action);
  switch (action.type) {
    case UPDATE_THRIFT_STATE:
      console.warn('update state------', action.payload);
      return {
        ...state,
        ...action.payload,
      };
    case QUERY_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        pagination: {
          ...action.payload.pagination,
        },
        selectedRowKeys: [],
      };
    case DELETE_SUCCESS:
      return { ...state, selectedRowKeys: action.selectedRowKeys.filter(_ => _ !== action.payload) };
    case BATCH_DELETE_SUCCESS:
      return { ...state, selectedRowKeys: [] };
    case SHOW_MODAL:
      return { ...state, ...action.payload, modalVisible: true };
    case HIDE_MODAL:
      return { ...state, modalVisible: false };
    default:
      return state;
  }
};
export default userReducer;
export const getApp = state => state.app;
export const getPagination = state => getApp(state).pagination;
