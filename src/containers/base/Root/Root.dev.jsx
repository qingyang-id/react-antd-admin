import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
// import { connect } from 'react-redux';
// import DevTools from '../../../utils/DevTools' // 勿删! 页面内调试工具; 如果要将调试器放在页面中, 则 引用此组件, 并且解开下方的注释(方便未安装chrome 或 火狐浏览器插件的 调试) => 目前开发使用chrome环境, 所以不使用 页内调试器

import { ConnectedRouter } from 'connected-react-router';
// import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config'; // 渲染静态 Route 配置

import rootRoutes from '../../../router';
// react-router-redux: Now you can dispatch navigation actions from anywhere!
// connected-react-router: store.dispatch(push('/foo'))

class Root extends React.Component {
  render() {
    const { store } = this.props;
    const { history } = this.props;
    // const { isLogin } = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div style={{ height: '100%' }}>
            {renderRoutes(rootRoutes)}
             {/*<DevTools />*/}
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

// Root.childContextTypes = {
//   store: PropTypes.object.isRequired    // childContextTypes必须声明  这一句很重要
// };

export default Root;
