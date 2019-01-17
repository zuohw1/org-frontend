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
    checkedKeys: [],
    expandKeys: [],
    /* 组织树显示停用 */
    showDisabled: 'N',
    /* 下拉列表数据 */
    selectData: {},
    /* 查询框员工编码 */
    searchEmpNumber: {},

    /* 查看、修改界面Form信息 */
    orgStructureInfo: {},
    /* 查看界面列表信息 */
    requestList: [],
    versionId: '',
    newAddOrgList: [],
    updateParentOrgList: [],

    /* 修改界面新组织参照 */
    orgModel: false,
    updateOrgModel: false,
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
          expandKeys: [result[0].key],
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
    *refreshTree({ payload: { versionId, showDisabled } }, { call, put }) {
      const result = yield call(Service.getInitTree, versionId, showDisabled);
      yield put({
        type: 'stateWillUpdate',
        payload: {
          treeData: result,
          expandKeys: [result[0].key],
        },
      });
    },
    *getTreeByName({ payload: { name, versionId, showDisabled } }, { call, put }) {
      const result = yield call(Service.getTreeByName, name, versionId, showDisabled);
      yield put({
        type: 'stateWillUpdate',
        payload: {
          treeData: result,
          expandKeys: [],
        },
      });
    },
    *getOrgStructureInfoByVID({ payload: { versionId, type } }, { call, put }) {
      const result = yield call(Service.getOrgStructureInfoByVID, versionId, type);
      yield put({
        type: 'stateWillUpdate',
        payload: {
          orgStructureInfo: result.orgStructureInfo,
          requestList: result.requestList ? result.requestList : [],
          versionId,
          newAddOrgList: result.newAddOrgList ? result.newAddOrgList : [],
          updateParentOrgList: result.updateParentOrgList ? result.updateParentOrgList : [],
        },
      });
    },
    * saveOrgManualInfo({ payload: { entity } }, { call, put }) {
      const result = yield call(Service.saveOrgManualInfo, entity);
      if (entity.operationType === 'ADD') {
        yield put({
          type: 'stateWillUpdate',
          payload: {
            newAddOrgList: result,
          },
        });
      } else {
        yield put({
          type: 'stateWillUpdate',
          payload: {
            updateParentOrgList: result,
          },
        });
      }
    },
    * updateIsCreateNewVer({ payload: { newVersionFlag, versionId } }, { call }) {
      yield call(Service.updateIsCreateNewVer, newVersionFlag, versionId);
    },
    * deleteOrgManualById({ payload: { id, operationType, data } }, { call, put }) {
      yield call(Service.deleteOrgManualById, id);
      if (operationType === 'ADD') {
        yield put({
          type: 'stateWillUpdate',
          payload: {
            newAddOrgList: data,
          },
        });
      } else {
        yield put({
          type: 'stateWillUpdate',
          payload: {
            updateParentOrgList: data,
          },
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/org/structure') {
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
              type: 'getOrgStructureInfoByVID',
              payload: { versionId: history.location.state.id, type: 'VIEW' },
            });
          } else {
            history.goBack(-1);
          }
        } else if (pathname === '/org/structure/modify') {
          if (history.location.state !== undefined
            && history.location.state.id !== undefined) {
            dispatch({
              type: 'getOrgStructureInfoByVID',
              payload: { versionId: history.location.state.id, type: 'MODIFY' },
            });
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
