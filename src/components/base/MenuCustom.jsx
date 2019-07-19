/**
 * @description 左侧菜单栏组件
 * @author yq
 * @date 2017/9/14 上午10:43
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import globalDir from '../../router/globalDir';

class MenuCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      levelMap: {},
      selectedKeys: [],
      openKeys: [],
    };
  }

  componentDidMount() {
    // 寻找选中路由
    // 匹配当前路由
    const menus = this.props.menus;
    let currentRoute = this.findRouterByPath(menus, this.props.history.location.pathname);
    let parentRoute;
    const openKeys = [];
    let selectedKeys = [];
    if (currentRoute) {
      openKeys.push(currentRoute.key);
      selectedKeys.push(currentRoute.key);
    }
    if (currentRoute && currentRoute.pid) {
      parentRoute = menus.find(menu => menu.id === currentRoute.pid);
      if (parentRoute) {
        openKeys.unshift(parentRoute.key);
        // selectedKeys.unshift(parentRoute.key);
      }
    }
    this.setState({
      selectedKeys,
    });
    this.props.changeOpenKeys(openKeys);
  }

  /**
   * 查找指定路由
   * @param routes
   * @param path
   * @returns {*}
   */
  findRouterByPath(routes, path) {
    for (let i = 0; i < routes.length; i += 1) {
      if (routes[i].path && pathToRegexp(routes[i].path).exec(path)) {
        return routes[i];
      }
      if (Array.isArray(routes[i].children) && routes[i].children.length > 0) {
        const currentRoute = this.findRouterByPath(routes[i].children, path);
        if (currentRoute) {
          return currentRoute;
        }
      }
    }
    return null;
  }

  // 递归生成菜单
  getMenus(globalDirN) {
    const levelMap = this.state.levelMap;
    return globalDirN.map((item) => {
      if (item.children) {
        if (item.pid) {
          levelMap[item.key] = item.pid;
        }
        return (
          <Menu.SubMenu
            key={item.id}
            title={<span>
              {item.icon && <Icon type={item.icon}/>}
              <span className="nav-text">{item.title}</span>
            </span>}
          >
            {this.getMenus(item.children)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={item.id}>
          <Link to={item.path || '#'}>
            {item.icon && <Icon type={item.icon}/>}
            {!item.pid ? (<span className="nav-text">{item.title}</span>) : item.title}
            {/*{(item.pid || !collapsed) && item.title}*/}
          </Link>
        </Menu.Item>
      );
    });
  };

  // 保持选中
  getAncestorKeys = (key) => {
    let map = {};
    const levelMap = this.state.levelMap;
    const getParent = (index) => {
      const result = [String(levelMap[index])];
      if (levelMap[result[0]]) {
        result.unshift(getParent(result[0])[0]);
      }
      return result;
    };
    for (let index in levelMap) {
      if ({}.hasOwnProperty.call(levelMap, index)) {
        map[index] = getParent(index);
      }
    }
    return map[key] || [];
  };

  menuClick = e => {
    this.setState({
      selectedKeys: [e.key],
    });
    // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
    this.props.switchMenuPopover && this.props.switchMenuPopover();
  };

  onOpenChange = (openKeys) => {
    const navOpenKeys = this.props.openKeys || [];
    const latestOpenKey = openKeys.find(key => !navOpenKeys.includes(key));
    const latestCloseKey = navOpenKeys.find(key => !openKeys.includes(key));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.props.changeOpenKeys(nextOpenKeys);
  };

  render() {
    const { collapsed, theme, } = this.props;


    const menuItems = this.getMenus(globalDir);

    return (
      <Menu
        mode={collapsed ? 'vertical' : 'inline'}
        theme={theme || 'dark'}
        onClick={this.menuClick}
        onOpenChange={this.onOpenChange}
        openKeys={this.props.openKeys}
        selectedKeys={this.state.selectedKeys}
      >
        {menuItems}
      </Menu>
    );
  }
}

MenuCustom.propTypes = {
  menus: PropTypes.array,
  collapsed: PropTypes.bool,
  // theme: PropTypes.string,
  handleClickNavMenu: PropTypes.func,
  // navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
};

export default MenuCustom;
