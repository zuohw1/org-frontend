import React, { Component } from 'react';
import {
  Form, Row, Col, Input
} from 'antd';
import './AdvancedSearchForm3.css';

const FormItem = Form.Item;
const res = ["续存实业对应省公司名","组织排序号","组织层级","南方/北方/子公司","地点地址","虚拟组织","所属省份","组织属性","组织撤销发文时间","组织更名-原组织","组织更名-新组织","划小单元"];

class AdvancedSearchForm3 extends Component {
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
        className="ant-advanced-search-form form333"
      >
        <Row gutter={24}>{this.getFields()}</Row>
      </Form>
    );
  }
}

export default AdvancedSearchForm3;
