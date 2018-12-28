import React from 'react';
import {
  Input, Pagination, Table, Row, Modal,
} from 'antd';
import moment from 'moment';
import request from '../utils/request';

/**
 * 表格参照
 * const refCodes = [{ code: 'DOC_CODE', refcode: 'docCode' },
 * { code: 'DOC_VERIFIER', refcode: 'docVerifier' }];
 * const refColumns = [{
 *   title: '序号',
    dataIndex: 'key',
    key: 'key',
  }, {
    title: '文件名称和文号',
    dataIndex: 'docCode',
    key: 'docCode',
  }, {
    title: '文件拟稿人',
    dataIndex: 'docVerifier',
    key: 'docVerifier',
  }];
 const refUrl = 'orgHeaderBatch/list';
 * <SearchTable
 * refUrl={refUrl}
 * columns={refColumns}
 * refCodes={refCodes}
 * refSelectData={refSelectData} 临时存参照选中记录
 * setRefModeShow={setRefModeShow} 更新是否弹出属性方法
 * refModal={refModal} 参照modal框是否弹出
 * parentForm={form} 父表单，用于回写参照选择的数据到父表单
 * placeholder="名称"
 * />
 */
class SearchTable extends React.PureComponent {
  state = {
    search: {
      pageNumber: 1,
      pageSize: 10,
      name: '',
    },
    refData: {
      current: 1, pages: 0, records: Array(0), size: 10, total: 0,
    },
    tableLoading: false,
    selectedRowKeys: [],
    onSelect: (row) => {
      const { refCodes, refSelectData } = this.props;
      this.setState({ selectedRowKeys: [row.key] });
      refCodes.map((item) => {
        /* eslint-disable no-param-reassign,no-return-assign */
        if (item.type && item.type === 'Date') {
          return refSelectData[item.code] = moment(row[item.refcode], 'YYYY/MM/DD');
        } else {
          return refSelectData[item.code] = row[item.refcode];
        }
      });
    },
  };

  async componentDidMount() {
    const { refUrl } = this.props;
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
    search.name = value;
    this.setState(search);
    this.refreshData(refUrl, search);
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
    this.setState({ tableLoading: true });
    return new Promise(async (resolve) => {
      let url = `${refUrl}?pageNumber=${search.pageNumber}&pageSize=${search.pageSize}`;
      if (search.name && search.name !== '') {
        url += `&name=${search.name}`;
      }
      const tableData = await request.get(url);
      const formatTable = this.formatTableData(tableData);
      this.setState({ refData: formatTable, tableLoading: false, selectedRowKeys: [] });
      resolve();
    });
  };

  render() {
    const {
      columns, placeholder, refCodes, refSelectData, setRefModeShow, refModal, parentForm,
    } = this.props;
    const {
      refData, tableLoading, selectedRowKeys, onSelect,
    } = this.state;
    const {
      current, size, total, records,
    } = refData;

    const rowSelection = { columnWidth: '30px', selectedRowKeys, onSelect };

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

    return (
      <Modal
        title="参照"
        visible={refModal}
        onOk={onRefSubmit}
        onCancel={onRefCancel}
        maskClosable={false}
        destroyOnClose
        width={900}
      >
        <Input.Search style={{ width: '300px', marginBottom: '5px' }} placeholder={placeholder} onSearch={this.onSearch} />
        <Row>
          <Table
            columns={columns}
            dataSource={records}
            size="small"
            rowSelection={rowSelection}
            pagination={false}
            bordered
            scroll={{ y: 300 }}
            loading={tableLoading}
            onRow={(record) => {
              return {
                /* 单击行事件 */
                onClick: () => {
                  this.setState({ selectedRowKeys: [record.key] });
                  refCodes.map((item) => {
                    if (item.type && item.type === 'Date') {
                      return refSelectData[item.code] = moment(record[item.refcode], 'YYYY/MM/DD');
                    } else {
                      return refSelectData[item.code] = record[item.refcode];
                    }
                  });
                },
                /* 双击行事件，执行确定动作，回写选中数据，关闭modal框 */
                onDoubleClick: () => {
                  onRefSubmit();
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
        </Row>
      </Modal>
    );
  }
}

export default SearchTable;
