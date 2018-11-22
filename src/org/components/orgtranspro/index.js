/* eslint-disable */
import React from 'react';
import { Layout, Breadcrumb, Input, InputNumber, Form, Upload, Button, Icon, DatePicker, Modal, } from 'antd';
import '../assets/styles/org-transpro.less';
import JobNumber from './job-number';

const { Content } = Layout;
const { TextArea } = Input;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
const onRefSubmit = (e) => {
	e.preventDefault();
	const data = { ...record, ...refSelectData };
	setRefSelectData(data, false);
};

const OrgTranspro = (state) => {
	console.log(state);
  const { getFieldDecorator } = state.form;
  const { actions } = state;
  const { getJobNumber, closeJobNumber, } = actions;
  const onViewJobNumber = () => {
	  getJobNumber();
	};
	const cancelViewJobNumber = (e) => {
		e.preventDefault();
		closeJobNumber();
	};
  return (
    <div className="Transpro">
	    <Layout>
		    <Modal
		      title="选择人员"
		      onOk={onRefSubmit}
		      onCancel={cancelViewJobNumber}
		      maskClosable={false}
		      destroyOnClose
		      width={760}
		      visible={state.refModal}
		      centered
		      className="trans_model"
		    >
		      <JobNumber />
		    </Modal>
		    <Content>
		        <div className="trans_container">
		          <div className="trans_header">
		            中国联合网络通信有限公司<Input className="transInput_1" />省（市）分公司商调函
		          </div>
		          <div className="trans_content">
		            <div className="trans_content_1">
		              <p><Input className="transInput_2" />：</p>
		              <div className="firstlineindent_2">因<Input className="transInput_3" />拟商调<Input className="transInput_4" />（工号<Input className="transInput_5" /><Icon type="search" onClick={onViewJobNumber}/>）到中国联合网络通信有限公司<Input  className="transInput_6" /><Icon type="search" />工作，请贵公司同意，请于<DatePicker className="transDatePicker_1" />日前协助办理以下调离手续。如果不同意，请于收到此函5日内函告。</div>
		              <div className="firstlineindent_3">一、经研究决定，同意接收<Input className="transInput_7" />到<Input className="transInput_8" />工作。如贵单位同意，请通知本人办理调动手续，于<InputNumber min={1} max={10} className="transInputNumber_1" />日到<Input className="transInput_9" />报到。</div>
		              <div className="firstlineindent_4">二、档案请封装好，交本人自带或邮寄我公司。</div>
		            </div>
		            <div className="trans_content_2">
		              <div className="trans_content_2left">备注：</div>
		              <div className="trans_content_2right"><TextArea rows={3} /></div>
		            </div>
		            <div className="trans_content_3">
		              <div className="trans_content_3left">正文：</div>
		              <div className="trans_content_3right">
		                <FormItem
		                  {...formItemLayout}
		                >
		                  {getFieldDecorator('upload', {
		                    valuePropName: 'fileList',
		                    getValueFromEvent: normFile,
		                  })(
		                    <Upload name="logo" action="/upload.do" listType="picture">
		                      <Button>
		                        <Icon type="upload" />浏览
		                      </Button>
		                    </Upload>
		                  )}
		                </FormItem>
		              </div>
		            </div>
		            <div className="trans_content_4">
		              <div className="trans_content_4left">附件：</div>
		              <div className="trans_content_4right">
		                <FormItem
		                  {...formItemLayout}
		                >
		                  {getFieldDecorator('upload', {
		                    valuePropName: 'fileList',
		                    getValueFromEvent3: normFile,
		                  })(
		                    <Upload name="logo" action="/upload.do" listType="picture">
		                      <Button>
		                        <Icon type="upload" />浏览
		                      </Button>
		                    </Upload>
		                  )}
		                </FormItem>
		              </div>
		            </div>
		            <div className="trans_content_5">
		              <span className="lastTime">成交日期：<DatePicker className="transDatePicker_2" /></span>
		            </div>
		            <div className="trans_content_6">
		              <Button type="primary" htmlType="submit">提交</Button>
		            </div>
		          </div>
		        </div>
		    </Content>
	    </Layout>
    </div>
  );
};

export default OrgTranspro;
