import React from 'react';
import '../assets/styles/detail-org-form.less';
import {
  Button, Tree, Row, Col, Input,
} from 'antd';
import OrgForm from './org-form';

const { TreeNode } = Tree;

const OrgCard = (state) => {
  console.log(state);
  return (
    <div>
      <Row className="detail" gutter={8}>
        <Col className="detail_tree" span={12}>
          <div>
            <Row>
              <Col span={4}>
                <span>关键词</span>
              </Col>
              <Col span={10}>
                <Input size="small" />
              </Col>
              <Col span={10}>
                <Button icon="search" size="small">查找</Button>
                <Button icon="reload" size="small">刷新</Button>
              </Col>
            </Row>
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
        <Col className="detail_form" span={12}>
          <OrgForm {...state} />
        </Col>
      </Row>
    </div>
  );
};
export default OrgCard;
