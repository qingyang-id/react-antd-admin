/**
 * @description thrift mock接口
 * @author      yq
 * @date        2017-10-16 17:32:17
 */

import Mock from 'mockjs';
import { queryParse } from '../utils';
import {
  queryThriftsApi, queryThriftListApi, createThriftApi, updateThriftApi,
  updateThriftStatusApi, removeThriftApi, batchRemoveThriftApi,
} from '../config/api';

const listData = Mock.mock({
  'data|5-10': [
    {
      id: '@id',
      type: 1,
      thriftName: /^[a-zA-Z_0-9]+$/,
      serverPath: /^(\/[a-z]+)+$/,
      servicePath: /^(\/[a-z]+)+$/,
      lockPath: /^(\/[a-z]+)+$/,
      'status|1': [1, -1],
      updateTime: '@datetime',
      createTime: '@datetime',
    },
  ],
});


let database = listData.data;

const NOTFOUND = {
  code: 404,
  msg: 'thrift不存在',
};

export default () => {
  // 查询列表(含count)
  Mock.mock(new RegExp(queryThriftListApi.path), queryThriftListApi.method, (options) => {
    console.warn('\n\n\nThrift list 接口-----', options);
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
    const otherKeys = Object.keys(other);
    for (let i = 0; i < otherKeys.length; i += 1) {
      const key = otherKeys[i];
      newData = newData.filter((item) => {
        if (key === 'status') {
          return item.status.toString() === other[key];
        } if (key === 'keyword') {
          return item.thriftName.indexOf(other[key]) !== -1;
        } if (key === 'startTime') {
          const start = new Date(other[key]).getTime();
          const now = new Date(item.createTime).getTime();
          return now >= start;
        } if (key === 'endTime') {
          const end = new Date(other[key]).getTime();
          const now = new Date(item.createTime).getTime();
          return now <= end;
        }
        return true;
      });
    }

    if (sorts) {
      let newSorts = [];
      if (!Array.isArray(sorts)) {
        newSorts = [sorts];
      } else {
        newSorts = sorts;
      }
      for (let i = 0; i < newSorts.length; i += 1) {
        if (!newSorts[i]) continue;
        const sortArr = newSorts[i].split('_');
        newData = newData.sort((a, b) => {
          if (sortArr[0] === 'thriftName') {
            return sortArr[1] === 'desc'
              ? a[sortArr[0]] - b[sortArr[0]]
              : b[sortArr[0]] - a[sortArr[0]];
          }
          return sortArr[1] === 'asc'
            ? new Date(a[sortArr[0]]) - new Date(b[sortArr[0]])
            : new Date(b[sortArr[0]]) - new Date(a[sortArr[0]]);
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
  // Mock
  // 查询列表(不含count)
  Mock.mock(new RegExp(queryThriftsApi.path), queryThriftsApi.method, (options) => {
    console.log('1  Thrift list 不含count 接口-----', options);
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
    const otherKeys = Object.keys(other);
    for (let i = 0; i < otherKeys.length; i += 1) {
      const key = otherKeys[i];
      newData = newData.filter((item) => {
        if (key === 'status') {
          return item.status.toString() === other[key];
        } if (key === 'keyword') {
          return item.thriftName.indexOf(other[key]) !== -1;
        } if (key === 'startTime') {
          const start = new Date(other[key]).getTime();
          const now = new Date(item.createTime).getTime();
          return now >= start;
        } if (key === 'endTime') {
          const end = new Date(other[key]).getTime();
          const now = new Date(item.createTime).getTime();
          return now <= end;
        }
        return true;
      });
    }

    if (sorts) {
      let newSorts = [];
      if (!Array.isArray(sorts)) {
        newSorts = [sorts];
      } else {
        newSorts = sorts;
      }
      for (let i = 0; i < newSorts.length; i += 1) {
        if (!newSorts[i]) continue;
        const sortArr = newSorts[i].split('_');
        newData = newData.sort((a, b) => {
          if (sortArr[0] === 'thriftName') {
            return sortArr[1] === 'desc'
              ? a[sortArr[0]] - b[sortArr[0]]
              : b[sortArr[0]] - a[sortArr[0]];
          }
          return sortArr[1] === 'asc'
            ? new Date(a[sortArr[0]]) - new Date(b[sortArr[0]])
            : new Date(b[sortArr[0]]) - new Date(a[sortArr[0]]);
        });
      }
    }

    return ({
      code: 0,
      data: newData.slice((page - 1) * pageSize, page * pageSize),
    });
  });
  // 启停用
  Mock.mock(new RegExp(updateThriftStatusApi.path), updateThriftStatusApi.method, (options) => {
    console.log('启停用-----', options);
    let body = {};
    if (options.body) {
      try {
        body = JSON.parse(options.body);
      } catch (err) {
        console.error('parse body err', err);
        body = {};
      }
    }
    const { id, status } = body;
    const editItem = {
      id,
      status,
      updateTime: Mock.mock('@now'),
    };
    let isExist = false;
    database = database.map((item) => {
      if (item.id === id) {
        isExist = true;
        return Object.assign(item, editItem);
      }
      return item;
    });

    if (!isExist) {
      return NOTFOUND;
    }
    return ({
      code: 0,
      msg: '操作成功',
    });
  });

  // 修改api
  const updateThriftApiPattern = new RegExp(updateThriftApi.path.replace(':id', '\\d*'));
  Mock.mock(updateThriftApiPattern, updateThriftApi.method, (options) => {
    console.log('thrift 修改接口-----', options);
    let body = {};
    if (options.body) {
      try {
        body = JSON.parse(options.body);
      } catch (err) {
        console.error('parse body err', err);
        body = {};
      }
    }
    const {
      thriftName, serverPath, servicePath, lockPath,
    } = body;
    const editItem = {
      thriftName,
      serverPath,
      servicePath,
      lockPath,
      updateTime: Mock.mock('@now'),
    };
    const id = options.url.match('[0-9]+$')[0];
    let isExist = false;
    let repeatData;
    database = database.map((item) => {
      if (item.id === id) {
        isExist = true;
        return Object.assign(item, editItem);
      }
      if (item.id !== id && item.thriftName === thriftName) {
        repeatData = item;
      }
      return item;
    });

    if (!isExist) {
      return NOTFOUND;
    }
    if (repeatData) {
      return {
        code: 1001,
        msg: `与已有接口(${item.path} ${item.method.toUpperCase()})重复`,
        data: repeatData,
      };
    }
    return ({
      code: 0,
      msg: '操作成功',
    });
  });
  // 增加api
  Mock.mock(new RegExp(createThriftApi.path), createThriftApi.method, (options) => {
    console.log('thrift 新增接口-----', options);
    let body = {};
    if (options.body) {
      try {
        body = JSON.parse(options.body);
      } catch (err) {
        console.error('parse body err', err);
        body = {};
      }
    }
    const newData = body;
    const oldApi = database.find(item => (item.thriftName === newData.thriftName));
    if (oldApi) {
      return {
        code: 101,
        msg: `thrif(${item.thriftName})已存在`,
        data: oldApi,
      };
    }
    const time = Mock.mock('@now');
    Object.assign(newData, {
      id: Mock.mock('@id'),
      status: 1,
      updateTime: time,
      createTime: time,
    });
    database.unshift(newData);
    return ({
      code: 0,
      msg: '操作成功',
    });
  });
  // 删除
  const removeThriftApiPattern = new RegExp(removeThriftApi.path.replace(':id', '\\d*'));
  Mock.mock(removeThriftApiPattern, removeThriftApi.method, (options) => {
    console.log('api 删除接口-----', options);
    const id = options.url.match('[0-9]+$')[0];
    database = database.filter(item => item.id !== id);
    return ({
      code: 0,
      msg: '操作成功',
    });
  });
  // 批量删除api
  Mock.mock(new RegExp(batchRemoveThriftApi.path), batchRemoveThriftApi.method, (options) => {
    console.log('批量删除接口-----', options);
    let body = {};
    if (options.body) {
      try {
        body = JSON.parse(options.body);
      } catch (err) {
        console.error('parse body err', err);
        body = {};
      }
    }
    const { ids } = body;
    database = database.filter(item => !ids.includes(item.id));
    return ({
      code: 0,
      msg: '操作成功',
    });
  });
};
