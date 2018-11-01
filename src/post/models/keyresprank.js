
export default {
  namespace: 'keyRespRank',
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
        itemName: '组织层级', itemKey: 'cRespName', itemType: 'Checkbox', required: false, list: [{ label: '集团', value: 'J' }, { label: '省', value: 'S' }, { label: '市', value: 'D' }, { label: '区/县', value: 'X' }],
      }
      ],
    tableCols: [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
    }, {
      title: '岗位序列',
      dataIndex: 'SEQ',
      key: 'SEQ',
      align: 'center',
    }, {
      title: '子序列',
      dataIndex: 'CSEQ',
      key: 'CSEQ',
      align: 'center',
    }, {
      title: '专业',
      dataIndex: 'MAJOR',
      key: 'MAJOR',
      align: 'center',
    }, {
      title: '关键职责',
      dataIndex: 'KEYRESP',
      key: 'KEYRESP',
      align: 'center',
    }, {
      title: '基准职级',
      dataIndex: 'JZRANK',
      key: 'JZRANK',
      align: 'center',
    }, {
      title: '集团职级',
      dataIndex: 'JTRANK',
      key: 'JTRANK',
      align: 'center',
    }, {
      title: '省份职级',
      dataIndex: 'SFRANK',
      key: 'SFRANK',
      align: 'center',
    }, {
      title: '地市职级',
      dataIndex: 'DSRANK',
      key: 'DSRANK',
      align: 'center',
    }, {
      title: '区县职级',
      dataIndex: 'QXRANK',
      key: 'QXRANK',
      align: 'center',
    }, {
      title: '组织层级',
      dataIndex: 'LEVELTYPE',
      key: 'LEVELTYPE',
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
