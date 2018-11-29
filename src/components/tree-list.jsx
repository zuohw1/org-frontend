import React from 'react';
import {
  Tree, Table, Row, Col, Input, Pagination,
} from 'antd';
import request from '../utils/request';
import './assets/styles/tree-list.less';

const { Search } = Input;

/**
 * 左树右表
 * <TreeList
 treeId={37838}
 treeUrl={treeUrl}
 columns={refColumns}
 refUrl={refUrl}
 refCodes={refCodes}
 refSelectData={refSelectData}
 onConfirm={onConfirm}
 />
 const onConfirm = () => {//双击表格数据后回写值与关闭model
    const data = { ...record, ...refSelectData };
    setRefSelectData(data, false);
  };

 const treeUrl = 'org/allData?id=';//树url
 const refCodes = [{ code: 'DOC_CODE', refcode: 'docCode' }];//表格与界面字段对应
 const refColumns = [{//表格显示字段
    title: '文件名称和文号',
    dataIndex: 'docCode',
    key: 'docCode',
    align: 'center',
    width: 100,
  }, {
    title: '文件拟稿人',
    dataIndex: 'docVerifier',
    key: 'docVerifier',
    align: 'center',
    width: 80,
  }];
 const refUrl = 'orgHeaderBatch/list';//表格url
 const refSelectData = {};//表格选中数据
 */
class TreeList extends React.PureComponent {
  state = {
    treeData: [],
    search: {
      pageNumber: 1,
      pageSize: 10,
      name: '',
    },
    refData: {
      current: 1, pages: 0, records: Array(0), size: 10, total: 0,
    },
    tableLoading: false,
    selectedKey: '',
  };

  /**
   *第一次渲染后调用
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    const { treeId, treeUrl } = this.props;
    const treeData = await request.get(`${treeUrl}${treeId}`);
    this.setState({ treeData });
  }

  formatTableData = (tableData) => {
    const num = tableData.current * 10 - 10;
    const table = tableData.records.map((item, index) => {
      return { ...item, key: index + 1 + num };
    });
    return { ...tableData, records: table };
  };

  onSearch = (value) => {
    const { refUrl } = this.props;
    const { search, selectedKey } = this.state;
    search.name = value;
    this.setState(search);
    this.refreshData(refUrl, search, selectedKey);
  };

  onChangePage = (pageNumber, pageSize) => {
    const { refUrl } = this.props;
    const { search, selectedKey } = this.state;
    const searchF = { ...search, pageSize, pageNumber };
    this.refreshData(refUrl, searchF, selectedKey);
  };

  onChangePageSize = (current, size) => {
    const { refUrl } = this.props;
    const { search, selectedKey } = this.state;
    const searchF = { ...search, pageSize: size, pageNumber: current };
    this.refreshData(refUrl, searchF, selectedKey);
  };

  refreshData = (refUrl, search, selectedKey) => {
    this.setState({ tableLoading: true, selectedKey });
    return new Promise(async (resolve) => {
      let url = `${refUrl}?pageNumber=${search.pageNumber}&pageSize=${search.pageSize}`;
      if (search.name && search.name !== '') {
        url += `&name=${search.name}`;
      }
      url += `&orgid=${selectedKey}`;
      console.log(url);
      const tableData = await request.get(url);
      const formatTable = this.formatTableData(tableData);
      this.setState({ refData: formatTable, tableLoading: false });
      resolve();
    });
  };

  treeSelect = (selectedKeys) => {
    const { refUrl } = this.props;
    const { search } = this.state;
    this.refreshData(refUrl, search, selectedKeys[0]);
  }

  render() {
    const {
      columns, placeholder, refCodes, refSelectData, onConfirm,
    } = this.props;
    const {
      refData, tableLoading, treeData,
    } = this.state;
    const {
      current, size, total, records,
    } = refData;

    return (
      <div className="setting-treelist">
        <Row type="flex" justify="space-around">
          <Col span={7}>
            <Tree
              onSelect={this.treeSelect}
              treeData={treeData}
              style={{ height: 360, overflow: 'scroll' }}
            />
          </Col>
          <Col span={1} className="tree-border" />
          <Col span={16}>
            <Search
              style={{ marginBottom: 8 }}
              placeholder={placeholder}
              onSearch={this.onSearch}
            />
            <Table
              columns={columns}
              dataSource={records}
              size="small"
              pagination={false}
              bordered
              scroll={{ y: 300 }}
              loading={tableLoading}
              onRow={(record) => {
                return {
                  /* 双击行事件，执行确定动作，回写选中数据，关闭modal框 */
                  onDoubleClick: () => {
                    refCodes.map((item) => {
                      /* eslint-disable no-param-reassign,no-return-assign */
                      return refSelectData[item.code] = record[item.refcode];
                    });
                    onConfirm();
                  },
                };
              }}
            />
            <Pagination
              size="small"
              showQuickJumper
              current={current}
              total={total}
              pageSize={size}
              onChange={this.onChangePage}
              onShowSizeChange={this.onChangePageSize}
              showTotal={tota => `共 ${tota} 条`}
              showSizeChanger
              style={{ marginTop: 10, float: 'right' }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
export default TreeList;
