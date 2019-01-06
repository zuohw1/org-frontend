import { routerRedux } from 'dva/router';
import Service from '../services/org-costcenter';

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
    /* 成本中心明细信息 */
    costCenterData: {},
    /* 变更记录框 */
    detailModel: false,
    /* 选中的变更明细记录 */
    detailRecord: {},
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
    *getCostDataById({ payload: { costHeaderId } }, { call, put }) {
      const result = yield call(Service.getCostDataById, costHeaderId);
      yield put({
        type: 'stateWillUpdate',
        payload: {
          costCenterData: result,
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
          if (history.location.state !== undefined
            && history.location.state.id !== undefined) {
            dispatch({
              type: 'getCostDataById',
              payload: { costHeaderId: history.location.state.id },
            });
          } else {
            history.goBack(-1);
          }
        } else if (pathname === '/org/costCenter/modify') {
          if (history.location.state !== undefined
            && history.location.state.id !== undefined) {
            dispatch({
              type: 'getCostDataById',
              payload: { costHeaderId: history.location.state.id },
            });
            dispatch({
              type: 'getInitTree',
            });
          } else {
            history.goBack(-1);
          }
        }
      });
    },
  },
};
