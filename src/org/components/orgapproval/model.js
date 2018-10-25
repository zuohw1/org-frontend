import React from 'react';
import {
  Form,
  Input,
  DatePicker, Radio, Row, Col, Modal,
} from 'antd';
import AttachTable from './attachTable';
import SearchTable from '../../../components/SearchTable';
import moment from 'moment';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export default ({
  record,
  form,
  actions,
  formEdit,
  refmodal,
}) => {
  const { getFieldDecorator } = form;

  const { isRefModeShow } = actions;

  const onRefSubmit = (e) => {
    console.log(record);
    e.preventDefault();
    isRefModeShow(false);
  };

  const onRefCancel = (e) => {
    e.preventDefault();
    isRefModeShow(false);
  };

  const onRadioChange = (e) => {
    console.log('radio checked', e.target.value);
    isRefModeShow(true);
  };

  const refCodes = [{code:'DOC_CODE',refcode:'docCode'},{code:'DOC_VERIFIER',refcode:'docVerifier'}];
  const refColumns = [{
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    align: 'center',
  }, {
    title: '文件名称和文号',
    dataIndex: 'docCode',
    key: 'docCode',
    align: 'center',
  }, {
    title: '文件拟稿人',
    dataIndex: 'docVerifier',
    key: 'docVerifier',
    align: 'center',
  }];

  const refUrl = 'orgHeaderBatch/list';

  const rowSelection = {
    type:'radio',
    onSelect: (row, selected, selectedRows) => {
      console.log(row);
      refCodes.map((item) => {
        record[item.code] = row[item.refcode];
      });
    },
  }

  return (
    <div>
    <Modal
      title="参照"
      visible={refmodal}
      onOk={onRefSubmit}
      onCancel={onRefCancel}
      maskClosable={false}
      destroyOnClose
      width={700}
    >
      <SearchTable
        columns={refColumns}
        refUrl={refUrl}
        rowSelection={rowSelection}
      />
    </Modal>
    <Form>
      <Row gutter={24}>
      <Col span={24} style={{display:'block'}}>
      <FormItem>
        {getFieldDecorator('ATTRIBUTE5', {
          initialValue: record.ATTRIBUTE5?record.ATTRIBUTE5:'N',
        })(
          <Radio.Group onChange={onRadioChange}>
            <Radio disabled={!formEdit} value="Y">有批文的组织变更业务</Radio>
            <Radio disabled={!formEdit} value="N">无批文组织变更业务</Radio>
          </Radio.Group>
        )}
      </FormItem>
      </Col>
      <Col span={8} style={{display:'block'}}>
      <FormItem
        label="文件名称和文号"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('DOC_CODE', {
          initialValue: record.DOC_CODE ? record.DOC_CODE : '',
          rules: [{ required: true, whitespace: true, message: '请输入名称' }],
        })(
          <Input disabled={!formEdit}/>,
        )}
      </FormItem>
      </Col>
      {getFieldDecorator('BATCH_HEADER_ID', {
        initialValue: record.BATCH_HEADER_ID?record.BATCH_HEADER_ID:'',
      })(
        <Input type="hidden" />,
      )}
      <Col span={8} style={{display:'block'}}>
      <FormItem label="批文日期" labelCol={{span: 8}}>
        {getFieldDecorator('DOC_DATE', {
          initialValue: record.DOC_DATE?moment(record.DOC_DATE, 'YYYY/MM/DD'):moment(),
          rules: [{
            required: true,
            message: '不能为空!',
          }],
        })(
          <DatePicker disabled={!formEdit} />
        )}
      </FormItem>
      </Col>
      <Col span={8} style={{display:'block'}}>
      <FormItem
        label="批文校验人"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('DOC_VERIFIER', {
          initialValue: record.DOC_VERIFIER ? record.DOC_VERIFIER : '',
          rules: [{ required: true, whitespace: true, message: '请输入名称' }],
        })(
          <Input disabled={!formEdit}/>,
        )}
      </FormItem>
      </Col>
      <Col span={24}  style={{display:'block'}}>
      <FormItem label="主题">
        {getFieldDecorator('DOC_SUBJECT',{
          initialValue: record.DOC_SUBJECT ? record.DOC_SUBJECT : '',
          rules: [{ required: true, whitespace: true, message: '请输入主题' }],
        })(<TextArea disabled={!formEdit} rows={2}/>)}
      </FormItem>
      </Col>
      </Row>
    </Form>
    <AttachTable attachData={record.attachData}></AttachTable>
    </div>
  );
};
