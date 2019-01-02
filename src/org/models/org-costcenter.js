import { routerRedux } from 'dva/router';
import Service from '../services/org-structure';

/* 格式化table数据 */
const formatTableData = (tableData) => {
  const num = tableData.current * tableData.size - tableData.size;
  const table = tableData.records.map((item, index) => {
    return { ...item, key: index + 1 + num };
  });
  return { ...tableData, records: table };
};

export default {
  namespace: 'orgCostCenter',
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
      structureName: '',
      versionNumber: '',
      versionDate: '',
      empName: '',
      empNumber: '',
      status: '',
      pageSize: 10,
      pageNumber: 1,
    },
    /* 人员参照框 */
    personModal: false,
    /* 组织树数据 */
    treeData: [],
    expandKeys: [],
    loadedKeys: [],
    /* 查询框员工编码 */
    searchEmpNumber: {},
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
    *getInitTree(_, { call, put }) {
      const result = yield call(Service.getInitTree);
      yield put({
        type: 'stateWillUpdate',
        payload: {
          treeData: result,
          defaultExpandedKeys: ['~'],
        },
      });
    },
    *getTreeChildren({ payload: { treeData } }, { put }) {
      yield put({ // 更新树的数据
        type: 'stateUpdate',
        payload: {
          treeData: [...treeData],
        },
      });
    },
    *refreshTree(_, { call, put }) {
      const result = yield call(Service.getInitTree);
      yield put({
        type: 'stateWillUpdate',
        payload: {
          treeData: result,
          expandKeys: [],
          loadedKeys: [],
        },
      });
    },
    *getTreeByName({ payload: { name } }, { call, put }) {
      const result = yield call(Service.getTreeByName, name);
      yield put({
        type: 'stateWillUpdate',
        payload: {
          treeData: result,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/org/costCenter') {
          dispatch({
            type: 'fetch',
            payload: { search: { pageNumber: 1, pageSize: 10 } },
          });
        } else if (pathname === '/org/costCenter/view') {
          dispatch({
            type: 'getInitTree',
          });
        }
      });
    },
  },
};
