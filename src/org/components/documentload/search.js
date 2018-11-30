import React from 'react';
import {
  Form, Row, Col, Input, Button, Select,
} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
export default (props) => {
  const {
    form,
    actions,
    expand,
    formEdit,
  } = props;
  const { listTable } = actions;
  const { getFieldDecorator } = form;
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
  };

  const handleReset = () => {
    form.resetFields();
  };
  const apply = (item) => {
    return (<Option value={item.id} key={item.id}>{item.title}</Option>);
  };
  /* 查询字段 */
  const queryCols = [{
    itemName: '文档标题', itemKey: 'document', itemType: 'String', required: false,
  },
  {
    itemName: '文档类型', itemKey: 'type', itemType: 'Select', required: false, list: [{ id: '0', title: '操作手册' }, { id: '1', title: '视频教程' }, { id: '2', title: '其他文档' }, { id: '3', title: '使用说明' }],
  },
  {
    itemName: '所属模块', itemKey: 'model', itemType: 'DiSelect', required: false,
  }];
  function getFields() {
    const count = expand ? queryCols.length : 3;
    const children = [];
    for (let i = 0; i < queryCols.length; i += 1) {
      if (queryCols[i].itemType === 'String') {
        children.push(
          <Col span={6} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <FormItem label={queryCols[i].itemName}>
              {getFieldDecorator(queryCols[i].itemKey, {
                rules: [{
                  required: queryCols[i].required,
                  message: '不能为空!',
                }],
              })(
                <Input placeholder="请输入" />,
              )}
            </FormItem>
          </Col>,
        );
      } else if (queryCols[i].itemType === 'Select') {
        children.push(
          <Col span={6} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <FormItem label={queryCols[i].itemName}>
              {getFieldDecorator(queryCols[i].itemKey)(
                <Select placeholder="请选择" allowClear>
                  {
                    queryCols[i].list.map(apply)
                  }
                </Select>,
              )}
            </FormItem>
          </Col>,
        );
      } else if (queryCols[i].itemType === 'DiSelect') {
        children.push(
          <Col span={6} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <FormItem label={queryCols[i].itemName}>
              {getFieldDecorator('model', {
                initialValue: '组织名称',
              })(
                <Select disabled={!formEdit} />,
              )}
            </FormItem>
          </Col>,
        );
      }
    }
    if (expand) {
      for (let i = 0; i < 7 - count; i += 1) {
        children.push(
          <Col span={6} key={count + i} style={{ display: 'block' }} />,
        );
      }
    }
    children.push(
      <Col span={6} key={count + 5} style={{ textAlign: 'center', marginTop: 5 }}>
        <Button htmlType="submit">查询</Button>
        <Button style={{ marginLeft: 8 }} onClick={handleReset}>
          重置
        </Button>
      </Col>,
    );
    return children;
  }
  return (
    <Form
      className="ant-advanced-search-form"
      onSubmit={handleSearch}
      style={{ padding: 10 }}
      layout="inline"
    >
      <Row gutter={24}>{getFields()}</Row>
    </Form>
  );
};
