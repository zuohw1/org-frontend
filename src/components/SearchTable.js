import React from 'react';
import {Table, Input, Pagination} from 'antd';

const Search = Input.Search;

class SearchTable extends React.PureComponent {

  state = {
    search: {
      pageNumber:1,
      pageSize:10,
    },
    data : [],
  }

  componentDidMount() {
    const { refUrl,getRefData } = this.props;
    const { search } = this.state;
    getRefData(refUrl,search);
  }

  onSearch = (value) => {
    const { refUrl,getRefData } = this.props;
    const { search } = this.state;
    const searchF = { ...search,batchCode:value };
    console.log(searchF);
    getRefData(refUrl,searchF);
  }

  onChangePage = (pageNumber, pageSize) => {
    const { refUrl,getRefData } = this.props;
    const { search } = this.state;
    const searchF = { ...search, pageSize, pageNumber };
    getRefData(refUrl,searchF);
  };

  onChangePageSize = (current, size) => {
    const { refUrl,getRefData } = this.props;
    const { search } = this.state;
    const searchF = { ...search, pageSize: size, pageNumber: current };
    getRefData(refUrl,searchF);
  };

  render() {
    const { columns,refData,rowSelection } = this.props;
    const { current, size, total, records } = refData;

    return (
      <div>
        <Search style={{ width: 300 }} placeholder="Search" onSearch={this.onSearch} />
        <Table columns={columns} dataSource={records}
               pagination={false} size="small"
               rowSelection={rowSelection}/>
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

export default SearchTable;
