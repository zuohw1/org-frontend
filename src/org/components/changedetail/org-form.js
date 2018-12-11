import React from 'react';
import {
  Form, Button, Input, Select, DatePicker, Icon, Checkbox,
} from 'antd';
import '../assets/styles/org-create.less';

const FormItem = Form.Item;
const { Option } = Select;

export default (props) => {
  const {
    form,
    actions,
    expand,
    refList,
    record,
    location,
  } = props;

  const { setToggle } = actions;
  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 8 },
  };

  const formCols = [{
    itemName: '父组织',
    itemKey: 'parentOrgName',
    itemType: 'String',
    required: true,
    editFlag: false,
    placeholder: '勾选左侧组织树获取',
  },
  {
    itemKey: 'parentOrgId',
    itemType: 'hidden',
  },
  {
    itemKey: 'docHeaderId',
    itemType: 'hidden',
  },
  {
    itemName: '新增组织名称',
    itemKey: 'orgName',
    itemType: 'String',
    required: true,
    editFlag: true,
  },
  {
    itemKey: 'tOrgId',
    itemType: 'hidden',
  },
  {
    itemName: '起始日期',
    itemKey: 'dateFrom',
    itemType: 'Date',
    required: false,
    editFlag: true,
  },
  {
    itemName: '上市/非上市/存续/实业组织',
    itemKey: 'appearMarket',
    itemType: 'String',
    required: false,
    editFlag: true,
    list: refList,
  },
  {
    itemName: '组织层级',
    itemKey: 'orgHierarchyName',
    itemType: 'String',
    required: false,
    editFlag: true,
  },
  {
    itemName: '所属省份',
    itemKey: 'subordinateProvinces',
    itemType: 'String',
    required: false,
    editFlag: true,
  },
  {
    itemName: '虚拟组织',
    itemKey: 'virtualOrg',
    itemType: 'String',
    required: false,
    editFlag: true,
  },
  {
    itemName: '存续实业组织对应省公司',
    itemKey: 'orgCompanyName',
    itemType: 'String',
    required: false,
    editFlag: true,
  },
  {
    itemName: '组织类型',
    itemKey: 'orgType',
    itemType: 'String',
    required: false,
    editFlag: true,
  },
  {
    itemName: '南方/北方/子公司',
    itemKey: 'subsidiary',
    itemType: 'String',
    required: false,
    editFlag: true,
  },
  {
    itemName: '划小单元',
    itemKey: 'minUnit',
    itemType: 'String',
    required: false,
    editFlag: true,
  },
  {
    itemName: '组织排序号',
    itemKey: 'orgOrderNumber',
    itemType: 'String',
    required: false,
    editFlag: true,
  },
  {
    itemName: '是否隶属于省本部',
    itemKey: 'subordinateProvince',
    itemType: 'checkbox',
    required: false,
    editFlag: true,
  },
  {
    itemName: '组织地点',
    itemKey: 'locationCode',
    itemType: 'String',
    required: false,
    editFlag: true,
  },
  {
    itemName: 'GRE法律实体',
    itemKey: 'greOrg',
    itemType: 'checkbox',
    required: false,
    editFlag: true,
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
              initialValue: record.itemKey,
              rules: [{
                required: formCols[i].required,
                message: '不能为空!',
              }],
            })(
              <Input placeholder={formCols[i].placeholder == null ? '请输入' : formCols[i].placeholder} disabled={!formCols[i].editFlag} />,
            )}
          </FormItem>,
        );
      } else if (formCols[i].itemType === 'Select') {
        children.push(
          <FormItem label={formCols[i].itemName} {...formItemLayout}>
            {getFieldDecorator(formCols[i].itemKey, {
              initialValue: record.itemKey,
            })(
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
              initialValue: record.itemKey,
              rules: [{
                required: formCols[i].required,
                message: '不能为空!',
              }],
            })(
              <DatePicker />,
            )}
          </FormItem>,
        );
      } else if (formCols[i].itemType === 'checkbox') {
        children.push(
          <FormItem label={formCols[i].itemName} {...formItemLayout}>
            {getFieldDecorator(formCols[i].itemKey, {
              initialValue: record.itemKey,
              rules: [{
                required: formCols[i].required,
              }],
            })(
              <Checkbox />,
            )}
          </FormItem>,
        );
      } else if (formCols[i].itemType === 'hidden' && formCols[i].itemKey === 'docHeaderId') {
        children.push(
          <div style={{ display: 'none' }}>
            <FormItem>
              {getFieldDecorator(formCols[i].itemKey, {
                initialValue: location.pathData.id,
              })(
                <Input type="hidden" />,
              )}
            </FormItem>
          </div>,
        );
      } else if (formCols[i].itemType === 'hidden') {
        children.push(
          <div style={{ display: 'none' }}>
            <FormItem>
              {getFieldDecorator(formCols[i].itemKey, {
                initialValue: record.itemKey,
              })(
                <Input type="hidden" />,
              )}
            </FormItem>
          </div>,
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
                initialValue: record.itemKey,
                rules: [{
                  required: formCols[i].required,
                  message: '不能为空!',
                }],
              })(
                <Input placeholder="请输入" disabled={!formCols[i].editFlag} />,
              )}
            </FormItem>,
          );
        } else if (formCols[i].itemType === 'Select') {
          children.push(
            <FormItem label={formCols[i].itemName} {...formItemLayout}>
              {getFieldDecorator(formCols[i].itemKey, {
                initialValue: record.itemKey,
              })(
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
                initialValue: record.itemKey,
                rules: [{
                  required: formCols[i].required,
                  message: '不能为空!',
                }],
              })(
                <DatePicker />,
              )}
            </FormItem>,
          );
        } else if (formCols[i].itemType === 'checkbox') {
          children.push(
            <FormItem label={formCols[i].itemName} {...formItemLayout}>
              {getFieldDecorator(formCols[i].itemKey, {
                initialValue: record.itemKey,
                rules: [{
                  required: formCols[i].required,
                }],
              })(
                <Checkbox />,
              )}
            </FormItem>,
          );
        }
      }
    }

    children.push(
      <FormItem {...buttonItemLayout}>
        <Button className="preserve">保存
        </Button>
        <Button className="go_back">返回
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
