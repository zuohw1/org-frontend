/* eslint-disable no-debugger */
import React from 'react';
import '../assets/styles/detail-org-form.less';
import {
  Button, Tree, Row, Col, Input,
} from 'antd';
import OrgForm from './org-form';
import request from '../../../utils/request';

const { TreeNode } = Tree;

const OrgCard = (state) => {
  console.log(state);

  const { actions } = state;
  const {
    getTreeChildren,
  } = actions;

  const onLoadData = (treeNode) => {
    const { dataRef } = treeNode.props;
    return new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      setTimeout(async () => {
        const id = dataRef.key;
        const result = await request.get(`organization/getSubTreeByPid?topId=${id}`);
        dataRef.children = result;
        getTreeChildren(state.treeData);
        resolve();
      }, 1000);
    });
  };

  const renderTreeNodes = (data) => {
    if (data.length > 0) {
      return data.map((item) => {
        if (item.children) {
          return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
              {renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode {...item} dataRef={item} />;
      });
    }
  };

  return (
    <div>
      <Row className="detail" gutter={8}>
        <Col className="detail_tree" span={12}>
          <div>
            <Row>
              <Col span={4}>
                <span>组织名</span>
              </Col>
              <Col span={10}>
                <Input size="small" />
              </Col>
              <Col span={10}>
                <Button icon="search" size="small">查找</Button>
                <Button icon="reload" size="small">刷新</Button>
              </Col>
            </Row>
            <Tree
              defaultExpandAll
              loadData={onLoadData}
            >
              {renderTreeNodes(state.treeData)}
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
