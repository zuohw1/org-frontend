import pathToRegexp from 'path-to-regexp';
import Cookies from 'js-cookie';
import MenuService from '../services';

const pathnameMapping = {
  '/sync/information/A,B': '同步信息管理-集团',
  '/sync/information/C,D': '同步信息管理-省公司',
  '/field/label/AB': '字段库标签库管理-集团',
  '/field/label/CD': '字段库标签库管理-省公司',
  '/field/label/EF': '字段库标签库管理-地市',
  '/leader/A': '管理人员信息管理-集团高管管理人员',
  '/leader/B': '管理人员信息管理-集团高管后备管理人才',
  '/leader/C': '管理人员信息管理-省管管理人员',
  '/leader/D': '管理人员信息管理-省管后备管理人才',
  '/leader/E': '管理人员信息管理-地市管理人员',
  '/leader/F': '管理人员信息管理-地市后备管理人才',
  '/addLeader/A': '管理人员信息管理-集团高管管理人员-新增',
  '/addLeader/B': '管理人员信息管理-集团高管后备管理人才-新增',
  '/addLeader/C': '管理人员信息管理-省管管理人员-新增',
  '/addLeader/D': '管理人员信息管理-省管后备管理人才-新增',
  '/addLeader/E': '管理人员信息管理-地市管理人员-新增',
  '/addLeader/F': '管理人员信息管理-地市后备管理人才-新增',
  '/search/A': '管理人员查询-集团高管管理人员',
  '/search/B': '管理人员查询-集团高管后备管理人才',
  '/search/C': '管理人员查询-省管管理人员',
  '/search/D': '管理人员查询-省管后备管理人才',
  '/search/E': '管理人员查询-地市管理人员',
  '/search/F': '管理人员查询-地市后备管理人才',
  '/statistics': '管理人员数据分析',
  '/log-record': '日志记录',
  profile: '管理人员信息管理-个人信息查询',
  approval: '管理人员信息管理-任免审批表',
  resume: '管理人员信息管理-履历表',
};

export default {
  namespace: 'layout',
  state: {
    collapsed: false,
    menus: [
      {
        id: '1',
        menuName: '同步信息管理',
        url: null,
        pid: '0',
        iconUrl: 'sync',
      },
      {
        id: '2',
        menuName: '集团',
        url: '/sync/information/A,B',
        pid: '1',
        iconUrl: '',
      },
      {
        id: '3',
        menuName: '省公司',
        url: '/sync/information/C,D',
        pid: '1',
        iconUrl: '',
      },
      {
        id: '4',
        menuName: '字段库标签库管理',
        url: null,
        pid: '0',
        iconUrl: 'tag-o',
      },
      {
        id: '5',
        menuName: '集团',
        url: '/field/label/AB',
        pid: '4',
        iconUrl: '',
      },
      {
        id: '6',
        menuName: '省分公司',
        url: '/field/label/CD',
        pid: '4',
        iconUrl: '',
      },
      {
        id: '7',
        menuName: '地市分公司',
        url: '/field/label/EF',
        pid: '4',
        iconUrl: '',
      },
      {
        id: '8',
        menuName: '管理人员信息管理',
        url: null,
        pid: '0',
        iconUrl: 'user',
      },
      {
        id: '9',
        menuName: '集团高管-管理人员',
        url: '/leader/A',
        pid: '8',
        iconUrl: '',
      },
      {
        id: '10',
        menuName: '集团高管-后备管理人员',
        url: '/leader/B',
        pid: '8',
        iconUrl: '',
      },
      {
        id: '11',
        menuName: '省管-管理人员',
        url: '/leader/C',
        pid: '8',
        iconUrl: '',
      },
      {
        id: '12',
        menuName: '省管-后备管理人员',
        url: '/leader/D',
        pid: '8',
        iconUrl: '',
      },
      {
        id: '13',
        menuName: '地市管-管理人员',
        url: '/leader/E',
        pid: '8',
        iconUrl: '',
      },
      {
        id: '14',
        menuName: '地市管-后备管理人员',
        url: '/leader/F',
        pid: '8',
        iconUrl: '',
      },
      {
        id: '15',
        menuName: '管理人员查询',
        url: null,
        pid: '0',
        iconUrl: 'search',
      },
      {
        id: '16',
        menuName: '集团高管-管理人员',
        url: '/search/A',
        pid: '15',
        iconUrl: '',
      },
      {
        id: '17',
        menuName: '集团高管-后备管理人员',
        url: '/search/B',
        pid: '15',
        iconUrl: '',
      },
      {
        id: '18',
        menuName: '省管-管理人员',
        url: '/search/C',
        pid: '15',
        iconUrl: '',
      },
      {
        id: '19',
        menuName: '省管-后备管理人员',
        url: '/search/D',
        pid: '15',
        iconUrl: '',
      },
      {
        id: '20',
        menuName: '地市管-管理人员',
        url: '/search/E',
        pid: '15',
        iconUrl: '',
      },
      {
        id: '21',
        menuName: '地市管-后备管理人员',
        url: '/search/F',
        pid: '15',
        iconUrl: '',
      },
      {
        id: '22',
        menuName: '管理人员数据分析',
        url: '/statistics',
        pid: '0',
        iconUrl: 'line-chart',
      },
      {
        id: '23',
        menuName: '日志记录',
        url: '/log-record',
        pid: '0',
        iconUrl: 'bars',
      },
    ],
    headless: false,
  },
  reducers: {
    stateWillUpdate(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    onCollapse(state) {
      return {
        collapsed: !state.collapsed,
      };
    },
  },
  effects: {
    *addLogRecord({ payload }, { call }) {
      try {
        yield call(MenuService.addLogRecord, payload);
      } catch (error) {
        console(error);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ search, pathname }) => {
        if (pathname && pathname !== '/login') {
          Cookies.set('currentPath', pathname);
        }
        const headless = search.indexOf('headless=true') >= 0;
        dispatch({
          type: 'stateWillUpdate',
          payload: {
            headless,
          },
        });
        const profile = pathToRegexp('/leader/profile/:code/:level/:from').exec(pathname);
        const approval = pathToRegexp('/leader/approval/form/:id/:level').exec(pathname);
        const resume = pathToRegexp('/leader/resume/:id/:level').exec(pathname);
        let pageName = '';
        if (profile) {
          pageName = pathnameMapping.profile;
        } else if (approval) {
          pageName = pathnameMapping.approval;
        } else if (resume) {
          pageName = pathnameMapping.resume;
        } else {
          pageName = pathnameMapping[pathname];
        }
        if (pageName) {
          dispatch({
            type: 'addLogRecord',
            payload: {
              pageName,
            },
          });
        }
      });
    },
  },
};
