import { orgquery } from '../services/orgsearch';

export default {

  namespace: 'orgSearch',//命名空间

  state: {
    dataList: [],   //reducers中接收数据
    dateFrom: "",
    dateTo: "",
    flexName: "",
    flexValue: "",
    orgTree: "",
    structureName: "",
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname }) => {
        if (pathname === '/org/orgsearch') {
          dispatch({
            type: 'fetch',//orgquery
            payload: {},
          });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const result = yield call(orgquery);//如果使用  {参数}  ，则是一个对象
      console.log(result);
      //把请求的数据保存起来
      //数据更新会带动页面重新渲染
      yield put({
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
  },

  reducers: {
    save(state, { payload }) {//: { data }
      //console.log(payload)
      return {
        ...state,  //第一个data是state的，第二个data是payload的
        ...payload,
      };
    },
  },

};
