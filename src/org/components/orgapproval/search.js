import React from 'react';
import {
  Form, Row, Col, Input, Button, Icon, Select, DatePicker,
} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

export default (props) => {
  const {
    form,
    actions,
    expand,
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

  /* 查询字段 */
  const queryCols = [{
    itemName: '文件名称和文号', itemKey: 'batchCode', itemType: 'String', required: false,
  },
  {
    itemName: '流程状态', itemKey: 'workFlowStatus', itemType: 'Select', required: false, list: [{ id: '0', title: '暂存中' }, { id: '1', title: '审批中' }, { id: '2', title: '审批完成' }],
  },
  {
    itemName: '文件拟稿人', itemKey: 'batchVerifier', itemType: 'String', required: false,
  },
  {
    itemName: '文件发起人', itemKey: 'fullName', itemType: 'String', required: false,
  },
  {
    itemName: '发起开始日期', itemKey: 'batDateS', itemType: 'Date', required: false,
  },
  {
    itemName: '发起结束日期', itemKey: 'batDateE', itemType: 'Date', required: false,
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
      <Row gutter={24}>{getFields()}</Row>
    </Form>);
};
