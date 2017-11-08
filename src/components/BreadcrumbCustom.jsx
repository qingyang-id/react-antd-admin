/**
 * @description 面包屑组件
 * @author yq
 * @date 2017/9/14 上午10:43
 */
import React from 'react';
import { Breadcrumb, Switch, Icon } from 'antd';
import { Link } from 'react-router-dom';
import themes from '../style/theme';
import pathToRegexp from 'path-to-regexp';
import './breadcrumbCustom.less';

class BreadcrumbCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: this.props.menus,
      switcherOn: false,
      theme: null,
      themes: JSON.parse(localStorage.getItem('themes')) || [
        { type: 'info', checked: false },
        { type: 'grey', checked: false },
        { type: 'danger', checked: false },
        { type: 'warn', checked: false },
        { type: 'white', checked: false },
      ],
    };
  }

  componentDidMount() {
    this.state.themes.forEach(val => {
      val.checked && this.setState({
        theme: themes['theme' + val.type] || null
      });
    });
  }

  switcherOn = () => {
    this.setState({
      switcherOn: !this.state.switcherOn
    });
  };
  themeChange = (v) => {
    this.setState({
      themes: this.state.themes.map((t, i) => {
        (t.type === v.type && (t.checked = !t.checked)) || (t.checked = false);
        return t;
      }),
      theme: (v.checked && themes['theme' + v.type]) || null
    }, () => {
      localStorage.setItem('themes', JSON.stringify(this.state.themes));
    });
  };

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

  getBreadcrumb(route) {
    if (!route) {
      return '';
    }
    return (<Breadcrumb.Item>
      {
        route.path ?
          (
            <Link to={route.path}>
        <span>
        {route.icon ? <Icon type={route.icon} style={{ marginRight: 4 }}/> : ''}
          {route.title}
        </span>
            </Link>
          ) :
          (
            <span>
        {route.icon ? <Icon type={route.icon} style={{ marginRight: 4 }}/> : ''}
              {route.title}
        </span>
          )
      }
    </Breadcrumb.Item>);
  }

  render() {
    // 匹配当前路由
    const menus = this.state.menus;
    // 匹配当前路由
    let currentRoute = this.findRouterByPath(menus, this.props.history.location.pathname);
    let parentRoute;
    if (!currentRoute) {
      currentRoute = {
        id: 1,
        title: '引导页',
        key: 'guide',
        path: '/home/guide',
        icon: 'flag'
      };
    }
    if (currentRoute.pid) {
      parentRoute = menus.find(menu => menu.id === currentRoute.pid);
    } else {
      parentRoute = currentRoute;
      currentRoute = null;
    }
    const themesTag = this.state.themes.map((v, i) => (
      <div className="pull-left y-center mr-m mb-s" key={i}>
        <i className={`w-24 mr-s b-a ${v.type}`}/>
        <Switch checked={v.checked} onChange={() => this.themeChange(v)}/>
      </div>
    ));
    return (
      <div className='bread'>
        <Breadcrumb>
          {this.getBreadcrumb(parentRoute)}
          {this.getBreadcrumb(currentRoute)}
        </Breadcrumb>
        {/*<div className={`switcher dark-white ${this.state.switcherOn ? 'active' : ''}`}>
          <a className="sw-btn dark-white" onClick={this.switcherOn}>
            <Icon type="setting" className="text-dark"/>
          </a>
          <div style={{ padding: '1rem' }} className="clear">
            {themesTag}
          </div>
        </div>*/}
        <style>{`
                    ${this.state.theme ?
          `
                    .custom-theme {
                        background: ${this.state.theme.header.background} !important;
                        color: #fff !important;
                    }
                    .custom-theme .ant-menu {
                        background: ${this.state.theme.header.background} !important;
                        color: #fff !important;
                    }
                    .custom-theme .ant-menu-item-group-title {
                        color: #fff !important;
                    }
                    ` : ''
          }
                `}</style>
      </div>
    );
  }
}

export default BreadcrumbCustom;
