import Mock from 'mockjs';

import userMock from './user';
import apiMock from './api';
import thriftMock from './thrift';
import thriftFileMock from './thriftFile';
import serverMock from './server';

Mock.setup({
  timeout: '500-2000'
});
// 启动用户相关mock接口
userMock();
apiMock();
thriftFileMock();
thriftMock();
serverMock();
