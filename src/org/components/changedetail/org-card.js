/* eslint-disable no-debugger */
import React from 'react';
import '../assets/styles/detail-org-form.less';
import {
  Button, Tree, Row, Col, Input, Modal,
} from 'antd';
import OrgForm from './org-form';
import request from '../../../utils/request';

const { TreeNode } = Tree;
const { Search } = Input;

const OrgCard = (state) => {
  const {
    actions, checkedKeys, expandKeys, loadedKeys,
  } = state;
  const {
    getTreeChildren, setTreeCheckedKeys, refreshTree, getTreeByName, onExpandKeys,
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
        const result = await request.get(`organization/getAuthSubOrgs?topId=${id}`);
        dataRef.children = result;
        getTreeChildren(state.treeData);
        resolve();
      }, 1000);
    });
  };

  const onCheck = (_, info) => {
    if (info.checked && info.node.props.id !== '~') {
      setTimeout(async () => {
        const docHeaderId = state.location.pathData.id;
        const orgId = info.node.props.id;
        const result = await request.get(`orgCreate/checkOrgIsDelete?docHeaderId=${docHeaderId}&orgId=${orgId}`);
        if (result.head !== '') {
          Modal.error({
            title: '提示',
            content: (
              <div>
                <p>{result.head}</p>
                {
                  result.list.map((item) => {
                    return <p>{item}</p>;
                  })
                }
                <p>{result.tail}</p>
              </div>
            ),
          });
        } else {
          setTreeCheckedKeys([info.node.props.id]);
          state.form.setFieldsValue({
            parentOrgId: info.node.props.id,
            parentOrgName: info.node.props.title,
          });
        }
      }, 1000);
    } else {
      setTreeCheckedKeys([]);
      state.form.setFieldsValue({
        parentOrgId: '',
        parentOrgName: '',
      });
    }
  };

  const onExpand = (expandedKeys) => {
    onExpandKeys(expandedKeys);
  };

  const onSearch = (value) => {
    getTreeByName(value);
  };

  const onRefresh = () => {
    refreshTree();
  };

  const renderTreeNodes = (data) => {
    if (data.length > 0) {
      return data.map((item) => {
        if (item.children) {
          return (
            <TreeNode {...item} dataRef={item}>
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
        <Col span={12}>
          <Row>
            <Col span={4}>
              <span>组织名</span>
            </Col>
            <Col span={14}>
              <Search onSearch={value => onSearch(value)} style={{ width: 200 }} />
              <Button icon="reload" size="small" onClick={onRefresh}>刷新</Button>
            </Col>
          </Row>
          <div className="detail_tree">
            <Tree
              checkable
              loadData={onLoadData}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              checkStrictly
              onExpand={onExpand}
              expandedKeys={expandKeys}
              loadedKeys={loadedKeys}
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
