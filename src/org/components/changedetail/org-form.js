/* eslint-disable no-debugger */
import React from 'react';
import {
  Form, Button, Input, Select, DatePicker, Icon,
} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

export default (props) => {
  const {
    form,
    actions,
    expand,
  } = props;

  console.log(props);
  const { setToggle } = actions;
  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
  };

  const formCols = [{
    itemName: '父组织',
    itemKey: 'isApprove',
    itemType: 'String',
    required: true,
  },
  {
    itemName: '新增组织名称',
    itemKey: 'docCode',
    itemType: 'String',
    required: false,
  },
  {
    itemName: '起始日期',
    itemKey: 'docStatus',
    itemType: 'Date',
    required: false,
  },
  {
    itemName: '上市/非上市/存续/实业组织',
    itemKey: 'docVerifier',
    itemType: 'String',
    required: false,
  },
  {
    itemName: '组织层级',
    itemKey: 'docDateS',
    itemType: 'String',
    required: false,
  },
  {
    itemName: '所属省份',
    itemKey: 'docDateE',
    itemType: 'String',
    required: false,
  },
  {
    itemName: '虚拟组织',
    itemKey: 'docDateE',
    itemType: 'String',
    required: false,
  },
  {
    itemName: '存续实业组织对应省公司',
    itemKey: 'docDateE',
    itemType: 'String',
    required: false,
  },
  {
    itemName: '组织类型',
    itemKey: 'docDateE',
    itemType: 'String',
    required: false,
  },
  {
    itemName: '南方/北方/子公司',
    itemKey: 'docDateE',
    itemType: 'String',
    required: false,
  },
  {
    itemName: '划小单元',
    itemKey: 'docDateE',
    itemType: 'String',
    required: false,
  },
  {
    itemName: '组织排序号',
    itemKey: 'docDateE',
    itemType: 'String',
    required: false,
  },
  {
    itemName: '是否隶属于省本部',
    itemKey: 'docDateE',
    itemType: 'String',
    required: false,
  },
  {
    itemName: '组织地点',
    itemKey: 'docDateE',
    itemType: 'String',
    required: false,
  },
  {
    itemName: 'GRE法律实体',
    itemKey: 'docDateE',
    itemType: 'String',
    required: false,
  }];

  const toggle = () => {
    setToggle(!expand);
  };

  const apply = (item) => {
    return (<Option value={item.id} key={item.id}> {item.title} </Option>);
  };

  function getFields() {
    const children = [];
    for (let i = 0; i < formCols.length - 3; i += 1) {
      if (formCols[i].itemType === 'String') {
        children.push(
          <FormItem label={formCols[i].itemName} {...formItemLayout}>
            {getFieldDecorator(formCols[i].itemKey, {
              rules: [{
                required: formCols[i].required,
                message: '不能为空!',
              }],
            })(
              <Input placeholder="请输入" />,
            )}
          </FormItem>,
        );
      } else if (formCols[i].itemType === 'Select') {
        children.push(
          <FormItem label={formCols[i].itemName} {...formItemLayout}>
            {getFieldDecorator(formCols[i].itemKey)(
              <Select placeholder="请选择" allowClear>
                {
                  formCols[i].list.map(apply)
                }
              </Select>,
            )}
          </FormItem>,
        );
      } else if (formCols[i].itemType === 'Date') {
        children.push(
          <FormItem label={formCols[i].itemName} {...formItemLayout}>
            {getFieldDecorator(formCols[i].itemKey, {
              rules: [{
                required: formCols[i].required,
                message: '不能为空!',
              }],
            })(
              <DatePicker />,
            )}
          </FormItem>,
        );
      }
    }

    children.push(
      <FormItem>
        <a style={{ marginLeft: 200, fontSize: 14 }} onClick={toggle}>
          其他信息 <Icon type={expand ? 'up' : 'down'} />
        </a>
      </FormItem>,
    );

    if (expand) {
      for (let i = formCols.length - 3; i < formCols.length; i += 1) {
        if (formCols[i].itemType === 'String') {
          children.push(
            <FormItem label={formCols[i].itemName} {...formItemLayout}>
              {getFieldDecorator(formCols[i].itemKey, {
                rules: [{
                  required: formCols[i].required,
                  message: '不能为空!',
                }],
              })(
                <Input placeholder="请输入" />,
              )}
            </FormItem>,
          );
        } else if (formCols[i].itemType === 'Select') {
          children.push(
            <FormItem label={formCols[i].itemName} {...formItemLayout}>
              {getFieldDecorator(formCols[i].itemKey)(
                <Select placeholder="请选择" allowClear>
                  {
                    formCols[i].list.map(apply)
                  }
                </Select>,
              )}
            </FormItem>,
          );
        } else if (formCols[i].itemType === 'Date') {
          children.push(
            <FormItem label={formCols[i].itemName} {...formItemLayout}>
              {getFieldDecorator(formCols[i].itemKey, {
                rules: [{
                  required: formCols[i].required,
                  message: '不能为空!',
                }],
              })(
                <DatePicker />,
              )}
            </FormItem>,
          );
        }
      }
    }

    children.push(
      <FormItem {...buttonItemLayout}>
        <Button style={{
          marginLeft: 100, marginRight: 30,
        }}
        >保存
        </Button>
        <Button style={{
          marginRight: 30,
        }}
        >返回
        </Button>
      </FormItem>,
    );
    return children;
  }

  return (
    <div>
      <Form layout="horizontal">
        {getFields()}
      </Form>
    </div>
  );
};
