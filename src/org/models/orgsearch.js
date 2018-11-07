import { orgquery } from '../services/orgsearch';

export default {

  namespace: 'orgSearch',//命名空间

  state: {
    value: "",
    id: "",
    children: [],
    dataList: [],   //reducers中接收数据
    dateFrom: "",
    dateTo: "",
    flexName: "",
    flexValue: "",
    orgTree: [],
    structureName: "",
    execute: true,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/org/orgsearch') {
          dispatch({
            type: 'fetch',
            payload: {},
          });
        }
      });
    },
  },

  effects: {
    *searchData({ payload }, { call, put }) {  // eslint-disable-line
      const result = yield call(orgquery);//如果使用  {参数}  ，则是一个对象
      yield put({//数据更新会带动页面重新渲染
        type: 'save',  //reducers中的方法名
        payload:{  //网络返回的要保留的数据
          dataList: result.dataList,  
          dateFrom: result.dateFrom,  
          dateTo: result.dateTo,  
          flexName: result.flexName,  
          flexValue: result.flexValue,  
          orgTree: result.orgTree,  
          structureName: result.structureName,  
        }
      })
    },
    *getTreeChildren({ payload: { orgTree } }, { call, put }) {
      yield put({ //更新树的数据
        type: 'stateUpdate',
        payload:{  
           orgTree: [...orgTree],
        }
      });
    },
    *isTrueExecute({ payload }, { call, put }) {
      yield put({
        type: 'stateUpdate',
        payload:{
          execute: false,    
        }
      })
    },
    *changeKey({ payload: { stringKey } }, { call, put }) {
      yield put({
        type: 'stateUpdate',
        payload:{  
          id: stringKey,
        }
      })
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    stateUpdate(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

};
