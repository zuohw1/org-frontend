import React from 'react';
import { TreeSelect } from 'antd';
import request from '../utils/request';

/**
 * 同步TreeSelect
 * const refUrl = 'org/allData?id=';
 * <SyncTreeSelect treeId={37838} treeSelectChange={treeSelectChange} refUrl={refUrl} checkbox/>
 */
class syncTreeSelect extends React.PureComponent {
  state = {
    value: undefined,
    treeData: [],
  }

  /**
   *第一次渲染后调用
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    const { treeId, refUrl } = this.props;
    const treeData = await request.get(`${refUrl}${treeId}`);
    this.setState({ treeData });
  }

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

  render() {
    const { treeData, value } = this.state;
    const { checkbox } = this.props;
    return (
      <TreeSelect
        allowClear
        showSearch
        treeCheckable={checkbox}
        style={{ width: 220 }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择"
        onChange={this.onChange}
        treeData={treeData}
      />
    );
  }
}
export default syncTreeSelect;
