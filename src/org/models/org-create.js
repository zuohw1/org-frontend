import { routerRedux } from 'dva/router';
import Service from '../services/org-create';

/* 格式化table数据 */
const formatTableData = (tableData) => {
  const num = tableData.current * tableData.size - tableData.size;
  const table = tableData.records.map((item, index) => {
    return { ...item, key: index + 1 + num };
  });
  return { ...tableData, records: table };
};

export default {
  namespace: 'orgCreate',
  state: {
    /* 列表数据 */
    tableData: {
      total: 0,
      size: 0,
      current: 1,
      records: [],
      pages: 0,
    },
    /* 查询是否展开 */
    expand: false,
    /* 查询条件数据 */
    search: {
      isApprove: '',
      docCode: '',
      docStatus: '',
      docVerifier: '',
      docDateS: '',
      docDateE: '',
      pageSize: 10,
      pageNumber: 1,
    },
    viewData: [{
      name: '集团',
      create_date: '2018-01-01',
      status: '同步',
      children: [{
        name: '总部',
        create_date: '2018-01-01',
        status: '同步',
        children: [{
          name: '财务部',
          create_date: '2018-01-01',
          status: '同步',
        }],
      }],
    }],
    info: {},
    attachData: [],
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
      const tableData = yield call(Service.list, search);
      const formatTable = formatTableData(tableData);
      yield put({
        type: 'stateWillUpdate',
        payload: {
          tableData: formatTable,
          record: {},
        },
      });
    },
    * redirect({ payload: { pathname, state } }, { put }) {
      yield put(routerRedux.push({ pathname, state }));
    },
    /* 删除 */
    * deleteRecord({ payload: { record } }, { call, put }) {
      yield call(Service.delete, record.docHeaderId);
      yield put({
        type: 'fetch',
        payload: { search: { pageNumber: 1, pageSize: 10 } },
      });
    },
    * getOrgHeaderDocInfo({ payload: { id } }, { call, put }) {
      const result = yield call(Service.getOrgHeaderDocInfo, id);
      yield put({
        type: 'stateWillUpdate',
        payload: { info: result.info, attachData: result.attachData },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/org/create') {
          dispatch({
            type: 'fetch',
            payload: { search: { pageNumber: 1, pageSize: 10 } },
          });
        } else if (pathname === '/org/create/view') {
          if (history.location.state !== undefined
            && history.location.state.id !== undefined) {
            dispatch({
              type: 'getOrgHeaderDocInfo',
              payload: { id: history.location.state.id },
            });
          } else {
            history.goBack(-1);
          }
        }
      });
    },
  },
};
