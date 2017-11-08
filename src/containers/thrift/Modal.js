import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const modal = ({
                 item = {
                   method: 'get',
                   role: 1,
                 },
                 onOk,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   setFieldsValue,
                   getFieldsValue,
                   getFieldValue,
                 },
                 ...modalProps
               }) => {
  const handleChange = (key) => {
    const value = getFieldValue(key);
    if (key === 'thriftName' && value) {
      const fields = {
        serverPath: `/rpccenter/zlthrift-${value}/cluster`,
        servicePath: `/rpccenter/zlthrift-${value}/service-class`,
        lockPath: `/rpccenter/zlthrift-${value}/lock-conn`
      }
      setFieldsValue(fields);
    }
  }

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      };
      onOk(data);
    });
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="thrift名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('thriftName', {
            initialValue: item.thriftName,
            rules: [
              {
                required: true,
                message: 'thrift名称不能为空',
              },
              {
                pattern: /^[a-zA-Z-_0-9]+$/,
                message: 'thrift名称不正确',
              },
            ],
          })(<Input onKeyUp={handleChange.bind(this, 'thriftName')}/>)}
        </FormItem>
        <FormItem label="主机节点" hasFeedback {...formItemLayout}>
          {getFieldDecorator('serverPath', {
            initialValue: item.serverPath,
            rules: [
              {
                required: true,
                message: '主机节点不能为空',
              },
              {
                pattern: /^(\/[a-zA-Z-_0-9]+)+$/,
                message: '主机节点不正确',
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem label="服务节点" hasFeedback {...formItemLayout}>
          {getFieldDecorator('servicePath', {
            initialValue: item.servicePath,
            rules: [
              {
                required: true,
                message: '服务节点不能为空',
              },
              {
                pattern: /^(\/[a-zA-Z-_0-9]+)+$/,
                message: '服务节点不正确',
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem label="锁节点" hasFeedback {...formItemLayout}>
          {getFieldDecorator('lockPath', {
            initialValue: item.lockPath,
            rules: [
              {
                required: true,
                message: '锁节点不能为空',
              },
              {
                pattern: /^(\/[a-zA-Z-_0-9]+)+$/,
                message: '锁节点不正确',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
};

export default Form.create()(modal);
