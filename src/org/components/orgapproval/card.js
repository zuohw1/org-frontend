/* eslint-disable no-param-reassign */
import React from 'react';
import {
  Col, DatePicker, Form, Input, Radio, Row,
} from 'antd';
import moment from 'moment';
import AttachTable from './attach-table';
import SearchTable from '../../../components/search-table';

const FormItem = Form.Item;

export default ({
  record,
  form,
  actions,
  formEdit,
  refModal,
}) => {
  const { getFieldDecorator } = form;

  const { setRefModeShow } = actions;

  const onRadioChange = (e) => {
    record.ATTRIBUTE5 = e.target.value;
    if (e.target.value === 'Y') {
      setRefModeShow(true);
    }
  };

  const refCodes = [{ code: 'DOC_CODE', refcode: 'docCode' }, { code: 'DOC_VERIFIER', refcode: 'docVerifier' }];
  const refColumns = [{
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    align: 'center',
    width: '12%',
  }, {
    title: '文件名称和文号',
    dataIndex: 'docCode',
    key: 'docCode',
    align: 'center',
  }, {
    title: '文件拟稿人',
    dataIndex: 'docVerifier',
    key: 'docVerifier',
    align: 'center',
    width: '20%',
  }];

  const refUrl = 'orgHeaderBatch/list?';

  return (
    <div>
      <SearchTable
        refUrl={refUrl}
        columns={refColumns}
        refCodes={refCodes}
        setRefModeShow={setRefModeShow}
        refModal={refModal}
        parentForm={form}
        title="批文"
        placeholder="名称"
      />
      <Form>
        <Row gutter={24}>
          <Col span={24} style={{ display: 'block' }}>
            <FormItem>
              {getFieldDecorator('ATTRIBUTE5', {
                initialValue: record.ATTRIBUTE5 ? record.ATTRIBUTE5 : 'N',
              })(
                <Radio.Group onChange={onRadioChange}>
                  <Radio disabled={!formEdit} value="Y">有批文的组织变更业务</Radio>
                  <Radio disabled={!formEdit} value="N">无批文组织变更业务</Radio>
                </Radio.Group>,
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ display: 'block' }}>
            <FormItem
              label="文件名称和文号"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('DOC_CODE', {
                initialValue: record.DOC_CODE ? record.DOC_CODE : '',
                rules: [{ required: true, whitespace: true, message: '请输入名称' }],
              })(
                <Input disabled={!formEdit} />,
              )}
            </FormItem>
          </Col>
          {getFieldDecorator('BATCH_HEADER_ID', {
            initialValue: record.BATCH_HEADER_ID ? record.BATCH_HEADER_ID : '',
          })(
            <Input type="hidden" />,
          )}
          <Col span={8} style={{ display: 'block' }}>
            <FormItem label="批文日期" labelCol={{ span: 8 }}>
              {getFieldDecorator('DOC_DATE', {
                initialValue: record.DOC_DATE ? moment(record.DOC_DATE, 'YYYY/MM/DD') : moment(),
                rules: [{
                  required: true,
                  message: '不能为空!',
                }],
              })(
                <DatePicker disabled={!formEdit} />,
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ display: 'block' }}>
            <FormItem
              label="批文校验人"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('DOC_VERIFIER', {
                initialValue: record.DOC_VERIFIER ? record.DOC_VERIFIER : '',
                rules: [{ required: true, whitespace: true, message: '请输入名称' }],
              })(
                <Input disabled={!formEdit} />,
              )}
            </FormItem>
          </Col>
          <Col span={24} style={{ display: 'block' }}>
            <FormItem label="主题">
              {getFieldDecorator('DOC_SUBJECT', {
                initialValue: record.DOC_SUBJECT ? record.DOC_SUBJECT : '',
                rules: [{ required: true, whitespace: true, message: '请输入主题' }],
              })(<Input.TextArea disabled={!formEdit} rows={2} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AttachTable attachData={record.attachData} />
    </div>
  );
};
