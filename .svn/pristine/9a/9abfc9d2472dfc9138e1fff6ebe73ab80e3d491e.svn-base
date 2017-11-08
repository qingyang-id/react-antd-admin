/**
 * @description 左侧菜单栏组件
 * @author yq
 * @date 2017/9/14 上午10:43
 */
import React, { Component } from 'react';
import { Layout, } from 'antd';
import { Link } from 'react-router-dom';
import MenuCustom from './base/MenuCustom';
import { logoSrc, logoText } from '../config';

const { Sider } = Layout;

class SiderCustom extends Component {
  render() {
    const that = this;
    const menuProps = {
      menus: this.props.menus,
      collapsed: this.props.collapsed,
      theme: this.props.theme,
      location: this.props.location,
      history: this.props.history,
      openKeys: this.props.openKeys,
      popoverMenuHide: this.props.popoverMenuHide,
      changeOpenKeys: (openKeys) => {
        console.warn('\n\n\n\n改变openKeys----', openKeys, '\n\n\n\n');
        that.props.changeMenuKeys({ openKeys });
      },
      switchMenuPopover: this.props.switchMenuPopover,
    };
    return (
      <Sider
        className={this.props.isMobile && 'sider-menu-fold'}
        trigger={null}
        breakpoint="lg"
        collapsible
        collapsed={this.props.collapsed}
        style={{ overflowY: 'auto' }}
      >
        {
          !this.props.isMobile &&
          <div className="logo">
            <Link to="/">
              <img className="logo-img" src={logoSrc}/>
              {this.props.collapsed ? '' : <span className="logo-text">{logoText}</span>}
            </Link>
          </div>
        }
        <MenuCustom
          {...menuProps}
        >
        </MenuCustom>
        <style>
          {`
                    #nprogress .spinner{
                        left: ${this.props.collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
        </style>
      </Sider>
    );
  }
}

export default SiderCustom;
