/**
 * @description thrift相关路由
 * @author      yq
 * @date        2017-10-16 17:29:24
 */
import ApiList from '../../containers/api';
import ThriftList from '../../containers/thrift';
import ThriftFileList from '../../containers/thrift/file';

export const THRIFT_DIR = {
  id: '10',
  title: 'thrift管理',
  key: '10',
  icon: 'rocket',
  children: [
    {
      id: '11',
      pid: '10',
      title: '接口列表',
      key: '11',
      path: '/home/apis',
      icon: 'api',
      component: ApiList,
    },
    {
      id: '12',
      pid: '10',
      title: '服务列表',
      key: '12',
      path: '/home/thrifts',
      icon: 'database',
      component: ThriftList,
    },
    {
      id: '13',
      pid: '10',
      title: '文件列表',
      key: '13',
      path: '/home/thrifts/files',
      icon: 'file',
      component: ThriftFileList,
    },
  ],
};
