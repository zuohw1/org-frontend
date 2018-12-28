/* eslint-disable no-debugger */
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
    redirectDetail('/org/changeDetail');
  };

  const onClickView = (_, row) => {
    debugger;
    redirectDetail('/org/managerView', { id: row.docHeaderId });
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
      } else {
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
      if (text === 'S') {
        return '暂存';
      } else if (text === 'E1') {
        return '审批中';
      } else if (text === 'C') {
        return '退回';
      } else if (text === 'E2') {
        return '成本维护';
      } else if (text === 'E3') {
        return '人事处理';
      } else if (text === 'E4') {
        return '组织撤销';
      } else if (text === 'E5') {
        return '等待撤销';
      } else if (text === 'T1') {
        return '等待同步';
      } else if (text === 'T2') {
        return '同步中';
      } else if (text === 'T3') {
        return '同步成功';
      } else if (text === 'T4') {
        return '同步错误';
      } else if (text === 'T5') {
        return '同步异常';
      } else if (text === 'T6') {
        return '撤销异常';
      } else if (text === 'T7') {
        return '撤销成功';
      } else if (text === 'O') {
        return '结束';
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
        render: (text, records) => {
          if (records.docStatus === 'S') {
            if (records.batchId !== '') {
              return (
                <span>
                  <a href=" javascript:;" onClick={() => onClickView(text, records)}>查看</a>
                  <Divider type="vertical" />
                  <a href=" javascript:;" onClick={() => onClickEdit(text, records)}>修改</a>
                  <Divider type="vertical" />
                  <a href=" javascript:;" onClick={() => onClickDelete(records)}>删除</a>
                  <Divider type="vertical" />
                  <a href=" javascript:;" onClick={() => onClickDelete(records)}>前置流程</a>
                </span>
              );
            } else {
              return (
                <span>
                  <a href=" javascript:;" onClick={() => onClickView(text, records)}>查看</a>
                  <Divider type="vertical" />
                  <a href=" javascript:;" onClick={() => onClickEdit(text, records)}>修改</a>
                  <Divider type="vertical" />
                  <a href=" javascript:;" onClick={() => onClickDelete(records)}>删除</a>
                </span>
              );
            }
          }
          if (records.docStatus === 'C') {
            if (records.batchId !== '') {
              return (
                <span>
                  <a href=" javascript:;" onClick={() => onClickView(text, records)}>查看</a>
                  <Divider type="vertical" />
                  <a href=" javascript:;" onClick={() => onClickEdit(text, records)}>修改</a>
                  <Divider type="vertical" />
                  <a href=" javascript:;" onClick={() => onClickDelete(records)}>删除</a>
                  <Divider type="vertical" />
                  <a href=" javascript:;" onClick={() => onClickDelete(records)}>查看原因</a>
                  <Divider type="vertical" />
                  <a href=" javascript:;" onClick={() => onClickDelete(records)}>前置流程</a>
                </span>);
            } else {
              return (
                <span>
                  <a href=" javascript:;" onClick={() => onClickView(text, records)}>查看</a>
                  <Divider type="vertical" />
                  <a href=" javascript:;" onClick={() => onClickEdit(text, records)}>修改</a>
                  <Divider type="vertical" />
                  <a href=" javascript:;" onClick={() => onClickDelete(records)}>删除</a>
                  <Divider type="vertical" />
                  <a href=" javascript:;" onClick={() => onClickDelete(records)}>查看原因</a>
                </span>);
            }
          }
          if (records.docStatus !== 'S' && records.docStatus !== 'C') {
            if (records.batchId !== '') {
              return (
                <span>
                  <a href=" javascript:;" onClick={() => onClickView(text, records)}>查看</a>
                  <Divider type="vertical" />
                  <a href=" javascript:;" onClick={() => onClickEdit(text, records)}>查看流程图</a>
                  <Divider type="vertical" />
                  <a href=" javascript:;" onClick={() => onClickDelete(records)}>前置流程</a>
                </span>
              );
            } else {
              return (
                <span>
                  <a href=" javascript:;" onClick={() => onClickView(text, records)}>查看</a>
                  <Divider type="vertical" />
                  <a href=" javascript:;" onClick={() => onClickEdit(text, records)}>查看流程图</a>
                </span>
              );
            }
          }
        },
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
      <Table columns={getFields()} loading={loading} dataSource={data} pagination={false} size="small" bordered scroll={{ y: document.body.scrollHeight - 460 }} />
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
