// 常用方法
import classnames from 'classnames';
import lodash from 'lodash';
import config from '../config';
import request from './request';
import { color } from './theme';
import { isString, findIndex } from 'lodash';

// 获取url的参数
export const queryParse = (queryStr) => {
  if (!queryStr || !queryStr.trim()) {
    return {};
  }
  queryStr = queryStr.substring(queryStr.indexOf('?'));
  const search = queryStr.trim().substr(1);
  if (!search) {
    return {};
  }
  let query = {};
  const params = search.split('&');
  params.forEach((v) => {
    const param = v.split('=');
    if (!param[0] || !param[0].trim() || param[0].trim() === 'undefined') {
      return;
    }
    if (!query.hasOwnProperty(param[0])) {
      query[param[0]] = decodeURIComponent(param[1]);
    } else if (typeof query[param[0]] === 'string') {
      query[param[0]] = [query[param[0]], decodeURIComponent(param[1])];
    } else {
      query[param[0]].push(decodeURIComponent(param[1]));
    }
  });
  return query;
};
// 拼接url的参数
export const queryString = (query = {}) => {
  return Object.keys(query)
    .filter((key) => typeof query[key] !== 'undefined')
    .map((key) => `${key}=${query[key]}`)
    .join('&');
};

// 深拷贝(简单实现)
const stateCopy = (stateObj) => {
  return JSON.parse(JSON.stringify(stateObj));
};

// 中级 深拷贝
const cloneObj = function (obj) {
  let str;
  let newobj = obj.constructor === Array ? [] : {};
  if (typeof obj !== 'object') {
    return newobj;
  } else if (window.JSON) {
    str = JSON.stringify(obj); // 系列化对象
    newobj = JSON.parse(str); // 还原
  } else {
    for (let i in obj) {
      newobj[i] = typeof obj[i] === 'object' ?
        cloneObj(obj[i]) :
        obj[i];
    }
  }
  return newobj;
};

const hasString = (array, property, findString) => { // 检索数组, 检索属性, 检索值
  if (isString(findString)) {
    return findIndex(array, (o) => o[property] === findString); // True: 无 url; False: 有 url
  }
};

// 判断浏览器 版本
const myBrowser = () => {
  let userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
  let isOpera = userAgent.indexOf('Opera') > -1; // 判断是否Opera浏览器
  let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera; // 判断是否IE浏览器

  if (isIE) {
    let IE55 = false;
    let IE6 = false;
    let IE7 = false;
    let IE8 = false;

    let reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    let fIEVersion = parseFloat(RegExp['$1']);
    IE55 = fIEVersion === 5.5;
    IE6 = fIEVersion === 6.0;
    IE7 = fIEVersion === 7.0;
    IE8 = fIEVersion === 8.0;
    if (IE55) {
      return 'IE55';
    }
    if (IE6) {
      return 'IE6';
    }
    if (IE7) {
      return 'IE7';
    }
    if (IE8) {
      return 'IE8';
    }
  } // isIE end
};


// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase();
  });
};

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase();
};

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 * dateFormat(new Date(), 'yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
 * date Date日期 未用原型链，避免造成污染
 * format Date日期 未用原型链，避免造成污染
 * @param date
 * @returns {String}
 */
Date.prototype.format = (format) => {
  const formats = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear().toString()).substr(4 - RegExp.$1.length));
  }
  Object.keys(formats).forEach((key) => {
    if (new RegExp(`(${key})`).test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1)
        ? formats[key] : ((`00${formats[key]}`).substr((`${formats[key]}`).length)));
    }
    return false;
  });
  return format;
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
};

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null;
  }
  const item = array.filter(_ => _[keyAlias] === key);
  if (item.length) {
    return item[0];
  }
  return null;
};

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array);
  let result = [];
  let hash = {};
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach((item) => {
    let hashVP = hash[item[pid]];
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = []);
      hashVP[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
};

export {
  stateCopy,
  cloneObj,
  hasString,
  myBrowser,
  config,
  request,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
};
