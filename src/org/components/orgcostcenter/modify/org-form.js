import React from 'react';
import {
  Form, Input, Card, Col, Row, Table, DatePicker, Modal,
} from 'antd';
import moment from 'moment';
import DetailForm from './detail-form';

const FormItem = Form.Item;
const { TextArea } = Input;
const WapperDetailForm = Form.create()(DetailForm);

export default (props) => {
  const {
    form, costCenterData, detailRecord, actions, detailModel,
  } = props;

  const { setDetailModel, setDetailData } = actions;

  const { getFieldDecorator } = form;

  const onClickView = (_, records) => {
    setDetailData(true, records);
  };

  const onClickDelete = (_, records) => {
    setDetailData(true, records);
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      width: '10%',
    }, {
      title: '组织名称',
      dataIndex: 'tOrgName',
      key: 'tOrgName',
      align: 'center',
    }, {
      title: '变更成本信息',
      dataIndex: 'change',
      key: 'change',
      align: 'center',
      width: '20%',
      render: (text, records) => {
        return (
          <span>
            <a href=" javascript:;" onClick={() => onClickView(text, records)}>变更</a>
          </span>
        );
      },
    }, {
      title: '修改状态',
      dataIndex: 'updateState',
      key: 'updateState',
      align: 'center',
      width: '20%',
    }, {
      title: '同步状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '20%',
    }, {
      title: '操作',
      dataIndex: 'operator',
      key: 'operator',
      align: 'center',
      width: '10%',
      render: (text, records) => {
        return (
          <span>
            <a href=" javascript:;" onClick={() => onClickDelete(text, records)}>删除</a>
          </span>
        );
      },
    },
  ];

  const onRefSubmit = () => {
    setDetailModel(false);
  };

  return (
    <div>
      <Modal
        title="成本信息"
        visible={detailModel}
        onOk={onRefSubmit}
        onCancel={onRefSubmit}
        maskClosable={false}
        width={900}
        destroyOnClose
      >
        <WapperDetailForm record={detailRecord} />
      </Modal>
      <Form className="ant-advanced-search-form">
        <Row gutter={8}>
          <Col span={12} key={1}>
            <FormItem label="变更日期">
              {getFieldDecorator('costDate', {
                initialValue: costCenterData.costDate ? moment(costCenterData.costDate, 'YYYY-MM-DD') : null,
              })(
                <DatePicker />,
              )}
            </FormItem>
          </Col>
          <Col span={12} key={2}>
            <FormItem label="变更人">
              {getFieldDecorator('employeeName', {
                initialValue: costCenterData.employeeName,
              })(
                <Input />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} key={3}>
            <FormItem label="变更说明">
              {getFieldDecorator('costDescription', {
                initialValue: costCenterData.costDescription,
              })(
                <TextArea rows={3} />,
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Card
        title="以下是变更的组织信息"
      >
        <Row>
          <Table columns={columns} dataSource={costCenterData.detailList} size="small" bordered pagination={false} />
        </Row>
      </Card>
    </div>
  );
};
