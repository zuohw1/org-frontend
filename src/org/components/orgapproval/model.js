import React from 'react';
import {
  Form,
  Input,
  DatePicker,Radio,
} from 'antd';

const FormItem = Form.Item;

export default ({
  record,
  form,
  actions,
}) => {
  const { getFieldDecorator } = form;

  return (
    <Form>
      <FormItem>
        {getFieldDecorator('ATTRIBUTE5', {
          initialValue: record.ATTRIBUTE5,
        })(
          <Radio.Group>
            <Radio value="Y">有批文的组织变更业务</Radio>
            <Radio value="N">无批文组织变更业务</Radio>
          </Radio.Group>
        )}
      </FormItem>
      <FormItem
        label="文件名称和文号"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('DOC_CODE', {
          initialValue: record.DOC_CODE ? record.DOC_CODE : '',
          rules: [{ required: true, whitespace: true, message: '请输入名称' }],
        })(
          <Input />,
        )}
      </FormItem>
      {getFieldDecorator('BATCH_HEADER_ID', {
        initialValue: record.BATCH_HEADER_ID,
      })(
        <Input type="hidden" />,
      )}
      <FormItem label="批文日期" labelCol={{span: 8}}>
        {getFieldDecorator('DOC_DATE', {
          initialValue: record.DOC_DATE ? record.DOC_DATE : '',
          rules: [{
            required: true,
            message: '不能为空!',
          }],
        })(
          <DatePicker/>
        )}
      </FormItem>
      <FormItem
        label="批文校验人"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
      >
        {getFieldDecorator('DOC_VERIFIER', {
          initialValue: record.DOC_VERIFIER ? record.DOC_VERIFIER : '',
          rules: [{ required: true, whitespace: true, message: '请输入名称' }],
        })(
          <Input />,
        )}
      </FormItem>
      <FormItem label="主题">
        {getFieldDecorator('DOC_SUBJECT')(<Input type="textarea" />)}
      </FormItem>
    </Form>
  );
};
