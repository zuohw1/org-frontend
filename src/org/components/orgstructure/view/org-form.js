import React from 'react';
import {
  Form, Input, Card, Col, Row,
} from 'antd';
import DataCollapse from './data-collapse';

const FormItem = Form.Item;

export default (props) => {
  const {
    form, orgStructureInfo, requestList, versionId,
  } = props;

  const { getFieldDecorator } = form;

  return (
    <div>
      <Card
        title="组织结构版本"
      >
        <Form className="ant-advanced-search-form">
          <Row>
            <Col span={24} key={1}>
              <FormItem label="组织结构名称">
                {getFieldDecorator('structureName', {
                  initialValue: orgStructureInfo.structureName,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6} key={2}>
              <FormItem label="编号">
                {getFieldDecorator('versionNumber', {
                  initialValue: orgStructureInfo.versionNumber,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
            <Col span={6} key={3}>
              <FormItem label="起始日期">
                {getFieldDecorator('dateFrom', {
                  initialValue: orgStructureInfo.dateFrom,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
            <Col span={6} key={4}>
              <FormItem label="截止日期">
                {getFieldDecorator('dateTo', {
                  initialValue: orgStructureInfo.dateTo,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
            <Col span={6} key={5}>
              <FormItem label="生成新版本">
                {getFieldDecorator('newVersionFlag', {
                  initialValue: orgStructureInfo.newVersionFlag === 'Y' ? '需要生成新版本' : '不需要生成新版本',
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        title="以下为本组织结构版本变更历史："
      >
        <DataCollapse requestList={requestList} versionId={versionId} />
      </Card>
    </div>
  );
};
