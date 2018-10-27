import React from 'react';
import {
  Table,
  Modal,
  Pagination,
  Button,
  Divider,
} from 'antd';
import Model from './model';

const { confirm } = Modal;

export default ({
  tableData,
  actions,
  record,
  search,
  modal,
  form,
  tableCols,
  loading, formEdit, refmodal,
}) => {
  const {
    isModeShow,
    getRecord,
    updataRecord,
    deleteRecord,
    listTable,
  } = actions;
  const onClickView = (_, row) => {
    getRecord(row);
    isModeShow(true, false);
  };

  const onClickAdd = () => {
    isModeShow(true, true);
  };

  const onClickEdit = (_, row) => {
    getRecord(row);
    isModeShow(true, true);
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
        console.log('Received values of form: ', values);
        updataRecord(values);
        form.resetFields();
      }
    });
  };

  const onCancel = (e) => {
    e.preventDefault();
    isModeShow(false);
    form.resetFields();
    getRecord({});
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

  function getFields() {
    const children = [];
    for (let i = 0; i < tableCols.length; i++) {
      children.push(tableCols[i]);
    }
    children.push(
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (text, records) => (
          <span>
            <a href="javascript:;" onClick={() => onClickView(text, records)}>查看</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => onClickEdit(text, records)}>修改</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => onClickDelete(records)}>删除</a>
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
          refmodal={refmodal}
        />
      </Modal>
      <Button
        type="primary"
        style={{ margin: '20px 0' }}
        onClick={onClickAdd}
      >新增
      </Button>
      <Table columns={getFields()} loading={loading} dataSource={data} pagination={false} />
      <Pagination
        showQuickJumper
        current={current}
        total={total}
        pageSize={size}
        onChange={onChange}
        onShowSizeChange={onChangePageSize}
        showTotal={tota => `共 ${tota} 条`}
        showSizeChanger
        style={{ marginTop: 10, float: 'right' }}
      />
    </div>
  );
};
