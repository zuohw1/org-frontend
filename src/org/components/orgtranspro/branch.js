/* eslint-disable */
import React from 'react';
import { Input, Pagination, Table } from 'antd';
import request from '../../../utils/request';

const Search = Input.Search;
/*const refColumns = [{
  title: '组织',
  dataIndex: 'organization',
  key: 'organization',
  align: 'center',
}];*/
const refColumns = [{
  title: '序号',
  dataIndex: 'key',
  key: 'key',
  align: 'center',
}, {
  title: '文件名称和文号',
  dataIndex: 'docCode',
  key: 'docCode',
  align: 'center',
}, {
  title: '文件拟稿人',
  dataIndex: 'docVerifier',
  key: 'docVerifier',
  align: 'center',
}];

const rowSelection = {
  type: 'radio',
  onSelect: (row) => {
    refCodes.map((item) => {
      return refSelectData[item.code] = row[item.refcode];
    });
  },
};

class JobNumber extends React.PureComponent {
  state = {
    search: {
      pageNumber: 1,
      pageSize: 10,
    },
    refData: [],
    refUrl: 'orgHeaderBatch/all',
  };

  async componentDidMount() {
    const { refUrl } = this.state;
    const { search } = this.state;
    let url = `${refUrl}?pageNumber=${search.pageNumber}&pageSize=${search.pageSize}`;
    if (search.name && search.name !== '') {
      url += `&name=${search.name}`;
    }
    const tableData = await request.get(url);
    const formatTable = this.formatTableData(tableData);
    this.setState({ refData: formatTable });
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
    const { search } = this.state;
    const searchF = { ...search, name: value };
    this.refreshData(refUrl, searchF);
  };

  onChangePage = (pageNumber, pageSize) => {
    const { refUrl } = this.props;
    const { search } = this.state;
    const searchF = { ...search, pageSize, pageNumber };
    this.refreshData(refUrl, searchF); 
  };

  onChangePageSize = (current, size) => {
    const { refUrl } = this.props;
    const { search } = this.state;
    const searchF = { ...search, pageSize: size, pageNumber: current };
    this.refreshData(refUrl, searchF);
  };

  refreshData = (refUrl, search) => {
    return new Promise(async (resolve) => {
      let url = `${refUrl}?pageNumber=${search.pageNumber}&pageSize=${search.pageSize}`;
      if (search.name && search.name !== '') {
        url += `&name=${search.name}`;
      }
      const tableData = await request.get(url);
      const formatTable = this.formatTableData(tableData);
      this.setState({ refData: formatTable });
      resolve();
    });
  };

  render() {
    const { rowSelection } = this.props;
    const { refData } = this.state;
    const {
      current, size, total, records,
    } = refData;

    return (
      <div>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={value => console.log(value)}
        />
        <Table
          columns={refColumns}
          dataSource={records}
          pagination={false}
          size="small"
          rowSelection={rowSelection}
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
      </div>
    );
  }
}

export default JobNumber;
