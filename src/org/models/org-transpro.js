
export default {

  namespace: 'orgTranspro', // 命名空间

  state: {
    refModal: false,
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
    *getJobNumber({ payload }, { put }) {
      console.log(payload);
      yield put({// 数据更新会带动页面重新渲染
        type: 'stateUpdate', // reducers中的方法名
        payload: { // 网络返回的要保留的数据
          refModal: true,
        },
      });
    },
    *closeJobNumber({ payload }, { put }) {
      console.log(payload);
      yield put({// 数据更新会带动页面重新渲染
        type: 'stateUpdate', // reducers中的方法名
        payload: { // 网络返回的要保留的数据
          refModal: false,
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
