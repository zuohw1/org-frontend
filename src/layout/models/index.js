import MenuService from '../services';

export default {
  namespace: 'layout',
  state: {
    collapsed: false,
    /* 左侧菜单数据 */
    menus: [
      {
        id: 1,
        menuName: '组织管理',
        pid: 0,
        iconUrl: 'sync',
      },
      {
        id: 101,
        menuName: '组织信息查询',
        url: '/org/search',
        pid: 1,
        iconUrl: 'sync',
      },
      {
        id: 102,
        menuName: '组织批文前置流程',
        url: '/org/approval',
        pid: 1,
        iconUrl: 'sync',
      },
    ],
  },
  reducers: {
    willUpdateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    onCollapse(state) {
      return {
        ...state,
        collapsed: !state.collapsed,
      };
    },
  },
  effects: {
    *getMenuList({ payload }, { call, put }) {
      const menu = yield call(MenuService.getList, payload);
      yield put({
        type: 'willUpdateState',
        payload: {
          menus: menu,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname && pathname === '/') {
          /* 跳转页面后初始化左侧菜单数据 */
          dispatch({
            type: 'getMenuList',
            payload: {
            },
          });
        }
      });
    },
  },
};
