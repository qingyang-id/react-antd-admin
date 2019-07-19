// 全局 目录配置(输出: 导航菜单 / 路由)
import { THRIFT_DIR, SERVER_DIR, UI_DIR } from './config';
// 路由
const globalDir = [
  {
    id: '1',
    title: '引导页',
    key: '1',
    path: '/home/guide',
    icon: 'flag',
    component: require('../containers/home/homeIndex').default,
  },
  THRIFT_DIR,
  SERVER_DIR,
  UI_DIR,
];

export default globalDir;
