import ApprovalService from '../services/approval';

/* 格式化添加修改数据 */
const formatRecord = (record) => {
  const format = {
    ...record,
    /* 格式化日期 */
    DOC_DATE: record.DOC_DATE.format('YYYY-MM-DD'),
  };
  return format;
};

/* 格式化table数据 */
const formatTableData = (tableData) => {
  const num = tableData.current * tableData.size - tableData.size;
  const table = tableData.records.map((item, index) => {
    return { ...item, key: index + 1 + num };
  });
  return { ...tableData, records: table };
};

export default {
  namespace: 'orgApproval',
  state: {
    /* 列表数据 */
    tableData: {
      total: 0,
      size: 0,
      current: 1,
      records: [],
      pages: 0,
    },
    /* 卡片是否显示 */
    modal: false,
    /* 参照是否显示 */
    refModal: false,
    /* 参照选中数据 */
    refSelectData: {},
    /* 查询是否展开 */
    expand: false,
    /* 卡片表单是否可编辑 */
    formEdit: true,
    /* 卡片记录 */
    record: {},
    /* 查询条件数据 */
    search: {
      batchCode: '',
      workFlowStatus: '',
      batchVerifier: '',
      fullName: '',
      batDateS: '',
      batDateE: '',
      pageSize: 10,
      pageNumber: 1,
    },
  },
  reducers: {
    stateWillUpdate(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    /* 列表查询 */
    * fetch({ payload: { search } }, { call, put }) {
      const tableData = yield call(ApprovalService.list, search);
      const formatTable = formatTableData(tableData);
      yield put({
        type: 'stateWillUpdate',
        payload: {
          tableData: formatTable,
          record: {},
        },
      });
    },
    /* 新增保存 */
    * newRecord({ payload: { record } }, { call, put }) {
      /* 格式化数据 */
      const records = formatRecord(record);
      yield call(ApprovalService.add, records);
      yield put({
        type: 'fetch',
        payload: { search: { pageNumber: 1, pageSize: 10 } },
      });
      yield put({
        type: 'stateWillUpdate',
        payload: { modal: false, record: {} },
      });
    },
    /* 修改保存 */
    * updateRecord({ payload: { record } }, { call, put }) {
      /* 格式化数据 */
      const records = formatRecord(record);
      yield call(ApprovalService.update, records);
      yield put({
        type: 'fetch',
        payload: { search: { pageNumber: 1, pageSize: 10 } },
      });
      yield put({
        type: 'stateWillUpdate',
        payload: { modal: false },
      });
    },
    /* 删除 */
    * deleteRecord({ payload: { record } }, { call, put }) {
      yield call(ApprovalService.delete, record.BATCH_HEADER_ID);
      yield put({
        type: 'fetch',
        payload: { search: { pageNumber: 1, pageSize: 10 } },
      });
    },
    /* 获取列表选中记录 */
    * getRecord({ payload: { record, modal, formEdit } }, { call, put }) {
      if (record.BATCH_HEADER_ID && record.BATCH_HEADER_ID !== '') {
        const data = yield call(ApprovalService.getAttachData, record.BATCH_HEADER_ID);
        const attachData = data.map((item, index) => {
          const ite = { ...item, key: index + 1 };
          return ite;
        });
        yield put({
          type: 'stateWillUpdate',
          payload: { record: { ...record, attachData }, modal, formEdit },
        });
      } else {
        yield put({
          type: 'stateWillUpdate',
          payload: { record: { ...record }, modal, formEdit },
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/org/approval') {
          dispatch({
            type: 'fetch',
            payload: { search: { pageNumber: 1, pageSize: 10 } },
          });
        }
      });
    },
  },
};
