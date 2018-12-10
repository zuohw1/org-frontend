import React from 'react';
import {
  Form,
  Input,
  DatePicker, Radio, Row, Col, Button, Modal, Select,
} from 'antd';
import moment from 'moment';
import AttachTable from './attach-table';
import SearchTable from '../../../components/search-table';

const FormItem = Form.Item;
const { Option } = Select;

const ApprovalCard = (state) => {
  const {
    form, record, refModal, refSelectData, actions, noticeList,
  } = state;
  const { getFieldDecorator } = form;
  const {
    setRefModeShow, setRefSelectData, setRecord, updateRecord,
  } = actions;

  const onClickNext = () => {
    form.validateFields((err, values) => {
      if (!err) {
        updateRecord(values);
        form.resetFields();
      }
    });
  };
  const onClickReturn = () => {
    state.history.goBack(-1);
  };

  const apply = (item) => {
    return (<Option value={item.id} key={item.id}> {item.title} </Option>);
  };

  const onRefSubmit = (e) => {
    e.preventDefault();
    refSelectData.DOC_DATE = moment(refSelectData.DOC_DATE, 'YYYY/MM/DD');
    form.setFieldsValue(refSelectData);
    setRefModeShow(false);
  };

  const onConfirm = () => {
    form.setFieldsValue(refSelectData);
    refSelectData.DOC_DATE = moment(refSelectData.DOC_DATE, 'YYYY/MM/DD');
    form.setFieldsValue(refSelectData);
    setRefModeShow(false);
  };

  const onRefCancel = (e) => {
    e.preventDefault();
    setRefSelectData(null, false);
  };

  const onRadioChange = (e) => {
    record.ATTRIBUTE5 = e.target.value;
    if (e.target.value === 'Y') {
      setRefModeShow(true);
    } else {
      record.BATCH_HEADER_ID = '';
      setRecord(record);
    }
  };

  const refUrl = 'orgHeaderBatch/selectListByEmNum';
  const refCodes = [{ code: 'DOC_CODE', refcode: 'DOC_CODE' },
    { code: 'DOC_VERIFIER', refcode: 'DOC_VERIFIER' },
    { code: 'DOC_DATE', refcode: 'DOC_DATE' },
    { code: 'BATCH_HEADER_ID', refcode: 'BATCH_HEADER_ID' },
    { code: 'DOC_SUBJECT', refcode: 'DOC_SUBJECT' }];
  const refColumns = [{
    title: '文件名称和文号',
    dataIndex: 'DOC_CODE',
    key: 'DOC_CODE',
    align: 'center',
    width: 200,
  }, {
    title: '文件印发日期',
    dataIndex: 'DOC_DATE',
    key: 'DOC_DATE',
    align: 'center',
    width: 150,
  }, {
    title: '文件拟稿人',
    dataIndex: 'DOC_VERIFIER',
    key: 'DOC_VERIFIER',
    align: 'center',
    width: 150,
  }, {
    title: '组织变更主要内容',
    dataIndex: 'DOC_SUBJECT',
    key: 'DOC_SUBJECT',
    align: 'center',
    width: 200,
  }];
  const rowSelection = {
    columnWidth: '30',
    type: 'radio',
  };

  return (
    <div>
      <Modal
        title="参照"
        visible={refModal}
        maskClosable={false}
        destroyOnClose
        onOk={onRefSubmit}
        onCancel={onRefCancel}
        width={700}
      >
        <SearchTable
          columns={refColumns}
          refUrl={refUrl}
          refCodes={refCodes}
          refSelectData={refSelectData}
          rowSelection={rowSelection}
          onConfirm={onConfirm}
        />
      </Modal>
      <Form>
        <Row type="flex">
          <Col span={24} style={{ display: 'block' }}>
            <FormItem>
              {getFieldDecorator('ATTRIBUTE5', {
                initialValue: record.ATTRIBUTE5 ? record.ATTRIBUTE5 : 'N',
              })(
                <Radio.Group onChange={onRadioChange}>
                  <Radio value="Y">有批文的组织变更业务</Radio>
                  <Radio value="N">无批文组织变更业务</Radio>
                </Radio.Group>,
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ display: 'block' }}>
            <FormItem
              label={record.ATTRIBUTE5 === 'Y' ? '批文编号' : '依据编号'}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('DOC_CODE', {
                initialValue: record.DOC_CODE ? record.DOC_CODE : '',
                rules: [{ required: true, whitespace: true, message: '请输入名称' }],
              })(
                <Input />,
              )}
            </FormItem>
          </Col>
          {getFieldDecorator('BATCH_HEADER_ID', {
            initialValue: record.BATCH_HEADER_ID ? record.BATCH_HEADER_ID : '',
          })(
            <Input type="hidden" />,
          )}
          <Col span={8} style={{ display: 'block' }}>
            <FormItem label={record.ATTRIBUTE5 === 'Y' ? '批文日期' : '日期'} labelCol={{ span: 8 }}>
              {getFieldDecorator('DOC_DATE', {
                initialValue: record.DOC_DATE ? moment(record.DOC_DATE, 'YYYY/MM/DD') : moment(),
                rules: [{
                  required: true,
                  message: '不能为空!',
                }],
              })(
                <DatePicker />,
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ display: 'block' }}>
            <FormItem
              label={record.ATTRIBUTE5 === 'Y' ? '批文校验人' : '审批者'}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('DOC_VERIFIER', {
                initialValue: record.DOC_VERIFIER ? record.DOC_VERIFIER : '',
                rules: [{ required: true, whitespace: true, message: '请输入名称' }],
              })(
                <Input />,
              )}
            </FormItem>
          </Col>
          <Col span={24} style={{ display: 'block' }}>
            <FormItem label="主题">
              {getFieldDecorator('DOC_SUBJECT', {
                initialValue: record.DOC_SUBJECT ? record.DOC_SUBJECT : '',
                rules: [{ whitespace: true, message: '请输入主题' }],
              })(<Input.TextArea rows={2} />)}
            </FormItem>
          </Col>
          <Col span={8} style={{ display: 'block' }}>
            <FormItem
              label="通知单"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('notice')(
                <Select placeholder="请选择" allowClear>
                  {
                    noticeList.map(apply)
                  }
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AttachTable attachData={record.attachData} />
      <div style={{ textAlign: 'right' }}>
        <Button
          onClick={onClickNext}
          style={{ margin: '50px 20px 0px 0px' }}
        >下一步
        </Button>
        <Button
          onClick={onClickReturn}
          style={{ margin: '50px 20px 0px 0px' }}
        >返回
        </Button>
      </div>
    </div>
  );
};

export default ApprovalCard;
