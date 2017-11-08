import React from 'react';
import { Table, } from 'antd';
import './List.less';

const List = ({ ...tableProps }) => {

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 64,
      render: (text, record, index) =>
        ((tableProps.pagination.current - 1) * tableProps.pagination.pageSize + index + 1)
    },
    {
      title: '用户id',
      dataIndex: 'uid',
      key: 'uid',
    },
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: true,
    },
  ];

  return (
    <div>
      <Table
        {...tableProps}
        className='table'
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    </div>
  );
};

export default List;
