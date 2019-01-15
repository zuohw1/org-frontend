import React from 'react';
import {
  Row, Modal, Col, Checkbox, Button, Tree, Input,
} from 'antd';
import request from '../utils/request';

const { Search } = Input;
const { TreeNode } = Tree;

class OrgTree extends React.PureComponent {
  state = {
    checkedKeys: [],
    treeData: {},
    showDisabled: 'N',
    init: true,
    expandKeys: [],
  }

  onSearch = (value) => {
    const { showDisabled } = this.state;
    const { versionId } = this.props;
    return new Promise((resolve) => {
      setTimeout(async () => {
        const result = await request.get(`orgStructure/getSubTreeByName?versionId=${versionId}&name=${value}&showDisabled=${showDisabled}`);
        this.setState({ treeData: result });
        resolve();
      }, 1000);
    });
  };

  onChange = (e) => {
    const value = e.target.checked ? 'Y' : 'N';
    this.setState({ showDisabled: value });
  };

  onRefresh = () => {
    const { versionId } = this.props;
    const { showDisabled } = this.state;
    return new Promise((resolve) => {
      setTimeout(async () => {
        const result = await request.get(`orgStructure/getInitTree?versionId=${versionId}&showDisabled=${showDisabled}`);
        this.setState({ treeData: result, init: false, expandKeys: [result[0].key] });
        resolve();
      }, 1000);
    });
  };

  renderTreeNodes = (data) => {
    if (data.length > 0) {
      return data.map((item) => {
        if (item.children) {
          if (item.isDisabled === 'Y') {
            const msg = '<失效>';
            return (
              <TreeNode {...item} disabled dataRef={item} title={<span>{item.title}<span style={{ color: 'red' }}>{msg}</span></span>}>
                {this.renderTreeNodes(item.children)}
              </TreeNode>
            );
          } else {
            return (
              <TreeNode {...item} dataRef={item}>
                {this.renderTreeNodes(item.children)}
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

  onLoadData = (treeNode) => {
    const { dataRef } = treeNode.props;
    const { showDisabled } = this.state;
    const { versionId } = this.props;
    return new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      setTimeout(async () => {
        const id = dataRef.key;
        const result = await request.get(`orgStructure/getSubTree?orgId=${id}&versionId=${versionId}&showDisabled=${showDisabled}`);
        dataRef.children = result;
        const { treeData } = this.state;
        this.setState({
          treeData: [...treeData],
        });
        resolve();
      }, 1000);
    });
  };

  onCheck = (_, info) => {
    if (info.checked && info.node.props.id !== '~') {
      const { refCodes, refSelectData } = this.props;
      refCodes.map((item) => {
        /* eslint-disable no-param-reassign,no-return-assign */
        return refSelectData[item.code] = info.node.props[item.refcode];
      });
      this.setState({ checkedKeys: [info.node.props.id] });
    } else {
      this.setState({ checkedKeys: [] });
    }
  };

  render() {
    const {
      refCodes, refSelectData, setRefModeShow, refModal, parentForm,
    } = this.props;

    const {
      checkedKeys, treeData, init, expandKeys,
    } = this.state;

    if (refModal === true && init === true) {
      this.onRefresh();
    }

    const onRefSubmit = () => {
      parentForm.setFieldsValue(refSelectData);
      setRefModeShow(false);
    };

    const onRefCancel = () => {
      refCodes.map((item) => {
        /* eslint-disable no-param-reassign,no-return-assign */
        return refSelectData[item.code] = '';
      });
      setRefModeShow(null, false);
    };

    const onExpand = (expandedKeys) => {
      this.setState({ expandKeys: expandedKeys });
    };

    return (
      <Modal
        title="参照"
        visible={refModal}
        onCancel={onRefCancel}
        onOk={onRefSubmit}
        maskClosable={false}
        destroyOnClose
        width={700}
      >
        <Row>
          <Col span={3}>
            <span>组织名</span>
          </Col>
          <Col span={21}>
            <Search onSearch={value => this.onSearch(value)} style={{ width: 200 }} />
            <Checkbox onChange={this.onChange}>显示失效</Checkbox>
            <Button icon="reload" size="small" onClick={this.onRefresh}>刷新</Button>
            <Button size="small" onClick={onRefSubmit}>确认</Button>
          </Col>
        </Row>
        <Row className="detail_tree">
          <Tree
            checkable
            loadData={this.onLoadData}
            onCheck={this.onCheck}
            checkedKeys={checkedKeys}
            onExpand={onExpand}
            expandedKeys={expandKeys}
            checkStrictly
          >
            {this.renderTreeNodes(treeData)}
          </Tree>
        </Row>
      </Modal>
    );
  }
}

export default OrgTree;
