import React, { Component } from 'react';
import {
  Form, Row, Col, Input
} from 'antd';
import '../../assets/styles/advanced-search-form.css';

const FormItem = Form.Item;
const res = ["公司名称","企业组织代码","成本信息","公司段编码","公司段说明","成本中心编码","成本中心说明","专业段编码","专业段说明"];

class AdvancedSearchForm4 extends Component {
  getFields() {
    console.log(this.props)
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
        className="ant-advanced-search-form form444"
      >
        <Row gutter={24}>{this.getFields()}</Row>
      </Form>
    );
  }
}

export default AdvancedSearchForm4;
