/* eslint-disable */
import React, { Component } from 'react';
import {
  Form, Row, Col, Input,
} from 'antd';
import '../../assets/styles/advanced-search-form.less';

const FormItem = Form.Item;
const res = ['续存实业对应省公司名', '组织排序号', '组织层级', '南方/北方/子公司', '虚拟组织', '所属省份', '组织属性', '组织撤销发文时间', '组织更名-原组织', '组织更名-新组织', '划小单元'];

class AdvancedSearchForm3 extends Component {
  getFields() {
    const { sta3 } = this.props;
    const { addInfo, orgSortNumber, orgLevel, area, vitualOrg, owenPrivince, orgProprerties, orgcancleDate, cucOriOrgName, cucNewOrgName, cucorgmin } = sta3;
    const form3Arr = [];
    form3Arr.push(addInfo);
    form3Arr.push(orgSortNumber);
    form3Arr.push(orgLevel);
    form3Arr.push(area);
    form3Arr.push(vitualOrg);
    form3Arr.push(owenPrivince);
    form3Arr.push(orgProprerties);
    form3Arr.push(orgcancleDate);
    form3Arr.push(cucOriOrgName);
    form3Arr.push(cucNewOrgName);
    form3Arr.push(cucorgmin);
    console.log(form3Arr);
    const children = [];
    for (let i = 0; i < res.length; i += 1) {
      children.push(
        <Col span={12} key={i}>
          <FormItem label={`${res[i]}`}>
              <Input value={form3Arr[i]} />
          </FormItem>
        </Col>,
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
