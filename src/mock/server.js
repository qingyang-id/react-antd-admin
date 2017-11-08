/**
 * @description 服务管理模拟接口
 * @author      yq
 * @date        2017-10-19 14:33:12
 */
import Mock from 'mockjs';
import { queryParse } from '../utils';
import { queryRestartApiLogListApi, restartApiServerApi, } from '../config/api';

const listData = Mock.mock({
  'data|20-50': [
    {
      id: '@id',
      'uid|500-2000': 1,
      account: /^[a-z]{6,10}$/,
      createTime: '@datetime',
    },
  ],
});


let database = listData.data;

export default () => {
  // 查询列表(含count)
  Mock.mock(new RegExp(queryRestartApiLogListApi.path), queryRestartApiLogListApi.method, (options) => {
    console.warn('获取 api重启日志 接口-----', options);
    let query = {};
    if (options.url) {
      try {
        query = queryParse(options.url);
      } catch (err) {
        console.error('parse query err', err);
        query = {};
      }
    }
    let { pageSize, page, sorts, ...other } = query;
    pageSize = pageSize || 10;
    page = page || 1;
    let newData = database;
    Object.keys(other)
      .forEach((key) => {
        newData = newData.filter((item) => {
          if (key === 'keyword' && other[key]) {
            // 关键字筛选
            return item.uid.toString().toLowerCase().includes(other[key].toLowerCase())
              || item.account.toLowerCase().includes(other[key].toLowerCase());
          } else if (key === 'startTime' && other[key]) {
            // 开始时间筛选
            return new Date(item.createTime) >= new Date(other[key]);
          } else if (key === 'endTime' && other[key]) {
            // 截止时间筛选
            return new Date(item.createTime) <= new Date(other[key]);
          }
          return true;
        });
      });
    // 排序
    if (sorts) {
      let newSorts = [];
      if (!Array.isArray(sorts)) {
        newSorts = [sorts];
      } else {
        newSorts = sorts;
      }
      // 排序
      for (let i = 0; i < newSorts.length; i += 1) {
        if (!newSorts[i]) continue;
        const sortArr = newSorts[i].split('_');
        const isDesc = sortArr[1] === 'desc';
        newData.sort((a, b) => {
          if (isDesc) return new Date(b[sortArr[0]]) - new Date(a[sortArr[0]]);
          return new Date(a[sortArr[0]]) - new Date(b[sortArr[0]]);
        });
      }
    }
    return ({
      code: 0,
      data: {
        list: newData.slice((page - 1) * pageSize, page * pageSize),
        total: newData.length,
      }
    });
  });
  // 重启api服务
  Mock.mock(new RegExp(restartApiServerApi.path), restartApiServerApi.method, (options) => {
    return ({
      code: 0,
      msg: '操作成功',
    });
  });
};
