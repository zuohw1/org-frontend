/* eslint-disable no-debugger */
import React from 'react';
import {
  Col, DatePicker, Form, Input, Row,
} from 'antd';
import moment from 'moment';
import AttachTable from './attach-table';

const FormItem = Form.Item;

export default ({
  form,
}) => {
  const { getFieldDecorator } = form;

  return (
    <div>
      <Form>
        <Row gutter={24}>
          <Col span={8} style={{ display: 'block' }}>
            <FormItem
              label="文件名称和文号"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('DOC_CODE', {
                initialValue: '',
              })(
                <Input disabled />,
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
              })(
                <Input disabled />,
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ display: 'block' }}>
            <FormItem label="批文日期" labelCol={{ span: 8 }}>
              {getFieldDecorator('DOC_DATE', {
                initialValue: moment(),
              })(
                <DatePicker disabled />,
              )}
            </FormItem>
          </Col>
          <Col span={24} style={{ display: 'block' }}>
            <FormItem label="主题">
              {getFieldDecorator('DOC_SUBJECT', {
                initialValue: '',
              })(<Input.TextArea disabled rows={2} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AttachTable />
    </div>
  );
};
