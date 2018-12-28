import React from 'react';
import {
  Form, TreeSelect, Input, Checkbox, Card, Col, Row, Table, Button,
} from 'antd';

const FormItem = Form.Item;

export default (props) => {
  const {
    form,
  } = props;

  const { getFieldDecorator } = form;

  const onClickDelete = (_, records) => {
    console.log(records);
  };

  const columnsAdd = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      width: 50,
    }, {
      title: '新添加组织',
      dataIndex: 'orgName',
      key: 'orgName',
      align: 'center',
      width: 200,
    }, {
      title: '父组织',
      dataIndex: 'parentOrgName',
      key: 'parentOrgName',
      align: 'center',
      width: 200,
    }, {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
      align: 'center',
      width: 100,
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: 50,
      render: (text, records) => {
        return (
          <span>
            <a href=" javascript:;" onClick={() => onClickDelete(text, records)}>删除</a>
          </span>
        );
      },
    },
  ];

  const columnsMod = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      width: 50,
    }, {
      title: '组织名称',
      dataIndex: 'orgName',
      key: 'orgName',
      align: 'center',
      width: 200,
    }, {
      title: '修改后父组织',
      dataIndex: 'parentOrgName',
      key: 'parentOrgName',
      align: 'center',
      width: 200,
    }, {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
      align: 'center',
      width: 100,
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: 50,
      render: (text, records) => {
        return (
          <span>
            <a href=" javascript:;" onClick={() => onClickDelete(text, records)}>删除</a>
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <Card
        title="组织结构版本"
      >
        <Form className="ant-advanced-search-form">
          <Row>
            <Col span={24} key={1}>
              <FormItem label="组织结构名称">
                {getFieldDecorator('name')(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8} key={2}>
              <FormItem label="编号">
                {getFieldDecorator('code')(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
            <Col span={8} key={3}>
              <FormItem label="起始日期">
                {getFieldDecorator('startDate')(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
            <Col span={8} key={4}>
              <FormItem label="截止日期">
                {getFieldDecorator('endDate')(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={3} key={5}>
              <FormItem label="生成新版本">
                {getFieldDecorator('code')(
                  <Checkbox />,
                )}
              </FormItem>
            </Col>
            <Col span={21} key={6}>
              <div>如果在本次的结构调整中需要生成新版本的情况，请勾选生成新版本选项，系统在同步的时候会自动生成新版本。 </div>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        title="添加新组织"
      >
        <Row>
          <Col span={4}><div>选择新组织</div></Col>
          <Col span={16}><TreeSelect style={{ width: 200 }} /></Col>
          <Col span={4}><Button>确认</Button></Col>
        </Row>
        <Row>
          <Table columns={columnsAdd} size="small" bordered />
        </Row>
      </Card>
      <Card
        title="组织结构修改"
      >
        <Row>
          <Col span={4}><div>选择父组织</div></Col>
          <Col span={16}><TreeSelect style={{ width: 200 }} /></Col>
          <Col span={4}><Button>确认</Button></Col>
        </Row>
        <Row>
          <Table columns={columnsMod} size="small" bordered />
        </Row>
      </Card>
    </div>
  );
};
