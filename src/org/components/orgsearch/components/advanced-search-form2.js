/* eslint-disable */
import React, { Component } from 'react';
import {
  Form, Row, Col, Input,
} from 'antd';
import '../../assets/styles/advanced-search-form.less';

const FormItem = Form.Item;
const res = ['地点', '内部/外部', '国家(地区)', '省市', '地点地址', '邮编'];

class AdvancedSearchForm2 extends Component {
  getFields() {
    const { sta2 } = this.props;
    const { location, interOrter, national, privince, locationDetailInfo, postCode } = sta2;
    const form2Arr = [];
    form2Arr.push(location);
    form2Arr.push(interOrter);
    form2Arr.push(national);
    form2Arr.push(privince);
    form2Arr.push(locationDetailInfo);
    form2Arr.push(postCode);
    const children = [];
    for (let i = 0; i < res.length; i += 1) {
      children.push(
        <Col span={12} key={i}>
          <FormItem label={`${res[i]}`}>
              <Input value={form2Arr[i]} />
          </FormItem>
        </Col>,
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
