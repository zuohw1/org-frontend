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
  namespace: 'orgStructure',
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
    /* 组织树显示停用 */
    showDisabled: 'N',
    /* 下拉列表数据 */
    selectData: {},
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
    * getSelectData(_, { call, put }) {
      const selectData = yield call(Service.getSelectData);
      yield put({
        type: 'stateWillUpdate',
        payload: {
          selectData,
        },
      });
    },
    * redirect({ payload: { pathname, state } }, { put }) {
      yield put(routerRedux.push({ pathname, state }));
    },
    *getInitTree({ payload: { versionId, showDisabled } }, { call, put }) {
      const result = yield call(Service.getInitTree, versionId, showDisabled);
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
      yield put({
        type: 'stateWillUpdate',
        payload: {
          treeData: [],
          expandKeys: [],
        },
      });
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
        if (pathname === '/org/structure') {
          console.log(1111);
          dispatch({
            type: 'fetch',
            payload: { search: { pageNumber: 1, pageSize: 10 } },
          });
          dispatch({
            type: 'getSelectData',
          });
        } else if (pathname === '/org/structure/view') {
          if (history.location.state !== undefined
            && history.location.state.id !== undefined) {
            dispatch({
              type: 'getInitTree',
              payload: { versionId: history.location.state.id, showDisabled: 'N' },
            });
          } else {
            history.goBack(-1);
          }
        }
      });
    },
  },
};
