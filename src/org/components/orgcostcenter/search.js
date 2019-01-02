import React from 'react';
import {
  Button, Col, DatePicker, Form, Icon, Input, Row, Select,
} from 'antd';
import PersonTable from '../../../components/person-table';

const FormItem = Form.Item;
const { Option } = Select;

export default (props) => {
  const {
    form,
    actions,
    expand,
    personModal,
    searchEmpNumber,
  } = props;
  const { getFieldDecorator } = form;
  const { listTable, setToggle, setPersonModel } = actions;

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

  const toggle = () => {
    setToggle(!expand);
  };

  const apply = (item) => {
    return (<Option value={item.id} key={item.id}> {item.title} </Option>);
  };

  const openPersonRef = () => {
    setPersonModel(true);
  };

  /* 查询字段 */
  const queryCols = [{
    itemName: '变更人',
    itemKey: 'empNumber',
    itemType: 'personRef',
    required: false,
  },
  {
    itemName: '变更日期',
    itemKey: 'costDate',
    itemType: 'Date',
    required: false,
  },
  {
    itemName: '记录状态',
    itemKey: 'costStatus',
    itemType: 'Select',
    required: false,
    list: [{ id: '未同步', title: '未同步' }, { id: '同步成功', title: '同步成功' }, { id: '同步失败', title: '同步失败' }],
  }];

  let collapse = null;
  if (queryCols.length > 3) {
    collapse = (
      <a style={{ marginLeft: 8, fontSize: 14 }} onClick={toggle}>
        更多 <Icon type={expand ? 'up' : 'down'} />
      </a>
    );
  }

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
      } else if (queryCols[i].itemType === 'Date') {
        children.push(
          <Col span={6} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <FormItem label={queryCols[i].itemName}>
              {getFieldDecorator(queryCols[i].itemKey, {
                rules: [{
                  required: queryCols[i].required,
                  message: '不能为空!',
                }],
              })(
                <DatePicker />,
              )}
            </FormItem>
          </Col>,
        );
      } else if (queryCols[i].itemType === 'personRef') {
        children.push(
          <Col span={6} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <FormItem label={queryCols[i].itemName}>
              {getFieldDecorator(queryCols[i].itemKey)(
                <Input.Search placeholder="请选择" onSearch={openPersonRef} />,
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
      <Col span={6} key={count + 5} style={{ textAlign: 'right', marginTop: 5 }}>
        <Button htmlType="submit">查询</Button>
        <Button style={{ marginLeft: 8 }} onClick={handleReset}>
          重置
        </Button>
        {collapse}
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
      <PersonTable
        searchEmpNumber={searchEmpNumber}
        personModal={personModal}
        setPersonModel={setPersonModel}
        parentForm={form}
      />
      <Row gutter={24}>{getFields()}</Row>
    </Form>);
};
