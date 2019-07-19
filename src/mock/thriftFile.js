/**
 * @description thrift文件mock模拟接口
 * @author      yq
 * @date        2017-10-19 14:24:13
 */

import Mock from 'mockjs';
import { queryParse } from '../utils';
import { queryThriftFileListApi, uploadThriftFileApi } from '../config/api';

const listData = Mock.mock({
  'data|20-50': [
    {
      id: '@id',
      name: /^[a-zA-Z]+$/,
      'size|500-2000': 1,
      updateTime: '@datetime',
      createTime: '@datetime',
    },
  ],
});


const database = listData.data;

export default () => {
  // 查询列表(含count)
  Mock.mock(new RegExp(queryThriftFileListApi.path), queryThriftFileListApi.method, (options) => {
    console.warn('\n\n\nThrift file list 接口-----', options);
    let query = {};
    if (options.url) {
      try {
        query = queryParse(options.url);
      } catch (err) {
        console.error('parse query err', err);
        query = {};
      }
    }
    let {
      pageSize, page, sorts, ...other
    } = query;
    pageSize = pageSize || 10;
    page = page || 1;
    let newData = database;
    Object.keys(other)
      .forEach((key) => {
        newData = newData.filter((item) => {
          if (key === 'keyword' && other[key]) {
            // 关键字筛选
            return item.name.toLowerCase().includes(other[key].toLowerCase());
          } if (key === 'startTime' && other[key]) {
            // 开始时间筛选
            return new Date(item.createTime) >= new Date(other[key]);
          } if (key === 'endTime' && other[key]) {
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
          switch (sortArr[0]) {
            case 'name': {
              if (isDesc) return a[sortArr[0]] < b[sortArr[0]] ? 1 : -1;
              return a[sortArr[0]] > b[sortArr[0]] ? 1 : -1;
            }
            case 'size': {
              if (isDesc) return b[sortArr[0]] - a[sortArr[0]];
              return a[sortArr[0]] - b[sortArr[0]];
            }
            default:
              if (isDesc) return new Date(b[sortArr[0]]) - new Date(a[sortArr[0]]);
              return new Date(a[sortArr[0]]) - new Date(b[sortArr[0]]);
          }
        });
      }
    }
    return ({
      code: 0,
      data: {
        list: newData.slice((page - 1) * pageSize, page * pageSize),
        total: newData.length,
      },
    });
  });
  // 上传文件api
  Mock.mock(new RegExp(uploadThriftFileApi.path), uploadThriftFileApi.method, (options) => {
    console.log('上传thrift文件接口-----', options);
    let body = {};
    if (options.body) {
      try {
        body = JSON.parse(options.body);
      } catch (err) {
        console.error('parse body err', err);
        body = {};
      }
    }
    const time = Mock.mock('@now');
    const newData = {
      id: Mock.mock('@id'),
      name: body.fileName || Mock.mock('@name'),
      updateTime: time,
      createTime: time,
    };
    database.unshift(newData);
    return ({
      code: 0,
      msg: '操作成功',
    });
  });
};
