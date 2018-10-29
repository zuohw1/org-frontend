import React from 'react';
import {
  Layout, Breadcrumb, Tree, Row, Col, Button, Input
} from 'antd';
import '../../../assets/styles/module.less';
import '../asset/styles/index.less';
import EditableTable from './EditableTable';

const { Content } = Layout;
const { TreeNode } = Tree;

const KeyResp = () => {
  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>职位管理</Breadcrumb.Item>
        <Breadcrumb.Item>关键职责库维护</Breadcrumb.Item>
      </Breadcrumb>
      <Content style={{
        background: '#fff', padding: 24, margin: 0, minHeight: 280,
      }}
      >
        <Row gutter={50}>
          <Col span={6}>
            <div className="setting-authorization">
            <div className="siderTopC2">
              <span>关键词</span>
              <Input />
              <Button icon="search" size="small">查找</Button>
              <Button icon="reload" size="small">刷新</Button>
            </div>
            <Tree showLine>
              <TreeNode title="全部" key="0-0">
                <TreeNode title="技术序列" key="0-0-0">
                  <TreeNode title="计划规划" key="0-0-0-0" />
                  <TreeNode title="技术研发与管理" key="0-0-0-1" />
                  <TreeNode title="工程设计" key="0-0-0-2" />
                </TreeNode>
                <TreeNode title="支撑序列" key="0-0-1">
                  <TreeNode title="战略运营" key="0-0-1-0" />
                  <TreeNode title="人力资源管理" key="0-0-1-1" />
                </TreeNode>
              </TreeNode>
            </Tree>
            </div>
          </Col>
          <div className="setting-authorization">
          <Col span={18}>
            <EditableTable />
          </Col>
          </div>
        </Row>
      </Content>
    </React.Fragment>
  );
};

export default KeyResp;
