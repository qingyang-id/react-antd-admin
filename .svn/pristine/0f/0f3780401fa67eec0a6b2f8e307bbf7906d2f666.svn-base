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

const upadatePasswordModal = ({ onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
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
        <FormItem label="原密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('oldPassword', {
            rules: [
              {
                required: true,
                message: '请输入原密码',
              },
            ],
          })(<Input type='password'/>)}
        </FormItem>
        <FormItem label="新密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('newPassword', {
            rules: [
              {
                required: true,
                message: '请输入新密码',
              },
              {
                pattern: /^[0-9a-zA-Z_-]{6,18}$/,
                message: '请输入6-18位字母、数字、下划线组合',
              },
            ],
          })(<Input type='password'/>)}
        </FormItem>
      </Form>
    </Modal>
  );
};

upadatePasswordModal.propTypes = {
  form: PropTypes.object.isRequired,
  onOk: PropTypes.func,
};

export default Form.create()(upadatePasswordModal);
