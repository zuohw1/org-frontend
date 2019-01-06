import {
  Button, Col, Row, Tree, Input, Modal,
} from 'antd';
import React from 'react';
import request from '../../../../utils/request';

const { TreeNode } = Tree;
const { Search } = Input;

export default (props) => {
  const {
    treeData, actions, checkedKeys, expandKeys, loadedKeys, form,
  } = props;

  const {
    refreshTree,
    getTreeChildren,
    setTreeCheckedKeys,
    onExpandKeys,
    getTreeByName,
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
        const result = await request.get(`auth/getAuthSubOrgs?topId=${id}`);
        dataRef.children = result;
        getTreeChildren(treeData);
        resolve();
      }, 1000);
    });
  };

  const onCheck = (_, info) => {
    if (info.checked && info.node.props.id !== '~') {
      setTimeout(async () => {
        const docHeaderId = props.location.pathData.id;
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
          form.setFieldsValue({
            parentOrgId: info.node.props.id,
            parentOrgName: info.node.props.title,
          });
        }
      }, 1000);
    } else {
      setTreeCheckedKeys([]);
      form.setFieldsValue({
        parentOrgId: '',
        parentOrgName: '',
      });
    }
  };

  const onSearch = (value) => {
    getTreeByName(value);
  };

  const onRefresh = () => {
    refreshTree();
  };

  const onExpand = (expandedKeys) => {
    onExpandKeys(expandedKeys);
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
      <Row>
        <Col span={3}>
          <span>组织名</span>
        </Col>
        <Col span={21}>
          <Search onSearch={value => onSearch(value)} style={{ width: 200 }} />
          <Button icon="reload" size="small" onClick={onRefresh}>刷新</Button>
        </Col>
      </Row>
      <Row className="detail_tree">
        <Tree
          checkable
          defaultExpandAll
          loadData={onLoadData}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          checkStrictly
          onExpand={onExpand}
          expandedKeys={expandKeys}
          loadedKeys={loadedKeys}
        >
          {renderTreeNodes(treeData)}
        </Tree>
      </Row>
    </div>
  );
};
