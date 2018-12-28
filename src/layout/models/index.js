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
      {
        id: 103,
        menuName: '组织新增',
        url: '/org/create',
        pid: 1,
        iconUrl: 'sync',
      },
      {
        id: 104,
        menuName: '组织合并',
        url: '/org/merge',
        pid: 1,
        iconUrl: 'sync',
      },
      {
        id: 105,
        menuName: '组织更名',
        url: '/org/rename',
        pid: 1,
        iconUrl: 'sync',
      },
      {
        id: 106,
        menuName: '组织撤销',
        url: '/org/delete',
        pid: 1,
        iconUrl: 'sync',
      },
      {
        id: 108,
        menuName: '组织结构业务维护',
        url: '/org/structure',
        pid: 1,
        iconUrl: 'sync',
      },
      {
        id: 107,
        menuName: '文档下载',
        url: '/org/documentLoad',
        pid: 1,
        iconUrl: 'sync',
      },
    ],
    headless: false,
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
      return history.listen(({ pathname, search }) => {
        if (search) {
          const headless = search.indexOf('headless=true') >= 0;
          dispatch({
            type: 'willUpdateState',
            payload: {
              headless,
            },
          });
        }
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
