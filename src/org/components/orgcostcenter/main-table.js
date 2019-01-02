import React from 'react';
import {
  Divider, Pagination, Table,
} from 'antd';


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
    listTable,
    redirectDetail,
  } = actions;

  const onClickView = (_, row) => {
    redirectDetail('/org/costCenter/view', { id: row.orgStructureVersionId });
  };

  const onClickEdit = (_, row) => {
    redirectDetail('/org/costCenter/edit', { id: row.orgStructureVersionId });
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
    title: '变更人名称',
    dataIndex: 'employeeName',
    key: 'employeeName',
    align: 'center',
    width: 150,
  }, {
    title: '变更人编号',
    dataIndex: 'employeeNumber',
    key: 'employeeNumber',
    align: 'center',
    width: 60,
  }, {
    title: '变更日期',
    dataIndex: 'costDate',
    key: 'costDate',
    align: 'center',
    width: 80,
  }, {
    title: '变更理由',
    dataIndex: 'costDescription',
    key: 'costDescription',
    align: 'center',
    width: 200,
  }, {
    title: '记录状态',
    dataIndex: 'costStatus',
    key: 'costStatus',
    align: 'center',
    width: 80,
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
        width: 100,
        render: (text, records) => {
          if (records.costStatus !== '同步成功') {
            return (
              <span>
                <a href=" javascript:;" onClick={() => onClickView(text, records)}>查看</a>
                <Divider type="vertical" />
                <a href=" javascript:;" onClick={() => onClickEdit(text, records)}>修改</a>
              </span>
            );
          } else {
            return (
              <span>
                <a href=" javascript:;" onClick={() => onClickView(text, records)}>查看</a>
              </span>
            );
          }
        },
      },
    );
    return children;
  }

  return (
    <div>
      <Table columns={getFields()} loading={loading} dataSource={data} pagination={false} size="small" bordered scroll={{ y: document.body.scrollHeight - 360 }} />
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
