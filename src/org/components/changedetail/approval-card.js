import React from 'react';
import {
  Form,
  Input,
  DatePicker, Radio, Row, Col,
} from 'antd';
import moment from 'moment';
import AttachTable from './attachTable';

const FormItem = Form.Item;

const ApprovalCard = (state) => {
  console.log(state);
  const { form } = state;
  const { getFieldDecorator } = form;

  return (
    <div>
      <Form>
        <Row gutter={24}>
          <Col span={24} style={{ display: 'block' }}>
            <FormItem>
              {getFieldDecorator('ATTRIBUTE5', {
                initialValue: 'N',
              })(
                <Radio.Group>
                  <Radio value="Y">有批文的组织变更业务</Radio>
                  <Radio value="N">无批文组织变更业务</Radio>
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
                initialValue: '',
                rules: [{ required: true, whitespace: true, message: '请输入名称' }],
              })(
                <Input />,
              )}
            </FormItem>
          </Col>
          {getFieldDecorator('BATCH_HEADER_ID', {
            initialValue: '',
          })(
            <Input type="hidden" />,
          )}
          <Col span={8} style={{ display: 'block' }}>
            <FormItem label="批文日期" labelCol={{ span: 8 }}>
              {getFieldDecorator('DOC_DATE', {
                initialValue: moment(),
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
              label="批文校验人"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('DOC_VERIFIER', {
                initialValue: '',
                rules: [{ required: true, whitespace: true, message: '请输入名称' }],
              })(
                <Input />,
              )}
            </FormItem>
          </Col>
          <Col span={24} style={{ display: 'block' }}>
            <FormItem label="主题">
              {getFieldDecorator('DOC_SUBJECT', {
                initialValue: '',
                rules: [{ required: true, whitespace: true, message: '请输入主题' }],
              })(<Input.TextArea rows={2} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AttachTable />
    </div>
  );
};

export default ApprovalCard;
