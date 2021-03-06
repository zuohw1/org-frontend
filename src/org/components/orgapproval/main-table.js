import React from 'react';
import {
  Table,
  Modal,
  Pagination,
  Button,
  Divider,
} from 'antd';
import Model from './card';

const { confirm } = Modal;

/* table size统一设置为small 固定表头，
   scroll={{ y: document.body.scrollHeight - 460 }}
   460为其他控件宽度之和
*/
export default ({
  tableData,
  actions,
  record,
  search,
  modal,
  form,
  loading, formEdit, refModal, refSelectData,
}) => {
  const {
    setModeShow,
    getRecord,
    updateRecord,
    deleteRecord,
    listTable,
  } = actions;
  const onClickView = (_, row) => {
    getRecord(row, true, false);
  };

  const onClickAdd = () => {
    setModeShow(true, true);
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

  /* 修改 */
  const onSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        /* eslint no-console: 0 */
        updateRecord(values);
        form.resetFields();
      }
    });
  };

  const onCancel = (e) => {
    e.preventDefault();
    form.resetFields();
    getRecord({}, false, true);
  };

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
    width: 80,
  }, {
    title: '文件名称和文号',
    dataIndex: 'DOC_CODE',
    key: 'DOC_CODE',
    align: 'center',
    width: 400,
  }, {
    title: '发起人',
    dataIndex: 'ATTRIBUTE8',
    key: 'ATTRIBUTE8',
    align: 'center',
    width: 150,
  }, {
    title: '发起时间',
    dataIndex: 'ATTRIBUTE9',
    key: 'ATTRIBUTE9',
    align: 'center',
    width: 120,
  }, {
    title: '文件拟稿人',
    dataIndex: 'DOC_VERIFIER',
    key: 'DOC_VERIFIER',
    align: 'center',
    width: 150,
  }, {
    title: '状态',
    dataIndex: 'DOC_STATUS',
    key: 'DOC_STATUS',
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
    title: '审批人',
    dataIndex: 'ATTRIBUTE10',
    key: 'ATTRIBUTE10',
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
      <Modal
        title="变更依据"
        visible={modal}
        onOk={formEdit ? onSubmit : onCancel}
        onCancel={onCancel}
        maskClosable={false}
        destroyOnClose
        width={1200}
      >
        <Model
          record={record}
          form={form}
          actions={actions}
          formEdit={formEdit}
          refModal={refModal}
          refSelectData={refSelectData}
        />
      </Modal>
      <Button
        type="primary"
        style={{ margin: '10px 0' }}
        onClick={onClickAdd}
      >新增
      </Button>
      <Table columns={getFields()} loading={loading} dataSource={data} pagination={false} size="small" bordered scroll={{ y: document.body.scrollHeight }} />
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
