import ApprovalService from '../services/approval';

/* 格式化添加修改数据 */
const formatRecord = (record) => {
  const format = {
    ...record,
    DOC_DATE: record.DOC_DATE.format('YYYY-MM-DD'),
  };
  return format;
};

/* 格式化table数据 */
const formatTableData = (tableData) => {
  const num = tableData.current * tableData.size - tableData.size;
  const table = tableData.records.map((item, index) => {
    const ite = { ...item, key: index + 1 + num };
    return ite;
  });
  const formatTable = { ...tableData, records: table };
  return formatTable;
};

export default {
  namespace: 'orgApproval',
  state: {
    tableData: {
      total: 0,
      size: 0,
      current: 1,
      records: [],
      pages: 0,
    },
    modal: false,
    refModal: false,
    refSelectData: {},
    expand: false,
    formEdit: true,
    record: {},
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

    * updataRecord({ payload: { record } }, { call, put }) {
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

    * deleteRecord({ payload: { record } }, { call, put }) {
      yield call(ApprovalService.delete, record.BATCH_HEADER_ID);
      yield put({
        type: 'fetch',
        payload: { search: { pageNumber: 1, pageSize: 10 } },
      });
    },

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
