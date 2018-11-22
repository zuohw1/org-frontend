/* eslint-disable */
import React, { Component } from 'react';
import {
  Form, Row, Col, Input,
} from 'antd';
import '../../assets/styles/advanced-search-form.less';

const FormItem = Form.Item;
const res = ['公司段编码', '公司段说明', '成本中心编码', '成本中心说明', '专业段编码', '专业段说明'];

class AdvancedSearchForm5 extends Component {
  getFields() {
    const { sta5 } = this.props;
    const { orgPeriodCode, orgPeriodSHow, costCenterCode, costCenterShow, majorCode, majorSHow } = sta5;
    const form5Arr = [];
    form5Arr.push(orgPeriodCode);
    form5Arr.push(orgPeriodSHow);
    form5Arr.push(costCenterCode);
    form5Arr.push(costCenterShow);
    form5Arr.push(majorCode);
    form5Arr.push(majorSHow);
    const children = [];
    for (let i = 0; i < res.length; i += 1) {
      children.push(
        <Col span={12} key={i}>
          <FormItem label={`${res[i]}`}>
              <Input value={form5Arr[i]} />
          </FormItem>
        </Col>,
      );
    }
    return children;
  }

  render() {
    return (
      <Form
        className="ant-advanced-search-form form555"
      >
        <Row gutter={24}>{this.getFields()}</Row>
      </Form>
    );
  }
}

export default AdvancedSearchForm5;
