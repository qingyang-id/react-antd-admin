import React from 'react';
import { Table } from 'antd';
import './List.less';

const List = ({ ...tableProps }) => {
  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 64,
      render: (text, record, index) => ((tableProps.pagination.current - 1)
        * tableProps.pagination.pageSize + index + 1),
    },
    {
      title: '文件名称',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: '文件大小(k)',
      dataIndex: 'size',
      key: 'size',
      sorter: true,
      render: text => (text && parseFloat((text / 1024).toFixed(3))) || 0,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      sorter: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: true,
    },
  ];

  return (
    <div>
      <Table
        {...tableProps}
        className="table"
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
