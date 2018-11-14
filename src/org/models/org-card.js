export default {
  namespace: 'orgCard',
  state: {
    expand: false,
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
