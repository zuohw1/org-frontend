import React from 'react';
import { TreeSelect, Tree } from 'antd';
import request from '../utils/request';

const TreeNode = Tree.TreeNode;

/**
 * 异步加载的TreeSelect
 * <AsyncTreeSelect treeId={37838} treeSelectChange={treeSelectChange}/>
 */
class AsyncTreeSelect extends React.PureComponent {

  /**
   * 回写form
   * const treeSelectChange = (value, label, extra) => {
    form.setFieldsValue({
      orgid: `${extra.triggerNode.props.id}`,
    });
  }
   * @param value
   * @param label
   * @param extra
   */
  onChange = (value, label, extra) => {
    this.setState({ value });
    const { treeSelectChange } = this.props;
    treeSelectChange(value, label, extra);
  }

  state = {
    value: undefined,
    treeData: [],
  }

  /**
   * 打开节点后加载下级
   * @param treeNode
   * @returns {Promise<any>}
   */
  onLoadData = (treeNode) => {
    const { treeData } = this.state;
    const { key } = treeNode.props.dataRef;
    return new Promise(async (resolve) => {
      const result = await request.get(`organizationAll/childrenTree?id=${key}`);
      treeNode.props.dataRef.children = result;
      this.setState({
        treeData: [...this.state.treeData],
      });
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
          <TreeNode {...item} dataRef={item}>
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
    const { treeId } = this.props;
    const result = await request.get(`organizationAll/orgTree?id=${treeId}`);
    this.setState({ treeData:result });
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
        placeholder="请选择"
        onChange={this.onChange}
      >
        {this.renderTreeNodes(this.state.treeData)}
      </TreeSelect>
    );
  }
}
export default AsyncTreeSelect;
