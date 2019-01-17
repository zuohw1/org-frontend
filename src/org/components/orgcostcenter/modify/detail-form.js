import React from 'react';
import {
  Col, Form, Input, Row, Modal,
} from 'antd';
import SearchTable from '../../../../components/search-table';

const FormItem = Form.Item;

export default (props) => {
  const {
    form,
    record,
    actions,
    corpModel,
    costCenterModel,
    majorModel,
    refPid,
    setDetailModel,
    updateCostInfor,
    detailModel,
  } = props;

  const { getFieldDecorator } = form;

  const { setCorpModel, setCostCenterModel, setMajorModel } = actions;

  const openCorpRef = () => {
    setCorpModel(true);
  };

  const costCenterRefUrl = 'flexValue/getPageDataByPID?type=UNICOM_PROVINCE_VALUESET_LIST&';

  const openCostCeterRef = () => {
    const pid = form.getFieldValue('coCode');
    if (pid !== '') {
      setCostCenterModel(true, pid);
    } else {
      Modal.info({
        title: '提示',
        content: (
          <div>
            <p>请先选择公司段</p>
          </div>
        ),
      });
    }
  };

  const openMajorRef = () => {
    setMajorModel(true);
  };

  const corpRefCodes = [{ code: 'coCode', refcode: 'id' }, { code: 'coName', refcode: 'title' }];
  const costCenterRefCodes = [{ code: 'ccCode', refcode: 'id' }, { code: 'ccName', refcode: 'title' }];
  const majorRefCodes = [{ code: 'spCode', refcode: 'id' }, { code: 'spName', refcode: 'title' }];
  const refColumns = [{
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    align: 'center',
    width: '12%',
  }, {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
  }, {
    title: '代码',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: '20%',
  }];

  const corpRefUrl = 'flexValue/getPageData?type=CNC_COA_CO&';
  const majorRefUrl = 'flexValue/getPageData?type=CNC_COA_SP&';

  const onRefSubmit = () => {
    setDetailModel(false);
    form.validateFields((err, values) => {
      if (!err) {
        /* eslint no-console: 0 */
        updateCostInfor(values);
        form.resetFields();
      }
    });
  };

  const onRefCancel = () => {
    setDetailModel(false);
  };

  return (
    <div>
      <SearchTable
        refUrl={corpRefUrl}
        columns={refColumns}
        refCodes={corpRefCodes}
        setRefModeShow={setCorpModel}
        refModal={corpModel}
        parentForm={form}
        title="公司段"
        placeholder="公司段"
      />
      <SearchTable
        refUrl={costCenterRefUrl}
        columns={refColumns}
        refCodes={costCenterRefCodes}
        setRefModeShow={setCostCenterModel}
        refModal={costCenterModel}
        parentForm={form}
        refPid={refPid}
        title="成本中心段"
        placeholder="成本中心段"
      />
      <SearchTable
        refUrl={majorRefUrl}
        columns={refColumns}
        refCodes={majorRefCodes}
        setRefModeShow={setMajorModel}
        refModal={majorModel}
        parentForm={form}
        title="专业段"
        placeholder="专业段"
      />
      <Modal
        title="成本信息"
        visible={detailModel}
        onOk={onRefSubmit}
        onCancel={onRefCancel}
        maskClosable={false}
        width={900}
        destroyOnClose
      >
        <Form className="ant-advanced-search-form">
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="成本信息">
                {getFieldDecorator('key1', {
                  initialValue: '变更前',
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="成本信息">
                {getFieldDecorator('key2', {
                  initialValue: '变更后',
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="公司段编码">
                {getFieldDecorator('oldCoCode', {
                  initialValue: record.oldCoCode,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="公司段编码">
                {getFieldDecorator('coCode', {
                  initialValue: record.coCode,
                })(
                  <Input.Search onSearch={openCorpRef} />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="公司段名称">
                {getFieldDecorator('oldCoName', {
                  initialValue: record.oldCoName,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="公司段名称">
                {getFieldDecorator('coName', {
                  initialValue: record.coName,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="成本中心编码">
                {getFieldDecorator('oldCcCode', {
                  initialValue: record.oldCcCode,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="成本中心编码">
                {getFieldDecorator('ccCode', {
                  initialValue: record.ccCode,
                })(
                  <Input.Search onSearch={openCostCeterRef} />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="成本中心名称">
                {getFieldDecorator('oldCcName', {
                  initialValue: record.oldCcName,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="成本中心名称">
                {getFieldDecorator('ccName', {
                  initialValue: record.ccName,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="业务段编码">
                {getFieldDecorator('oldSpCode', {
                  initialValue: record.oldSpCode,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="业务段编码">
                {getFieldDecorator('spCode', {
                  initialValue: record.spCode,
                })(
                  <Input.Search onSearch={openMajorRef} />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="业务段名称">
                {getFieldDecorator('oldSpName', {
                  initialValue: record.oldSpName,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="业务段名称">
                {getFieldDecorator('spName', {
                  initialValue: record.spName,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
            {getFieldDecorator('docHeaderId', {
              initialValue: record.docHeaderId,
            })(
              <Input hidden />,
            )}
            {getFieldDecorator('costId', {
              initialValue: record.costId,
            })(
              <Input hidden />,
            )}
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
