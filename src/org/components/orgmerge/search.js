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
    itemName: '是否有批文',
    itemKey: 'isApprove',
    itemType: 'Select',
    required: false,
    list: [{ id: 'Y', title: '有' }, { id: 'N', title: '无' }],
  },
  {
    itemName: '依据编号',
    itemKey: 'docCode',
    itemType: 'String',
    required: false,
  },
  {
    itemName: '变更状态',
    itemKey: 'docStatus',
    itemType: 'Select',
    required: false,
    list: [{ id: 'S', title: '暂存' }, { id: 'E1', title: '审批中' }, { id: 'C', title: '退回' },
      { id: 'E2', title: '成本维护' }, { id: 'T1', title: '等待同步' }, { id: 'T2', title: '同步中' },
      { id: 'T4', title: '同步错误' }, { id: 'T5', title: '同步异常' }, { id: 'T3', title: '同步成功' },
      { id: 'E3', title: '人事处理' }, { id: 'E4', title: '组织撤销' }, { id: 'E5', title: '等待撤销' },
      { id: 'T6', title: '撤销异常' }, { id: 'T7', title: '撤销成功' }, { id: 'O', title: '结束' }],
  },
  {
    itemName: '校验人名称',
    itemKey: 'docVerifier',
    itemType: 'String',
    required: false,
  },
  {
    itemName: '起始日期',
    itemKey: 'docDateS',
    itemType: 'Date',
    required: false,
  },
  {
    itemName: '结束日期',
    itemKey: 'docDateE',
    itemType: 'Date',
    required: false,
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
