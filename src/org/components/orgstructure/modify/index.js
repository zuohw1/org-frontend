import React from 'react';
import {
  Breadcrumb, Col, Layout, Row,
} from 'antd';
import '../../../../assets/styles/module.less';
import OrgForm from './org-form';
import OrgTree from './org-tree';

const { Content } = Layout;

const orgStructureView = (state) => {
  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '10px 0' }}>
        <Breadcrumb.Item>
          组织管理
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <strong>组织结构业务维护</strong>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="page-module"
        style={{
          background: '#fff', padding: '15px', margin: 0,
        }}
      >
        <div>
          <Row className="detail" gutter={8}>
            <Col span={8}>
              <OrgTree {...state} />
            </Col>
            <Col className="detail_form" span={16}>
              <OrgForm {...state} />
            </Col>
          </Row>
        </div>
      </Content>
    </React.Fragment>
  );
};

export default orgStructureView;
