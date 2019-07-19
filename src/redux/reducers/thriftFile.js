/**
 * @description thrift文件reducer
 * @author      yq
 * @date        2017-10-19 14:56:47
 */
import {
  UPDATE_STATE, QUERY_SUCCESS, SHOW_MODAL, HIDE_MODAL,
} from '../types/thriftFile';

const thriftFileReducer = (state = {
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
  currentItem: {}, // 当前选择的类目
  modalVisible: false, // 模态框是否可见
  modalType: 'create', // 模态框类型
  selectedRowKeys: [], // 已选择的编号
}, action) => {
  switch (action.type) {
    case UPDATE_STATE:
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
    case SHOW_MODAL:
      return { ...state, ...action.payload, modalVisible: true };
    case HIDE_MODAL:
      return { ...state, modalVisible: false };
    default:
      return state;
  }
};
export default thriftFileReducer;
