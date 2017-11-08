import React, { Component } from 'react';
import { Layout } from 'antd';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import BreadcrumbCustom from './components/BreadcrumbCustom';
import Footer from './components/base/footer/Footer';
import { switchTheme, updateState, collapseMenu, switchMenuPopover } from './redux/actions/app';
import { updatePassword, logout } from './redux/actions/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';
import classnames from 'classnames';

const { Content } = Layout;

// 渲染内容
const MainContent = ({ route }) => (
  <div className='content'>
    {
      route.routes.map((routeDetail, i) => (
        <Route key={i}  path={routeDetail.path} exact component={routeDetail.component}/>
      ))
    }
  </div>
);

@connect(
  state => {
    return {
      appReducer: state.appReducer,
      userReducer: state.userReducer,
    };
  },
  dispatch => bindActionCreators({
      switchTheme,
      updateState,
      collapseMenu,
      switchMenuPopover,
      updatePassword,
      logout,
    },
    dispatch
  )
)
class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.getClientWidth();
    window.onresize = () => {
      console.log('屏幕变化了', document.body.clientWidth);
      this.getClientWidth();
    };
    // 查询用户是否登录
  }

  getClientWidth = () => { // 获取当前浏览器宽度并设置responsive管理响应式
    const clientWidth = document.body.clientWidth;
    this.props.updateState({
      isMobile: clientWidth <= 992
    });
  };

  toggle = () => {
    this.props.collapseMenu();
  };

  render() {
    const { history, location, route, } = this.props;
    const { user, } = this.props.userReducer;
    const {
      collapsed,
      openKeys,
      selectedKeys,
      isMobile,
      menus,
      theme,
      menuPopoverVisible,
    } = this.props.appReducer;

    const breadProps = {
      history,
      location,
      menus,
    };
    const that = this;
    const siderProps = {
      path: this.props.location.pathname,
      collapsed,
      history,
      location,
      menus,
      isMobile,
      theme,
      user,
      openKeys,
      switchMenuPopover: that.props.switchMenuPopover,
      changeMenuKeys: (options) => that.props.updateState(options),
    };
    const headerProps = {
      toggle: this.toggle,
      user,
      menus,
      modalVisible: this.props.appReducer.modalVisible,
      loading: this.props.appReducer.loading,
      path: this.props.location.pathname,
      collapseMenu: that.props.collapseMenu,
      handleClickNavMenu: that.props.switchMenuPopover,
      history,
      location,
      collapsed,
      isMobile,
      theme,
      menuPopoverVisible,
      openKeys,
      selectedKeys,
      updateState: that.props.updateState,
      switchMenuPopover: that.props.switchMenuPopover,
      updatePassword: that.props.updatePassword,
      logout: that.props.logout,
      changeMenuKeys: (options) => that.props.updateState(options),
    };
    return (
      <Layout className={classnames('ant-layout-has-sider', 'body-content', { ['fold']: collapsed })}>
        {!isMobile &&
        <SiderCustom {...siderProps}/>}
        <Layout className='main'>
          <HeaderCustom {...headerProps}/>
          <BreadcrumbCustom {...breadProps}/>
          <Content className='container'>
            <MainContent route={route}/>
          </Content>
          <Footer/>
        </Layout>
        {
          isMobile && (   // 手机端对滚动很慢的处理
            <style>
              {`
                  #root{
                      height: auto;
                  }
              `}
            </style>
          )
        }
      </Layout>
    );
  }
}

export default App;
