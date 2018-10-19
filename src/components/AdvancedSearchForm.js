import React, { Component } from 'react';
import {
  Form, Row, Col, Input
} from 'antd';
import './AdvancedSearchForm.css';

const FormItem = Form.Item;
const res = ["组织名称","组织类型","日期自","至","组织分类"];

class AdvancedSearchForm extends Component {
  getFields() {
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < res.length; i++) {
      children.push(
        <Col span={12} key={i}>
          <FormItem label={`${res[i]}`}>
            {getFieldDecorator(`${i}`, {
              rules: [{
                required: true,
                message: 'Input something!',
              }],
            })(
              <Input placeholder="" />
            )}
          </FormItem>
        </Col>
      );
    }
    return children;
  }

  render() {
    return (
      <Form
        className="ant-advanced-search-form form111"
      >
        <Row gutter={24}>{this.getFields()}</Row>
      </Form>
    );
  }
}

export default AdvancedSearchForm;
