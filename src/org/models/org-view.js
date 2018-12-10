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
  },
  subscriptions: {
  },
};
