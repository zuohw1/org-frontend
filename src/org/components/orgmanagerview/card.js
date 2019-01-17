import React from 'react';
import {
  Col, DatePicker, Form, Input, Row,
} from 'antd';
import moment from 'moment';
import AttachTable from '../../../components/attach-table';

const FormItem = Form.Item;

export default ({
  form, info, attachData,
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
              {getFieldDecorator('docCode', {
                initialValue: info.docCode,
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
              {getFieldDecorator('docVerifier', {
                initialValue: info.docVerifier,
              })(
                <Input disabled />,
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ display: 'block' }}>
            <FormItem label="批文日期" labelCol={{ span: 8 }}>
              {getFieldDecorator('docDate', {
                initialValue: info.docDate ? moment(info.docDate) : moment(),
              })(
                <DatePicker disabled />,
              )}
            </FormItem>
          </Col>
          <Col span={24} style={{ display: 'block' }}>
            <FormItem label="主题">
              {getFieldDecorator('docSubject', {
                initialValue: info.docSubject,
              })(<Input.TextArea disabled rows={2} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AttachTable attachData={attachData} />
    </div>
  );
};
