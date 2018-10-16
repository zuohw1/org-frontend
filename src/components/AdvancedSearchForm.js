import React, { Component } from 'react';
import {
  Form, Row, Col, Input,
} from 'antd';
import './AdvancedSearchForm.css';

const FormItem = Form.Item;

class AdvancedSearchForm extends Component {
  getFields() {
    const { getFieldDecorator } = this.props.form;
      const children = [];
      for (let i = 0; i < 10; i++) {
        children.push(
          <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <FormItem label={`Field ${i}`}>
              {getFieldDecorator(`field-${i}`, {
                rules: [{
                  required: true,
                  message: 'Input something!',
                }],
              })(
                <Input placeholder="placeholder" />,
              )}
            </FormItem>
          </Col>,
        );
      }
      return children;
    };

    render() {
      return (
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={24}>{this.getFields()}</Row>
        </Form>
      );
    }
}

export default AdvancedSearchForm;
