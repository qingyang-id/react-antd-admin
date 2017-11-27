const APIV1 = '/t/v1';
const APIV2 = '/t/v2';

const Main = {
  target: process.env.NODE_ENV !== 'production' ? 'http://www.admin.com' : 'http://www.admin.com', //目标网站
  name: 'Api Admin',
  prefix: 'apiAdmin',
  footerText: 'Ant Design Admin 版权所有 © 2017 由 Sailor20 支持',
  logoSrc: 'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg',
  logoText: 'Api Admin',
  needLogin: true,
  code: {
    success: 0,
  },
  message: { // 提示信息
    usernameInput: '请输入用户名',
    usernameEng: '用户名必须是字母',
    passwordInput: '请输入密码',
    loginError: '用户名或者密码错误!'
  },
  localKey: { // 本地存储Key
    userToken: 'USER_AUTHORIZATION'
  },

  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
  /**
   * 只能输入英文
   *
   * @param {any} str
   * @returns
   */
  checkEng(str) {
    var reg = new RegExp(/^[A-Za-z]+$/);
    return str && reg.test(str);
  },
  /**
   * 参数格式化
   *
   * @param {any} data
   * @returns
   */
  paramFormat(data) {
    let paramArr = [];
    let paramStr = '';
    for (let attr in data) {
      paramArr.push(attr + '=' + data[attr]);
    }
    paramStr = paramArr.join('&');
    return paramStr ? '?' + paramStr : paramStr;
  },
  /**
   * 本地数据存储或读取
   *
   * @param {any} key
   * @param {any} value
   * @returns
   */
  localItem(key, value) {
    if (arguments.length == 1) {
      return localStorage.getItem(key) && localStorage.getItem(key) !== 'null' ? localStorage.getItem(key) : null;
    } else {
      return localStorage.setItem(key, value);
    }
  },
  /**
   * 删除本地数据
   *
   * @param {any} k
   * @returns
   */
  removeLocalItem(key) {
    if (arguments.length == 1) {
      return localStorage.removeItem(key);
    } else {
      return localStorage.clear();
    }
  }
};
let apiHost = 'http://m.test.admin.com';
let docHost = 'http://doc.admin.com';
let ossHost = 'http://admin.oss-cn-hangzhou.aliyuncs.com';

switch (process.env.NODE_ENV) {
  case 'production':
    apiHost = 'http://m.admin.com';
    docHost = 'http://doc.admin.com';
    ossHost = 'http://admin.oss-cn-hangzhou.aliyuncs.com';
    break;
  case 'test':
    apiHost = 'http://m.test.admin.com';
    docHost = 'http://doc.admin.com';
    ossHost = 'http://admin.oss-cn-hangzhou.aliyuncs.com';
    break;
  default:
    apiHost = 'http://m.test.admin.com';
    docHost = 'http://doc.admin.com';
    ossHost = 'http://admin.oss-cn-hangzhou.aliyuncs.com';
}
export { apiHost, docHost, ossHost };
export const platform = 'system';
export const version = '1.0.0';
export const tokenKey = 'API-ADMIN-TOKEN';
export const userKey = 'API-ADMIN-USER';
export const systemPrefix = 'API-ADMIN';
export const logoSrc = 'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg';
export const logoText = 'Api Admin';
export const apiPrefix = '/t/v1';
export default Main;
