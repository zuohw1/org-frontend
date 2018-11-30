export default {
  namespace: 'documentLoad',
  state: {
    /* 列表数据 */
    tableData: {
      total: 0,
      size: 0,
      current: 1,
      records: [
        {
          key: '1',
          documentTitle: '联通人力资源平台-组织管理用户操作手册',
          documentType: '操作手册',
          module: '组织管理',
          windowLoad: '438',
          load: '下载',
        },
        {
          key: '2',
          documentTitle: '附件-HR核心操作手册_v0.1',
          documentType: '操作手册',
          module: '组织管理',
          windowLoad: '314',
          load: '下载',
        },
        {
          key: '3',
          documentTitle: '子公司组织01',
          documentType: '其他文档',
          module: '组织管理',
          windowLoad: '244',
          load: '下载',
        },
      ],
      pages: 0,
    },
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
