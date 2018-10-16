import React, { Component } from 'react';
import {
  Form, Row, Col, Input
} from 'antd';
import './AdvancedSearchForm2.css';

const FormItem = Form.Item;
const res = ["地点","内部/外部","国家(地区)","省市","地点地址","邮编"];

class AdvancedSearchForm2 extends Component {
  getFields() {
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < res.length; i++) {
      children.push(
        <Col span={8} key={i}>
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
        className="ant-advanced-search-form form222"
      >
        <Row gutter={24}>{this.getFields()}</Row>
      </Form>
    );
  }
}

export default AdvancedSearchForm2;
