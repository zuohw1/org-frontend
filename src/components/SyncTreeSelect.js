import React from 'react';
import { TreeSelect, Tree } from 'antd';
import request from '../utils/request';

const TreeNode = Tree.TreeNode;

/**
 * 同步TreeSelect
 * const refUrl = 'org/allData?id=';
 * <SyncTreeSelect treeId={37838} treeSelectChange={treeSelectChange} refUrl={refUrl}/>
 */
class syncTreeSelect extends React.PureComponent {

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
   *第一次渲染后调用
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    const { treeId,refUrl } = this.props;
    const treeData = await request.get(refUrl+`${treeId}`);
    this.setState({ treeData});
  }

  render() {
    const { treeData } = this.state;
    console.log(treeData);
    return (
      <TreeSelect
        allowClear={true}
        showSearch
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择"
        onChange={this.onChange}
        treeData={treeData}
      >
      </TreeSelect>
    );
  }
}
export default syncTreeSelect;
