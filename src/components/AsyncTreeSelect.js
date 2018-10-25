import React from 'react';
import { TreeSelect, Tree } from 'antd';
import request from '../utils/request';

const TreeNode = Tree.TreeNode;

/**
 * 异步加载的TreeSelect
 */
class AsyncTreeSelect extends React.PureComponent {
  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  }
  state = {
    value: undefined,
    treeData: [],
    raw: [],
  }

  /**
   * 打开节点后加载下级
   * @param treeNode
   * @returns {Promise<any>}
   */
  onLoadData = (treeNode) => {
    const { raw, treeData } = this.state;
    const { value } = treeNode.props;
    return new Promise(async (resolve) => {
      const result = await request.get(`organizationAll/tree?id=${value}&isSelf=false`);
      const mappedResult = result.map(item => ({
        key: item.key,
        title: item.title,
        value: item.value,
        extra: item,
      }));
      const parent = raw.find(item => parseInt(item.value, 10) === parseInt(value, 10));
      if (parent) {
        Object.assign(parent, {
          children: mappedResult,
        });
      }
      const newRaw = [...raw, ...mappedResult];
      this.setState({ treeData: [...treeData], raw: newRaw });
      resolve();
    });
  }

  /**
   * 渲染树节点
   * @param data
   * @returns {*}
   */
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} value={item.value} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  }

  /**
   *第一次渲染后调用,初始化本级
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    const result = await request.get('organizationAll/tree?id=101&isSelf=true');
    const treeData = (result || []).map(item => ({
      key: item.key,
      title: item.title,
      value: item.value,
      extra: item,
    }));
    this.setState({ treeData, raw: treeData });
  }

  render() {
    const { treeData } = this.state;
    console.log(treeData);
    return (
      <TreeSelect
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        loadData={this.onLoadData}
        placeholder="Please select"
        onChange={this.onChange}
      >
        {this.renderTreeNodes(this.state.treeData)}
      </TreeSelect>
    );
  }
}
export default SearchTreeSelect;
