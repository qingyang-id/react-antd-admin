import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Icon } from 'antd';
import { DropOption } from '../../components/base';
import './List.less';

const confirm = Modal.confirm;

/**
 * 格式化状态
 * @param status
 * @returns {*}
 */
function formatStatus(status = 0) {
  switch(status) {
    case 1:
      return <Icon type="check-circle-o" style={{ fontSize: 16, fontWeight: 'bold', color: '#6cc788' }}/>;
    case -1:
      return <Icon type="close-circle-o" style={{ fontSize: 16, fontWeight: 'bold', color: '#f44455' }}/>;
    case -10:
      return <Icon type="delete" style={{ fontSize: 16, fontWeight: 'bold', color: '#424242' }}/>;
    default:
      return '-';
  }
}

const List = ({ updateItemStatus, onDeleteItem, onEditItem, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record);
    } else if (e.key === '2') {
      // 启停用
      confirm({
        title: record.status === 1 ? '确定禁用吗?' : '确定启用吗?',
        onOk() {
          updateItemStatus({
            id: record.id,
            status: record.status === 1 ? -1 : 1,
          });
        },
      });
    } else if (e.key === '3') {
      confirm({
        title: '确定删除吗?',
        onOk() {
          onDeleteItem(record.id);
        },
      });
    }
  };

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 64,
      sorter: true,
      // sortOrder: 'descend'
    },
    {
      title: '接口路径',
      dataIndex: 'path',
      key: 'path',
      sorter: true,
      render: (text, record) => record.docUrl ? <a href={`${record.docUrl}`} target='_blank'>{text}</a>
        : text,
    },
    {
      title: '请求方式',
      dataIndex: 'method',
      key: 'method',
      render: text => (<span>{text && text.toUpperCase()}</span>),
    },
    {
      title: 'thrift名称',
      dataIndex: 'thriftName',
      key: 'thriftName',
    },
    {
      title: 'thrift服务名称',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: '方法名称',
      dataIndex: 'actionName',
      key: 'actionName',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: text => (<span>{text === 1
        ? '登录'
        : '-'}</span>),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: text => (<span>{formatStatus(text)}</span>),
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
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)}
                           menuOptions={[{
                            key: '1',
                            name: '修改'
                          }, {
                            key: '2',
                            name: (record.status === 1) ? '禁用' : '启用'
                          }]}/>;
      },
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

List.propTypes = {
  updateItemStatus: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

export default List;
