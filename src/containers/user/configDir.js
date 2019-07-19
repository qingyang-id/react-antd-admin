// 接口管理 - 目录配置
import ApiList from './index';

const API_DIR = {
  title: '接口管理',
  key: 'api',
  path: '/home/api',
  icon: 'setting',
  children: [
    {
      title: '接口列表',
      key: 'apiList',
      path: '/home/api/list',
      ancestor: ['api'],
      component: ApiList,
    },
  ],
};

export { API_DIR };
