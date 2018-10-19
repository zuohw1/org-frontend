import React from 'react';
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

export default (props) => {
  const {
    form,
    actions,
    expand,
    query_columns,
  } = props;
  const { getFieldDecorator } = form;
  const { listTable, setToggle } = actions;

  const handleSearch = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const pageSize = 10;
        const pageNumber = 1;
        const select = { ...values, pageSize, pageNumber };
        listTable(select);
      }
    });
  }

  const handleReset = () => {
    form.resetFields();
  }

  const toggle = () => {
    setToggle(!expand);
  }

  const apply = (item) => {
    return (<Option value={item.id} key={item.id}> {item.title} </Option>);
  };

  function getFields() {
    const count = expand ? query_columns.length : 3;
    const children = [];
    for (let i = 0; i < query_columns.length; i++) {
      if (query_columns[i].itemType === "String") {
        children.push(
          <Col span={8} key={i} style={{display: i < count ? 'block' : 'none'}}>
            <FormItem label={query_columns[i].itemName} labelCol={{span: 8}}>
              {getFieldDecorator(query_columns[i].itemKey, {
                rules: [{
                  required: query_columns[i].required,
                  message: '不能为空!',
                }],
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
          </Col>);
      } else if (query_columns[i].itemType === "Select") {
        children.push(
          <Col span={8} key={i} style={{display: i < count ? 'block' : 'none'}}>
            <FormItem label={query_columns[i].itemName} labelCol={{span: 8}}>
              {getFieldDecorator(query_columns[i].itemKey)(
                <Select style={{width: 120, marginLeft: 5, marginRight: 20}} placeholder="请选择" allowClear>
                  {
                    query_columns[i].list.map(apply)
                  }
                </Select>,
              )}
            </FormItem>
          </Col>);
      } else if (query_columns[i].itemType === "Date") {
        children.push(
          <Col span={8} key={i} style={{display: i < count ? 'block' : 'none'}}>
            <FormItem label={query_columns[i].itemName} labelCol={{span: 8}}>
              {getFieldDecorator(query_columns[i].itemKey, {
                rules: [{
                  required: query_columns[i].required,
                  message: '不能为空!',
                }],
              })(
                <DatePicker/>
              )}
            </FormItem>
          </Col>
        );
      }
    }
    return children;
  }

  let collapse = null;
  if(query_columns.length>3){
    collapse = <a style={{ marginLeft: 8, fontSize: 12 }} onClick={toggle}>
      更多 <Icon type={expand ? 'up' : 'down'} />
    </a>;
  }

  return (
    <Form
      className="ant-advanced-search-form"
      onSubmit={handleSearch}
    >
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">查询</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            重置
          </Button>
          {collapse}
        </Col>
      </Row>
    </Form>);
};
