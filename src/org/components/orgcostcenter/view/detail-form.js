import React from 'react';
import {
  Col, Form, Input, Row,
} from 'antd';

const FormItem = Form.Item;

export default (props) => {
  const {
    form, record,
  } = props;

  const { getFieldDecorator } = form;

  return (
    <div>
      <Form className="ant-advanced-search-form">
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="成本信息">
              {getFieldDecorator('key1', {
                initialValue: '变更前',
              })(
                <Input disabled />,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="成本信息">
              {getFieldDecorator('key2', {
                initialValue: '变更后',
              })(
                <Input disabled />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="公司段编码">
              {getFieldDecorator('oldCoCode', {
                initialValue: record.oldCoCode,
              })(
                <Input disabled />,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="公司段编码">
              {getFieldDecorator('coCode', {
                initialValue: record.coCode,
              })(
                <Input disabled />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="公司段名称">
              {getFieldDecorator('oldCoName', {
                initialValue: record.oldCoName,
              })(
                <Input disabled />,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="公司段名称">
              {getFieldDecorator('coName', {
                initialValue: record.coName,
              })(
                <Input disabled />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="成本中心编码">
              {getFieldDecorator('oldCcCode', {
                initialValue: record.oldCcCode,
              })(
                <Input disabled />,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="成本中心编码">
              {getFieldDecorator('ccCode', {
                initialValue: record.ccCode,
              })(
                <Input disabled />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="成本中心名称">
              {getFieldDecorator('oldCcName', {
                initialValue: record.oldCcName,
              })(
                <Input disabled />,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="成本中心名称">
              {getFieldDecorator('ccName', {
                initialValue: record.ccName,
              })(
                <Input disabled />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="业务段编码">
              {getFieldDecorator('oldSpCode', {
                initialValue: record.oldSpCode,
              })(
                <Input disabled />,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="业务段编码">
              {getFieldDecorator('spCode', {
                initialValue: record.spCode,
              })(
                <Input disabled />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="业务段名称">
              {getFieldDecorator('oldSpName', {
                initialValue: record.oldSpName,
              })(
                <Input disabled />,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="业务段名称">
              {getFieldDecorator('spName', {
                initialValue: record.spName,
              })(
                <Input disabled />,
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
