import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FilterItem } from '../../components/base';
import { Form, Button, Modal, Row, Col, DatePicker, Input, } from 'antd';

const Search = Input.Search;
const { RangePicker } = DatePicker;

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
};

const TwoColProps = {
  ...ColProps,
  xl: 96,
};

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    // 为了重置表单，未找到更好的方案
    if (Object.keys(this.props.filter).length && !Object.keys(nextProps.filter).length) {
      this.handleReset();
    }
  }
  handleFields = (fields) => {
    const { createTime } = fields;
    if (createTime.length) {
      fields.startTime = createTime[0].format('YYYY-MM-DD 00:00:00');
      fields.endTime = createTime[1].format('YYYY-MM-DD 23:59:59');
    }
    delete fields.createTime;
    return fields;
  };

  handleSubmit = () => {
    let fields = this.props.form.getFieldsValue();
    fields = this.handleFields(fields);
    this.props.onFilterChange(fields);
  };

  handleReset = (fresh) => {
    const fields = this.props.form.getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = [];
        } else {
          fields[item] = undefined;
        }
      }
    }
    this.props.form.setFieldsValue(fields);
    if (fresh) this.handleSubmit();
  };

  handleChange = (key, values) => {
    let fields = this.props.form.getFieldsValue();
    fields[key] = values;
    fields = this.handleFields(fields);
    this.props.onFilterChange(fields);
  };

  restartApi = () => {
    const that = this;
    Modal.confirm({
        title: '重启过程中当前系统不可用，确定重启吗?',
        onOk() {
          that.props.restartApiServer();
        },
      });
  };

  render() {
    const { startTime, endTime } = this.props.filter;
    const { getFieldDecorator, } = this.props.form;
    let initialCreateTime = [];
    if (startTime) {
      initialCreateTime[0] = moment(startTime);
    }
    if (endTime) {
      initialCreateTime[1] = moment(endTime);
    }
    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('keyword', { initialValue: this.props.filter.keyword })(
            <Search placeholder="用户id/账号" size="large" onSearch={this.handleSubmit}/>
          )}
        </Col>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 16 }} sm={{ span: 12 }}>
          <FilterItem label="创建时间">
            {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
              <RangePicker style={{ width: '100%' }} size="large"
                           onChange={this.handleChange.bind(this, 'createTime')}/>
            )}
          </FilterItem>
        </Col>
        <Col {...TwoColProps} xl={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div>
              <Button type="primary" size="large" className="margin-right" onClick={this.handleSubmit}>搜索</Button>
              <Button size="large" onClick={this.handleReset.bind(this, true)}>重置</Button>
            </div>
            <div>
              <Button size="large" type="danger" loading={this.props.restartLoading}
                icon='reload' onClick={this.restartApi}>重启服务</Button>
            </div>
          </div>
        </Col>
      </Row>
    );
  };
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
};

export default Form.create()(Filter);
