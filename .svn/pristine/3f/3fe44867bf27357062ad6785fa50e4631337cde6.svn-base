import React, { Component } from 'react'; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有
import { Route, Link } from 'react-router-dom';
import { is, fromJS } from 'immutable';
import Config from '../../config/index';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { classnames, config } from '../../utils';
import store from '../../redux/store';


import styled from 'styled-components';
import elf from '../../elf/index';
// 公共头部
import { Lheader } from '../../component/layout/lheader';
// 公共菜单
// import { Lmenu } from './lmenu';
import SliderContainers from './SliderContainers';
import TabsBox from './TabsBox';
// 公共底部
import { Lfooter } from '../../component/layout/lfooter';

// 布局样式
// import '../layout/style/layout.less';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import { Helmet } from 'react-helmet';
import '../../styles/index.less';
import './app.less';
import Error from './error/Error';

const { prefix, openPages } = config;
const { Bread, styles } = Layout;
const { iconFontJS, iconFontCSS, logo } = config;

// 负责 渲染传递进来的 compObj
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // 把自路由向下传递来达到嵌套。
    <TabsBox
      route={route}
      tabsProps={props}
    />
  )}
  />
);

// 渲染内容
const MainContent = ({ route }) => (
  <div>
    {
      route.routes.map((route, i) => (
        <Route key={i} path={route.path} component={route.component}/>
      ))
    }
  </div>
);

// Logo 图片
const logoObj = require('../../assets/images/logo200X50.png');

const LogoBox = styled.div `
    width: 100%;
    object-fit: cover;
`;

/**
 * (路由根目录组件，显示当前符合条件的组件)
 *
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
  constructor(props) {
    console.log('初始化main');
    super(props);
    const collapsed = Config.localItem('COLLAPSED') == 'YES' ? true : false;
    this.state = {
      collapsed: collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    };
  }

  onCollapse = (collapsed) => {
    if (collapsed) Config.localItem('COLLAPSED', 'YES'); else Config.localItem('COLLAPSED', 'NO');
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline'
    });
  };
  toggle = (collapsed) => {
    if (collapsed) Config.localItem('COLLAPSED', 'YES'); else Config.localItem('COLLAPSED', 'NO');
    this.setState({
      collapsed: collapsed,
      mode: collapsed ? 'vertical' : 'inline'
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState));
  }

  render() {
    const { route } = this.props;
    // 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下
    return (
      <div>
        <Helmet>
          <title>API ADMIN</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <link rel="icon" href={logo} type="image/x-icon"/>
          {iconFontJS && <script src={iconFontJS}/>}
          {iconFontCSS && <link rel="stylesheet" href={iconFontCSS}/>}
        </Helmet>
        <Layout className="layout">
          <Sider
            width={elf.d.asideWidth}
            collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="layout-logo">
              <Link to="/">
                <img className="logo-img" src={Config.logoSrc}/>
                <span className="logo-text">{Config.logoText}</span>
              </Link>
            </div>
            <SliderContainers/>
          </Sider>
          <Layout
            style={{
              width: `calc(100% - ${elf.d.asideWidth}px)`,
              background: '#FFF'
            }}
          >
            <Lheader collapsed={this.state.collapsed} toggle={collapsed => this.toggle(collapsed)}/>
            <Content className="layout-content">
              {/*{this.props.children}*/}
              <MainContent route={route}/>
            </Content>
            <Lfooter/>
          </Layout>
        </Layout>
      </div>
    );
  }
}

Main.propTypes = {
  // children: PropTypes.element.isRequired,
  // location: PropTypes.object,
};

function mapStateToProp(state) {
  return {
    authenticated: state.userReducer.authenticated,
    isAuthenticating: state.userReducer.isAuthenticating,
    customData: state.userReducer.customData,
    current: state.menuReducer.currentItem,
    openKeys: state.menuReducer.openKeys,
    menuFold: state.menuReducer.menuFold,
    isAdmin: state.userReducer.isAdmin,
    userName: state.userReducer.userName,
    appReducer: state.appReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    logout: () => {
      dispatch(logoutRequest());
    },
    sendData: (data) => {
      dispatch(requestData(data));
    },
    setOpenKeys: (data) => {
      dispatch(setOpenKeys(data));
    },
    setMenuFold: (data) => {
      dispatch(setMenuFold(data));
    },
    setCurrentItem: (data) => {
      dispatch(setCurrentItem(data));
    }
  };
}

// export default Main;

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(Main));
