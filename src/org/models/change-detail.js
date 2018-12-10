
export default {
  namespace: 'changeDetail',
  state: {
    menuSelectedKeys: ['1'],
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
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/org/changeDetail') {
          dispatch({
            type: 'stateWillUpdate',
            payload: { menuSelectedKeys: ['1'] },
          });
        }
      });
    },
  },
};
