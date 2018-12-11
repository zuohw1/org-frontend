export default {
  namespace: 'orgView',
  state: {
    data: [{
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
    *getInitData({ payload: { docHeaderId } }, { put }) {
      console.log(docHeaderId);
      yield put({
        type: 'changeDetail/stateWillUpdate',
        payload: {
          menuSelectedKeys: ['3'],
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/org/changeDetail/view') {
          dispatch({
            type: 'getInitData',
            payload: { docHeaderId: '200000515' },
          });
        }
      });
    },
  },
};
