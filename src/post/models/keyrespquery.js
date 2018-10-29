
export default {
  namespace: 'keyRespQuery',
  state: {
    tableData: {
      total: 0,
      size: 0,
      current: 1,
      records: [],
      pages: 0,
    },
    expand: false,
    search: {
      batchCode: '',
      workFlowStatus: '',
      batchVerifier: '',
      fullName: '',
      batDateS: '',
      batDateE: '',
      pageSize: 10,
      pageNumber: 1,
    },
    queryCols: [{
      itemName: '职责范围', itemKey: 'sequenceName', itemType: 'OrgSelect', required: true,
    },
    {
      itemName: '关键职责', itemKey: 'respName', itemType: 'String', required: false,
    },
    {
      itemName: '子职责', itemKey: 'cRespName', itemType: 'String', required: false,
    },
    {
      itemName: '状态', itemKey: 'status', itemType: 'Select', required: false, list: [{ id: '0', title: '全部' }, { id: '1', title: '有效' }, { id: '2', title: '过期' }],
    }],
    tableCols: [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
    }, {
      title: '岗位序列',
      dataIndex: 'DOC_CODE',
      key: 'DOC_CODE',
      align: 'center',
    }, {
      title: '子序列',
      dataIndex: 'ATTRIBUTE8',
      key: 'ATTRIBUTE8',
      align: 'center',
    }, {
      title: '专业',
      dataIndex: 'ATTRIBUTE9',
      key: 'ATTRIBUTE9',
      align: 'center',
    }, {
      title: '关键职责',
      dataIndex: 'DOC_VERIFIER',
      key: 'DOC_VERIFIER',
      align: 'center',
    }, {
      title: '学历',
      dataIndex: 'DOC_STATUS',
      key: 'DOC_STATUS',
      align: 'center',
    }, {
      title: '工作经验',
      dataIndex: 'ATTRIBUTE10',
      key: 'ATTRIBUTE10',
      align: 'center',
    }, {
      title: '是否核心',
      dataIndex: 'ATTRIBUTE11',
      key: 'ATTRIBUTE11',
      align: 'center',
    }, {
      title: '子职责',
      dataIndex: 'ATTRIBUTE12',
      key: 'ATTRIBUTE12',
      align: 'center',
    }, {
      title: '组织层级',
      dataIndex: 'ATTRIBUTE13',
      key: 'ATTRIBUTE13',
      align: 'center',
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
