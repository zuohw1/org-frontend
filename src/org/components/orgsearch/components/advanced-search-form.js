/* eslint-disable */
import React, { Component } from 'react';
import {
  Form, Row, Col, Input,
} from 'antd';
import '../../assets/styles/advanced-search-form.less';

const FormItem = Form.Item;
const res = ['组织名称', '组织类型', '日期自', '至', '组织分类'];

class AdvancedSearchForm extends Component {
  getFields() {
    const { sta } = this.props;
    const { orgName, orgType, dateBegin, dateEnd, orgTypicalHR } = sta;
    const form1Arr = [];
    form1Arr.push(orgName);
    form1Arr.push(orgType);
    form1Arr.push(dateBegin);
    form1Arr.push(dateEnd);
    form1Arr.push("");
    console.log(form1Arr);
    const children = [];
    for (let i = 0; i < res.length; i += 1) {
      children.push(
        <Col span={12} key={i}>
          <FormItem label={`${res[i]}`}>
              <Input value={form1Arr[i]} />
          </FormItem>
        </Col>,
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
