import React from 'react';
import {
  Form, Input, Card, Col, Row, Table, DatePicker, Modal, Button,
} from 'antd';
import moment from 'moment';
import DetailForm from './detail-form';

const FormItem = Form.Item;
const { TextArea } = Input;
const WapperDetailForm = Form.create()(DetailForm);

export default (props) => {
  const {
    form,
    costCenterData,
    detailRecord,
    actions,
    detailModel,
    corpModel,
    costCenterModel,
    majorModel,
    refSelectData,
    refPid,
  } = props;

  const {
    setDetailModel,
    setDetailData,
    deleteDetailData,
    setDetailList,
    saveCostData,
    updateCostInfor,
    syncData,
  } = actions;

  const { getFieldDecorator } = form;

  const onClickView = (_, records) => {
    setDetailData(true, records);
  };

  const onClickDelete = (_, records) => {
    let bool = false;
    for (let i = 0; i < costCenterData.detailList.length; i += 1) {
      if (!costCenterData.detailList[i].costId) {
        bool = true;
      }
    }
    if (bool === true) {
      Modal.info({
        title: '提示',
        content: (
          <div>
            <p>还有未保存的记录,请先保存</p>
          </div>
        ),
      });
    } else {
      deleteDetailData(records.costId, records.docHeaderId);
    }
  };

  const onClickCancel = (_, records) => {
    const dataSource = [...costCenterData.detailList];
    dataSource.splice(records.key - 1, 1);
    const detailList = dataSource.map((item, index) => {
      return { ...item, key: index + 1 };
    });
    setDetailList({ ...costCenterData, detailList });
  };

  const onClickSave = () => {
    form.validateFields((err, values) => {
      if (!err) {
        if (costCenterData.detailList.length > 0) {
          let ids = '';
          for (let i = 0; i < costCenterData.detailList.length; i += 1) {
            if (!costCenterData.detailList[i].costId) {
              ids += `${costCenterData.detailList[i].tOrgId},`;
            }
          }
          saveCostData({ ...values, ids });
        } else {
          Modal.info({
            title: '提示',
            content: (
              <div>
                <p>没有需要保存的记录</p>
              </div>
            ),
          });
        }
      }
    });
  };

  const onClickSync = () => {
    if (costCenterData.detailList.length > 0) {
      let noSave = false;
      for (let i = 0; i < costCenterData.detailList.length; i += 1) {
        if (!costCenterData.detailList[i].costId) {
          noSave = true;
        }
      }
      if (noSave === true) {
        Modal.info({
          title: '提示',
          content: (
            <div>
              <p>还有未保存的记录,请先保存</p>
            </div>
          ),
        });
      } else {
        syncData(costCenterData.costDate, costCenterData.costHeaderId);
      }
    } else {
      Modal.info({
        title: '提示',
        content: (
          <div>
            <p>没有记录不能进行同步</p>
          </div>
        ),
      });
    }
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
        if (records.costId) {
          return (
            <span>
              <a href=" javascript:;" onClick={() => onClickView(text, records)}>变更</a>
            </span>
          );
        }
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
        if (records.costId) {
          return (
            <span>
              <a href=" javascript:;" onClick={() => onClickDelete(text, records)}>删除</a>
            </span>
          );
        } else {
          return (
            <span>
              <a href=" javascript:;" onClick={() => onClickCancel(text, records)}>取消</a>
            </span>
          );
        }
      },
    },
  ];

  return (
    <div>
      <WapperDetailForm
        record={detailRecord}
        actions={actions}
        corpModel={corpModel}
        costCenterModel={costCenterModel}
        majorModel={majorModel}
        refSelectData={refSelectData}
        refPid={refPid}
        detailModel={detailModel}
        setDetailModel={setDetailModel}
        updateCostInfor={updateCostInfor}
      />
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
          {getFieldDecorator('costHeaderId', {
            initialValue: costCenterData.costHeaderId,
          })(
            <Input hidden />,
          )}
        </Row>
      </Form>
      <Card
        title="以下是变更的组织信息"
      >
        <div>
          <Button onClick={onClickSave} style={{ marginRight: 10 }}>保存变更组织</Button>
          <Button onClick={onClickSync}>同步数据</Button>
        </div>
        <Row>
          <Table columns={columns} dataSource={costCenterData.detailList} size="small" bordered pagination={false} />
        </Row>
      </Card>
    </div>
  );
};
