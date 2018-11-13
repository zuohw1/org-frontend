import React from 'react';
import {
  Table,
  Modal,
  Pagination,
  Button,
  Divider,
} from 'antd';

const { confirm } = Modal;

/* table size统一设置为small 固定表头，
   scroll={{ y: document.body.scrollHeight - 460 }}
   460为其他控件宽度之和
*/
export default ({
  tableData,
  actions,
  search,
  loading,
}) => {
  const {
    getRecord,
    deleteRecord,
    listTable,
    redirectDetail,
  } = actions;

  const onClickAdd = () => {
    redirectDetail('/org/changeDetail', { name: 'main-table' });
  };

  const onClickView = (_, row) => {
    getRecord(row, true, false);
  };

  const onClickEdit = (_, row) => {
    getRecord(row, true, true);
  };

  const onClickDelete = (row) => {
    confirm({
      title: '确定要删除本条记录吗?',
      onOk() {
        deleteRecord(row);
      },
    });
  };

  const data = tableData.records;

  const onChange = (pageNumber, pageSize) => {
    const searchF = { ...search, pageSize, pageNumber };
    listTable(searchF);
  };

  const onChangePageSize = (current, size) => {
    const searchF = { ...search, pageSize: size, pageNumber: current };
    listTable(searchF);
  };

  const { current, size, total } = tableData;

  /* 列表字段 */
  const tableCols = [{
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    align: 'center',
    width: 50,
  }, {
    title: '是否有批文',
    dataIndex: 'isApprove',
    key: 'isApprove',
    align: 'center',
    width: 100,
    render: (text) => {
      if (text === 'Y') {
        return '有批文';
      } else if (text === 'N') {
        return '无批文';
      }
    },
  }, {
    title: '变更依据编号',
    dataIndex: 'docCode',
    key: 'docCode',
    align: 'center',
    width: 150,
  }, {
    title: '日期',
    dataIndex: 'docDate',
    key: 'docDate',
    align: 'center',
    width: 100,
  }, {
    title: '校验人',
    dataIndex: 'docVerifier',
    key: 'docVerifier',
    align: 'center',
    width: 150,
  }, {
    title: '状态',
    dataIndex: 'attribute1',
    key: 'attribute1',
    align: 'center',
    width: 100,
    render: (text) => {
      if (text === '0') {
        return '暂存中';
      } else if (text === '1') {
        return '审批中';
      } else if (text === '2') {
        return '审批完成';
      }
    },
  }, {
    title: '当前处理人',
    dataIndex: 'toDoPerson',
    key: 'toDoPerson',
    align: 'center',
    width: 150,
  }];

  function getFields() {
    const children = [];
    for (let i = 0; i < tableCols.length; i += 1) {
      children.push(tableCols[i]);
    }
    children.push(
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        width: 240,
        render: (text, records) => (
          <span>
            <a href=" javascript:;" onClick={() => onClickView(text, records)}>查看</a>
            <Divider type="vertical" />
            <a href=" javascript:;" onClick={() => onClickEdit(text, records)}>修改</a>
            <Divider type="vertical" />
            <a href=" javascript:;" onClick={() => onClickDelete(records)}>删除</a>
          </span>
        ),
      },
    );
    return children;
  }

  return (
    <div>
      <Button
        type="primary"
        onClick={onClickAdd}
        style={{ margin: '10px 0' }}
      >新增
      </Button>
      <Table columns={getFields()} loading={loading} dataSource={data} pagination={false} size="small" scroll={{ y: document.body.scrollHeight - 460 }} />
      <Pagination
        showQuickJumper
        current={current}
        total={total}
        pageSize={size}
        onChange={onChange}
        onShowSizeChange={onChangePageSize}
        showTotal={tota => `共 ${tota} 条`}
        showSizeChanger
        style={{ marginTop: 10, marginRight: 20, float: 'right' }}
      />
    </div>
  );
};
