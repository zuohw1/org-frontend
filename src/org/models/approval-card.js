import * as routerRedux from 'react-router-redux';
import service from '../services/approval-card';

/* 格式化添加修改数据 */
const formatRecord = (record) => {
  const format = {
    ...record,
    /* 格式化日期 */
    DOC_DATE: record.DOC_DATE.format('YYYY-MM-DD'),
  };
  return format;
};

export default {
  namespace: 'approvalCard',
  state: {
    /* 参照是否显示 */
    refModal: false,
    /* 卡片记录 */
    record: {},
    /* 通知单列表 */
    noticeList: [],
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
    /* 获取列表选中记录 */
    * setRefSelectData({ payload: { record, refModal } }, { call, put }) {
      if (record.BATCH_HEADER_ID && record.BATCH_HEADER_ID !== '') {
        const data = yield call(service.getAttachData, record.BATCH_HEADER_ID);
        const attachData = data.map((item, index) => {
          const ite = { ...item, key: index + 1 };
          return ite;
        });
        yield put({
          type: 'stateWillUpdate',
          payload: { record: { ...record, attachData }, refModal },
        });
      } else {
        yield put({
          type: 'stateWillUpdate',
          payload: { record: { ...record }, refModal },
        });
      }
    },
    * getNoticeList(_, { call, put }) {
      const noticeList = yield call(service.getNoticeList);
      yield put({
        type: 'stateWillUpdate',
        payload: {
          noticeList,
        },
      });
    },
    /* 新增保存 */
    * newRecord({ payload: { record } }, { call, put }) {
      /* 格式化数据 */
      const myRecord = formatRecord(record);
      const vo = yield call(service.add, myRecord);
      const pathData = { id: vo.id };
      yield put({
        type: 'stateWillUpdate',
        payload: { record: myRecord },
      });
      yield put(routerRedux.push({ pathname: '/org/changeDetail/org', pathData }));
    },
    /* 修改保存 */
    * updateRecord({ payload: { record } }, { call, put }) {
      /* 格式化数据 */
      const myRecord = formatRecord(record);
      yield call(service.update, myRecord);
      const pathData = { id: myRecord.DOC_HEADER_ID };
      yield put({
        type: 'stateWillUpdate',
        payload: { record: myRecord },
      });
      yield put(routerRedux.push({ pathname: '/org/changeDetail/org', pathData }));
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/org/changeDetail') {
          dispatch({
            type: 'getNoticeList',
          });
        }
      });
    },
  },
};
