import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Popconfirm } from 'antd';
import { bindActionCreators } from 'redux';
import List from './List';
import Filter from './Filter';
import Modal from './Modal';
import { query, remove, multiDelete, create,
  update, hideModal, showModal, updateState, switchIsMotion, } from '../../redux/actions/user';

class Api extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleDeleteItems() {
    this.props.multiDelete({
        ids: this.selectedRowKeys,
    });
  };
  render() {
    const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = this.props.user;
    const that = this;
    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      // confirmLoading: loading.effects['user/update'],
      title: `${modalType === 'create' ? 'Create Api' : 'Update Api'}`,
      wrapClassName: 'vertical-center-modal',
      onOk(data) {
        console.log('onOk', data);
        switch (modalType) {
          case 'create':
            that.props.create(data);
            break;
          case 'update':
            that.props.update(date);
            break;
          default:
        }
      },
      onCancel() {
        console.log('onCancel');
        that.props.hideModal();
      },
    };

    const listProps = {
      location: {
        query: '',
        pagination,
      },
      dataSource: list,
      loading: false,
      list: [],
      pagination,
      isMotion,
      onChange(page) {
        console.log('onChange  ', page);
        that.props.updateState({
          list: [],
          page: 1,
          pageSize: 15,
        })
        // const { query, pathname } = location;
        // dispatch(routerRedux.push({
        //   pathname,
        //   query: {
        //     ...query,
        //     page: page.current,
        //     pageSize: page.pageSize,
        //   },
        // }));
      },
      onDeleteItem(id) {
        console.log('onDeleteItem   ', id);
        that.props.remove({
          id
        });
      },
      onEditItem(item) {
        console.log('onEditItem', item);
        that.props.showModal({
          modalType: 'update',
          currentItem: item,
        })
        // dispatch({
        //   type: 'user/showModal',
        //   payload: {
        //     modalType: 'update',
        //     currentItem: item,
        //   },
        // });
      },
      rowSelection: {
        selectedRowKeys: this.props.user.selectedRowKeys,
        onChange: (keys) => {
          that.props.updateState({
            selectedRowKeys: keys,
          })
        },
      },
    };

    const filterProps = {
      isMotion,
      filter: {
        // ...location.query,
      },
      onFilterChange(value) {
        console.log('onFilterChange ', value);
        that.props.updateState({
          list: [],
          page: 1,
          pageSize: 15,
        })
        // dispatch(routerRedux.push({
        //   pathname: location.pathname,
        //   query: {
        //     ...value,
        //     page: 1,
        //     pageSize,
        //   },
        // }));
      },
      onSearch(fieldsValue = {}) {
        console.log('onSearch', fieldsValue);
        updateState({
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
          list: [],
          page: 1,
          pageSize: 15,
        })
        // fieldsValue.keyword.length ? dispatch(routerRedux.push({
        //   pathname: '/user',
        //   query: {
        //     field: fieldsValue.field,
        //     keyword: fieldsValue.keyword,
        //   },
        // })) : dispatch(routerRedux.push({
        //   pathname: '/user',
        // }));
      },
      onAdd() {
        console.log('onAdd');
        that.props.showModal({
          modalType: 'create',
        })
        // dispatch({
        //   type: 'user/showModal',
        //   payload: {
        //     modalType: 'create',
        //   },
        // });
      },
      switchIsMotion() {
        console.log('switchIsMotion');
        that.props.switchIsMotion();
        // dispatch({ type: 'user/switchIsMotion' });
      },
    };

    return (
      <div className="content-inner">
        <Filter {...filterProps} />
        {
          selectedRowKeys.length > 0 &&
          <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
            <Col>
              {`Selected ${selectedRowKeys.length} items `}
              <Popconfirm title={'Are you sure delete these items?'} placement="left" onConfirm={handleDeleteItems}>
                <Button type="primary" size="large" style={{ marginLeft: 8 }}>Remove</Button>
              </Popconfirm>
            </Col>
          </Row>
        }
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps} />}
      </div>
    );
  }
};

const mapStateToProps = state => {
  const user = state.userReducer;
  return { user, };
};
const mapDispatchToProps = dispatch => ({
  remove: bindActionCreators(remove, dispatch),
  multiDelete: bindActionCreators(multiDelete, dispatch),
  query: bindActionCreators(query, dispatch),
  create: bindActionCreators(create, dispatch),
  update: bindActionCreators(update, dispatch),
  updateState: bindActionCreators(updateState, dispatch),
  showModal: bindActionCreators(showModal, dispatch),
  hideModal: bindActionCreators(hideModal, dispatch),
  switchIsMotion: bindActionCreators(switchIsMotion, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Api);
