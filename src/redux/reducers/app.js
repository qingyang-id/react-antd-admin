/**
 * @description 应用中心reducer
 * @author yq
 * @date 2017/8/25 下午4:55
 */
import { message } from 'antd';
import * as types from '../types/app';
import { systemPrefix } from '../../config';

const initialState = {
  spinning: false, // 是否显示页面旋转图标
  loading: false, // 是否显示表格loading
  user: {},
  permissions: {
    visit: [],
  },
  menus: [
    {
      id: '1',
      title: '引导页',
      key: '1',
      path: '/home/guide',
      icon: 'flag'
    },
    {
      id: '10',
      title: 'thrift管理',
      key: '10',
      icon: 'setting',
      children: [
        {
          id: '11',
          pid: '10',
          title: '接口列表',
          key: '11',
          path: '/home/apis',
          icon: 'setting',
        },
        {
          id: '12',
          pid: '10',
          title: '服务列表',
          key: '12',
          path: '/home/thrifts',
          icon: 'database',
          ancestor: ['thrift'],
        },
        {
          id: '13',
          pid: '10',
          title: '文件列表',
          key: '13',
          path: '/home/thrifts/files',
          icon: 'file',
          ancestor: ['thrift'],
        },
      ]
    },
    {
      id: '20',
      title: '系统监控',
      key: '20',
      icon: 'poweroff',
      children: [
        {
          id: '21',
          pid: '20',
          title: '操作日志',
          key: '21',
          path: '/home/servers/logs',
          ancestor: ['thrift'],
        },
      ]
    },
    {
      id: '30',
      title: 'UI',
      key: '30',
      icon: 'rocket',
      children: [
        {
          id: '31',
          pid: '30',
          title: '富文本',
          key: '31',
          path: '/home/ui/editor',
          icon: 'rocket',
        },
      ]
    },
  ],
  openKeys: [],
  selectedKeys: [],
  collapsed: window.localStorage.getItem(`${systemPrefix}-COLLAPSED`) === 'true',
  theme: window.localStorage.getItem(`${systemPrefix}-THEME`) === 'true',
  menuPopoverVisible: false,
  isNavbar: document.body.clientWidth < 769,
};

const updateState = (state, { payload }) => {
  return {
    ...state,
    ...payload,
  };
};

const collapseMenu = (state) => {
  window.localStorage.setItem(`${systemPrefix}-COLLAPSED`, !state.collapsed);
  return {
    ...state,
    collapsed: !state.collapsed,
  };
};

const switchTheme = (state) => {
  window.localStorage.setItem(`${systemPrefix}-THEME`, !state.theme);
  return {
    ...state,
    theme: !state.theme,
  };
};

const switchMenuPopover = (state) => {
  return {
    ...state,
    menuPopoverVisible: !state.menuPopoverVisible,
  };
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_STATE:
      return updateState(state, action);
    case types.COLLAPSE_MENU:
      return collapseMenu(state);
    case types.SWITCH_THEME:
      return switchTheme(state);
    case types.SWITCH_MENU_POPOVER:
      return switchMenuPopover(state);
    case types.HANDLE_SUCCESS:
      message.success((action.payload && action.payload.msg) || '操作成功');
      return {
        ...state,
      };
    case types.HANDLE_FAILED:
      message.error((action.payload && action.payload.msg) || '操作失败，请稍后重试');
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default app;
