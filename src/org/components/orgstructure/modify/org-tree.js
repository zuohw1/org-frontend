import {
  Button, Col, Row, Tree, Input, Modal, Checkbox,
} from 'antd';
import React from 'react';
import request from '../../../../utils/request';

const { TreeNode } = Tree;
const { Search } = Input;

export default (props) => {
  const {
    treeData, actions, checkedKeys, versionId, showDisabled, expandKeys,
  } = props;

  const {
    refreshTree,
    getTreeChildren,
    setTreeCheckedKeys,
    getTreeByName,
    updateShowDisabled,
    onExpandKeys,
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
        const result = await request.get(`orgStructure/getSubTree?orgId=${id}&versionId=${versionId}&showDisabled=${showDisabled}`);
        dataRef.children = result;
        getTreeChildren(treeData);
        resolve();
      }, 1000);
    });
  };

  const onCheck = (_, info) => {
    if (info.checked && info.node.props.id !== '~') {
      setTimeout(async () => {
        const orgId = info.node.props.id;
        const result = await request.get(`orgStructure/getManalAndbusinessCount?orgId=${orgId}`);
        if (result > 0) {
          Modal.info({
            title: '提示',
            content: (
              <div>
                <p>非常抱歉，该组织或其子组织正在进行组织结构变更或结构业务调整，目前不能再进行结构调整，请等变更同步成功后进行！</p>
              </div>
            ),
          });
        } else {
          setTreeCheckedKeys([info.node.props.id]);
        }
      }, 0);
    } else {
      setTreeCheckedKeys([]);
    }
  };

  const onSearch = (value) => {
    getTreeByName(value, versionId, showDisabled);
  };

  const onRefresh = () => {
    refreshTree(versionId, showDisabled);
  };

  const onChange = (e) => {
    updateShowDisabled(e.target.checked ? 'Y' : 'N');
  };

  const onExpand = (expandedKeys) => {
    onExpandKeys(expandedKeys);
  };

  const renderTreeNodes = (data) => {
    if (data.length > 0) {
      return data.map((item) => {
        if (item.children) {
          if (item.isDisabled === 'Y') {
            const msg = '<失效>';
            return (
              <TreeNode {...item} disabled dataRef={item} title={<span>{item.title}<span style={{ color: 'red' }}>{msg}</span></span>}>
                {renderTreeNodes(item.children)}
              </TreeNode>
            );
          } else {
            return (
              <TreeNode {...item} dataRef={item}>
                {renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
        }
        if (item.isDisabled === 'Y') {
          const msg = '<失效>';
          return <TreeNode {...item} disabled dataRef={item} title={<span>{item.title}<span style={{ color: 'red' }}>{msg}</span></span>} />;
        } else {
          return <TreeNode {...item} dataRef={item} />;
        }
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
          <Checkbox onChange={onChange}>显示失效</Checkbox>
          <Button icon="reload" size="small" onClick={onRefresh}>刷新</Button>
        </Col>
      </Row>
      <Row className="detail_tree">
        <Tree
          checkable
          loadData={onLoadData}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          checkStrictly
          expandedKeys={expandKeys}
          onExpand={onExpand}
        >
          {renderTreeNodes(treeData)}
        </Tree>
      </Row>
    </div>
  );
};
