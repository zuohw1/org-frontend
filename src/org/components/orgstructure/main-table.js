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
    redirectDetail('/org/structure/view', { id: row.orgStructureVersionId });
  };

  const onClickEdit = (_, row) => {
    redirectDetail('/org/structure/view', { id: row.orgStructureVersionId });
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
    title: '组织结构版本',
    dataIndex: 'structureName',
    key: 'structureName',
    align: 'center',
    width: 200,
  }, {
    title: '版本号',
    dataIndex: 'versionNumber',
    key: 'versionNumber',
    align: 'center',
    width: 60,
  }, {
    title: '版本产生',
    dataIndex: 'createStyle',
    key: 'createStyle',
    align: 'center',
    width: 80,
  }, {
    title: '开始日期',
    dataIndex: 'dateFrom',
    key: 'dateFrom',
    align: 'center',
    width: 80,
  }, {
    title: '结束日期',
    dataIndex: 'dateTo',
    key: 'dateTo',
    align: 'center',
    width: 80,
  }, {
    title: '是否有效',
    dataIndex: 'isEffective',
    key: 'isEffective',
    align: 'center',
    width: 80,
    render: (text) => {
      if (text === 'Y') {
        return '是';
      } else {
        return '否';
      }
    },
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 100,
    render: (text) => {
      if (text === 'N') {
        return '修改中';
      } else if (text === 'P') {
        return '同步中';
      } else if (text === 'O') {
        return '同步完成';
      } else if (text === 'E') {
        return '异常';
      } else {
        return '';
      }
    },
  }, {
    title: '操作人',
    dataIndex: 'createName',
    key: 'createName',
    align: 'center',
    width: 100,
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
          if (records.isEffective === 'Y' && records.status !== 'P') {
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
