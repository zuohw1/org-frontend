import React from 'react';
import { Tree, TreeSelect } from 'antd';
import request from '../utils/request';

const { TreeNode } = Tree;

/**
 * 异步加载的TreeSelect
 *
 * 使用方法：
 * const refUrl = 'org/getChildrenData?id=';
 * const url = 'org/getData?id=';
 * const treeSelectChange = (value, label, extra) => {
    form.setFieldsValue({
      orgid: `${extra.triggerNode.props.id}`,
    });
    }
 * <AsyncTreeSelect
 * treeId={37838}
 * treeSelectChange={treeSelectChange}
 * refUrl={refUrl}
 * url={url}
 * checkbox/>
 */
class AsyncTreeSelect extends React.PureComponent {
  state = {
    value: undefined,
    treeData: [],
  };

  /**
   *第一次渲染后调用,初始化本级
   * @returns {void}
   */
  async componentDidMount() {
    const { treeId, url } = this.props;
    const result = await request.get(`${url}${treeId}`);
    this.setState({ treeData: result });
  }

  /**
   * 打开节点后加载下级
   * @param treeNode
   * @returns {Promise<any>}
   */
  onLoadData = (treeNode) => {
    const { treeData } = this.state;
    const { dataRef } = treeNode.props;
    const { refUrl } = this.props;
    return new Promise(async (resolve) => {
      dataRef.children = await request.get(`${refUrl}${dataRef.id}`);
      this.setState({
        treeData: [...treeData],
      });
      resolve();
    });
  };

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
  };

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
  };

  render() {
    const { treeData, value } = this.state;
    return (
      <TreeSelect
        treeDefaultExpandAll
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        loadData={this.onLoadData}
        placeholder="请选择"
        onChange={this.onChange}
      >
        {this.renderTreeNodes(treeData)}
      </TreeSelect>
    );
  }
}
export default AsyncTreeSelect;
