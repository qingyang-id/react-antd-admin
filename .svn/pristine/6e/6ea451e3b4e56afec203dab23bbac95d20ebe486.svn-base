/**
 * @description 头部组件
 * @author yq
 * @date 2017/9/14 上午10:43
 */
import React  from 'react';
import { Menu, Icon, Layout, Popover } from 'antd';
import screenfull from 'screenfull';
import avater from '../style/imgs/b1.jpg';
import SiderCustom from './SiderCustom';
import UpdatePasswordModal from './base/UpdatePasswordModal';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  screenFull = () => {
    if (screenfull.enabled) {
      screenfull.request();
    }
  };

  menuClick = e => {
    console.log(e);
    // e.key === 'logout' && this.props.logout();
  };

  popoverMenuHide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };

  updatePassword = (visible) => {
    this.props.updateState({ modalVisible: true, });
  };

  render() {
    const that = this;
    const menusProps = {
      path: this.props.path,
      menus: this.props.menus,
      collapsed: false,
      theme: 'light',
      isMobile: this.props.isMobile,
      location: this.props.location,
      history: this.props.history,
      openKeys: this.props.openKeys,
      switchMenuPopover: this.props.switchMenuPopover,
      changeMenuKeys: this.props.changeMenuKeys,
    };
    const modalProps = {
      visible: this.props.modalVisible,
      maskClosable: false,
      confirmLoading: this.props.loading,
      title: '修改密码',
      wrapClassName: 'vertical-center-modal',
      onOk(data) {
        // 成功回调
        that.props.updatePassword(data);
      },
      onCancel() {
        that.props.updateState({
          modalVisible: false,
        });
      },
    };
    return (
      <Header style={{ background: '#fff', padding: 0, height: 65 }} className="custom-theme">
        {
          this.props.isMobile ? (
            <Popover
              overlayClassName='popover-menu'
              content={<SiderCustom {...menusProps} popoverMenuHide={this.props.switchMenuPopover.bind(null, true)} />}
              trigger="click"
              placement="bottomLeft"
              visible={this.props.menuPopoverVisible}
              onVisibleChange={this.props.switchMenuPopover}>
              <Icon type="bars" className="trigger custom-trigger"/>
            </Popover>
          ) : (
            <Icon
              className="trigger custom-trigger"
              type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.props.collapseMenu}
            />
          )
        }
        <Menu
          mode="horizontal"
          style={{ lineHeight: '64px', float: 'right' }}
          onClick={this.menuClick}
        >
          <Menu.Item key="full" onClick={this.screenFull}>
            <Icon type="arrows-alt" onClick={this.screenFull}/>
          </Menu.Item>
          {/*<Menu.Item key="1">
            <Badge count={25} overflowCount={10} style={{ marginLeft: 10 }}>
              <Icon type="notification"/>
            </Badge>
          </Menu.Item>*/}
          <SubMenu
            title={<span className="avatar"><img src={avater} alt="头像"/><i className="on bottom b-white"/></span>}>
            <MenuItemGroup title="用户中心">
              {/*<Menu.Item key="setting:1">你好 - {this.props.user && this.props.user.account}</Menu.Item>*/}
              <Menu.Item key="updatePassword"><span onClick={this.updatePassword}>修改密码</span></Menu.Item>
              <Menu.Item key="logout"><span onClick={this.props.logout}>退出登录</span></Menu.Item>
            </MenuItemGroup>
            {/*<MenuItemGroup title="设置中心">
              <Menu.Item key="setting:3">个人设置</Menu.Item>
              <Menu.Item key="setting:4">系统设置</Menu.Item>
            </MenuItemGroup>*/}
          </SubMenu>
        </Menu>
        {this.props.modalVisible && <UpdatePasswordModal {...modalProps} />}
        <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                `}</style>
      </Header>
    );
  }
}

export default HeaderCustom;
