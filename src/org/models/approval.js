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
  const num = tableData.current * 10 - 10;
  const table = tableData.records.map((item, index) => {
    let ite = { ...item, key: index + 1 + num};
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
    refmodal : false,
    refData : [],
    expand: false,
    formEdit:true,
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
    query_columns: [{itemName:"文件名称和文号",itemKey:"batchCode",itemType:"String",required:false},
      {itemName:"流程状态",itemKey:"workFlowStatus",itemType:"Select",required:false,list:[{id:"0",title:"暂存中"},{id:"1",title:"审批中"},{id:"2",title:"审批完成"}]},
      {itemName:"文件拟稿人",itemKey:"batchVerifier",itemType:"String",required:false},
      {itemName:"文件发起人",itemKey:"fullName",itemType:"String",required:false},
      {itemName:"发起开始日期",itemKey:"batDateS",itemType:"Date",required:false},
      {itemName:"发起结束日期",itemKey:"batDateE",itemType:"Date",required:false}],
    table_columns: [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
    }, {
      title: '文件名称和文号',
      dataIndex: 'DOC_CODE',
      key: 'DOC_CODE',
      align: 'center',
    }, {
      title: '发起人',
      dataIndex: 'ATTRIBUTE8',
      key: 'ATTRIBUTE8',
      align: 'center',
    }, {
      title: '发起时间',
      dataIndex: 'ATTRIBUTE9',
      key: 'ATTRIBUTE9',
      align: 'center',
    }, {
      title: '文件拟稿人',
      dataIndex: 'DOC_VERIFIER',
      key: 'DOC_VERIFIER',
      align: 'center',
    }, {
      title: '状态',
      dataIndex: 'DOC_STATUS',
      key: 'DOC_STATUS',
      align: 'center',
      render: (text, records) => {
        if(text==="0"){
          return "暂存中";
        }else if(text==="1"){
          return "审批中";
        }else if(text==="2"){
          return "审批完成";
        }
      },
    }, {
      title: '审批人',
      dataIndex: 'ATTRIBUTE10',
      key: 'ATTRIBUTE10',
      align: 'center',
    }],
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
        payload: { search: {pageNumber:1,pageSize:10} },
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
        payload: { search: {pageNumber:1,pageSize:10} },
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
        payload: { search: {pageNumber:1,pageSize:10} },
      });
    },

    * getRecord({ payload: { record } }, { call, put }) {
      if(record.BATCH_HEADER_ID && record.BATCH_HEADER_ID!==''){
        const attachData = yield call(ApprovalService.getAttachData, record.BATCH_HEADER_ID);
        record = {
          ...record,
          attachData: attachData,
        };
      }
      yield put({
        type: 'stateWillUpdate',
        payload: { record },
      });
    },
    * getRefData({ payload: { search } }, { call, put }) {
      const tableData = yield call(ApprovalService.getRefData ,search);
      const formatTable = formatTableData(tableData);
      console.log(formatTable);
      yield put({
        type: 'stateWillUpdate',
        payload: {
          refData: formatTable,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/org/approval') {
          dispatch({
          type: 'fetch',
          payload: {search:{pageNumber:1,pageSize:10}},
        });
      }
      });
    },
  },
};
