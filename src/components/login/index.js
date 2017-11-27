import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal, Form, Input, Checkbox, Icon } from 'antd';
import { logoSrc, logoText } from '../../config';
import { bindActionCreators } from 'redux';
import { login, } from '../../redux/actions/user';

import './index.less';

const FormItem = Form.Item;
// 写法一，下方有非注解写法
@connect(
  state => {
    return {
      userReducer: state.userReducer,
      loading: state.appReducer.loading,
    };
  },
  dispatch => bindActionCreators({ login, }, dispatch)
)
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  info = ({ title = '提示信息', messages = ['请联系管理员', '修改密码'] }) => {
    const messageDoms = messages.map((message) => (<p>{message}</p>));
    Modal.info({
      title,
      content: (
        <div>
          {messageDoms}
        </div>
      ),
      onOk() {
      }
    });
  };

  // 此法保持作用域，调用时无需绑定作用域
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('\n\n\nReceived values of form: ', values);
        this.props.login(values);
      }
    });
  };

  render() {
    const { getFieldDecorator, } = this.props.form;
    return (
      <div className='form'>
        <div className='logo'>
          <img alt={'logo'} src={logoSrc}/>
          <span>{logoText}</span>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem hasFeedback>
            {getFieldDecorator('account', {
              rules: [
                {
                  required: true,
                  message: '请输入账号'
                },
              ],
            })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
             size="large" placeholder="管理员输入admin, 游客输入guest"/>)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码'
                },
              ],
            })(<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
             size="large" type="password" placeholder="密码：123456" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <a className="login-form-forgot" onClick={this.info} style={{ float: 'right' }}>忘记密码</a>
            <Button type="primary" htmlType="submit" size="large" onClick={this.handleSubmit}
              className="login-form-button" loading={this.props.loading}>
              登录
            </Button>
            或 <a onClick={this.info.bind(this, { title: '提示信息', messages: ['请联系管理员', '申请开通账号'] })}>现在就去注册!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  form: PropTypes.object,
};

// 写法二，我采用了顶部注解的方式

// const mapStateToProps = state => {
//   const userReducer = state.userReducer;
//   return { userReducer, };
// };
// const mapDispatchToProps = dispatch => ({
//   login: bindActionCreators(login, dispatch),
//   showLoginLoading: bindActionCreators(showLoginLoading, dispatch),
//   hideLoginLoading: bindActionCreators(hideLoginLoading, dispatch),
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));
export default Form.create()(Login);
