import { list } from '../services/org-transpro';

export default {

  namespace: 'orgTranspro', // 命名空间

  state: {
    arr: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/org/orgtranspro') {
          dispatch({
            type: 'fetch',
            payload: {},
          });
        }
      });
    },
  },

  effects: {
    *searchData({ payload }, { call, put }) {
      console.log(payload);
      const result = yield call(list);// 如果使用  {参数}  ，则是一个对象
      yield put({// 数据更新会带动页面重新渲染
        type: 'save', // reducers中的方法名
        payload: { // 网络返回的要保留的数据
          dataList: result.dataList,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    stateUpdate(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

};
