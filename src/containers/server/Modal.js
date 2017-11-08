import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Upload, Icon, message } from 'antd';

class UploadModal extends React.Component {
  state = {
    fileList: [],
  }

  handleChange = ({ file, fileList }) => {
    // 保留一条上传记录
    fileList = fileList.slice(-1);
    this.setState({ fileList });
  }

  render() {
    const { onOk, updateFileList, ...modalProps } = this.props;
    const modalOpts = {
      ...modalProps,
      onOk() {
        message.warn('请选择文件');
      },
    };
    const that = this;
    const uploadOpts = {
      accept: '.thrift',
      onChange: this.handleChange,
      customRequest(opts) {
        const formData = new FormData();
        formData.append('file', opts.file);
        that.props.onOk({
          data: formData,
          // 进度条
          onUploadProgress(eventProgress) {
            if (eventProgress.lengthComputable) {
                eventProgress.percent = eventProgress.loaded / eventProgress.total * 100;
            }
            opts.onProgress(eventProgress);
          },
        });
      },
    };
    return (
      <Modal {...modalOpts}>
          <div style={{ marginTop: 16, marginBottom:20, height: 180, backgroundColor: '#fafafa' }}>
            <Upload.Dragger {...uploadOpts} fileList={this.state.fileList}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击选择或将文件拖拽至此处</p>
              <p className="ant-upload-hint">暂时只支持单文件上传</p>
            </Upload.Dragger>
          </div>
      </Modal>
    );
  }
}

UploadModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  onOk: PropTypes.func,
};

export default Form.create()(UploadModal);
