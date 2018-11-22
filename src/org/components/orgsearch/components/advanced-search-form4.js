/* eslint-disable */
import React, { Component } from 'react';
import {
  Form, Row, Col, Input,
} from 'antd';
import '../../assets/styles/advanced-search-form.less';

const FormItem = Form.Item;
const res = ['公司名称', '企业组织代码'];

class AdvancedSearchForm4 extends Component {
  getFields() {
    const { sta4 } = this.props;
    const { orgnizationName, orgCode } = sta4;
    const form4Arr = [];
    form4Arr.push(orgnizationName);
    form4Arr.push(orgCode);
    const children = [];
    for (let i = 0; i < res.length; i += 1) {
      children.push(
        <Col span={12} key={i}>
          <FormItem label={`${res[i]}`}>
              <Input value={form4Arr[i]} />
          </FormItem>
        </Col>,
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
