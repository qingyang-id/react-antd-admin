import React from 'react';
import { Icon } from 'antd';
import './Error.less';

const Error = () => (
  <div className="content-inner">
    <div className="error">
      <Icon type="frown-o" />
      <h1>404 Not Found</h1>
    </div>
  </div>
);

export default Error;
