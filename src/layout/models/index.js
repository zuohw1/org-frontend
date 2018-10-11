import MenuService from '../services';

export default {
  namespace: 'layout',
  state: {
    collapsed: false,
    menus: [
      {
        id: 1,
        menuName: '组织管理',
        url: null,
        pid: 0,
        iconUrl: 'sync',
      },
      {
        id: 101,
        menuName: '组织信息查询',
        url: '/sync/information/A,B',
        pid: 1,
        iconUrl: 'sync',
      },
      {
        id: 2,
        menuName: '职位管理',
        url: '/sync/information/C,D',
        pid: 0,
        iconUrl: '',
      },
      {
        id: 3,
        menuName: '人员管理',
        url: null,
        pid: 0,
        iconUrl: 'tag-o',
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
      try {
        const menu = yield call(MenuService.getList, payload);
        console.log(menu);
        yield put({
          type: 'willUpdateState',
          payload: {
            menus: menu,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname && pathname === '/') {
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
