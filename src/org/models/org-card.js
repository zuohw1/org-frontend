/* eslint-disable no-debugger */
import service from '../services/org-card';

export default {
  namespace: 'orgCard',
  state: {
    expand: false,
    treeData: [],
    expandKeys: [],
    loadedKeys: [],
    defaultExpandedKeys: ['37838'],
    login_name: 'hq-ehr',
    resp_id: '200000515',
    checkedKeys: [],
    record: {},
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
    *getInitTree({ payload: { name, id } }, { call, put }) {
      yield put({// 数据更新会带动页面重新渲染
        type: 'changeDetail/stateWillUpdate', // reducers中的方法名
        payload: { // 网络返回的要保留的数据
          menuSelectedKeys: ['2'],
        },
      });
      const result = yield call(service.getInitTree, name, id);// 如果使用  {参数}  ，则是一个对象
      yield put({// 数据更新会带动页面重新渲染
        type: 'stateWillUpdate', // reducers中的方法名
        payload: { // 网络返回的要保留的数据
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
    *checkOrgIsDelete({ payload: { docHeaderId, orgId } }, { call }) {
      return yield call(service.checkOrgIsDelete, docHeaderId, orgId);
    },
    *refreshTree(_, { call, put }) {
      yield put({
        type: 'stateWillUpdate',
        payload: {
          treeData: [],
          expandKeys: [],
        },
      });
      const result = yield call(service.getInitTree);
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
      const result = yield call(service.getTreeByName, name);
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
        if (pathname === '/org/changeDetail/org') {
          if (history.location.pathData !== undefined
            && history.location.pathData.id !== undefined) {
            dispatch({
              type: 'getInitTree',
              payload: { login_name: 'hq-ehr', resp_id: '200000515' },
            });
          } else {
            history.goBack(-1);
          }
        }
      });
    },
  },
};
