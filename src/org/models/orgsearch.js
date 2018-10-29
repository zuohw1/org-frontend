import ApprovalService from '../services/orgsearch';

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
  const num = tableData.current * 10 - 10;
  const table = tableData.records.map((item, index) => {
    let ite = { ...item, key: index + 1 + num};
    return ite;
  });
  const formatTable = { ...tableData, records: table };
  return formatTable;
};

export default {
  namespace: 'orgSearch',
  state: {},
  reducers: {
    stateWillUpdate(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {

  }
};
