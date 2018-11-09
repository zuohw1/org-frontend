import { orgquery, orgSearchDetail } from '../services/org-search';

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
    //下面的数据是组织结构查询右侧的数据
    orgName: "",//基本信息组织名称
    orgType: "",//基本信息组织类型
    dateBegin: "",//日期自
    dateEnd: "",//日期至
    orgTypicalHR: "",//组织分类:HR组织
    orgTypicalGRE: "",//组织分类:GRE/法律实体
    location: "",//地点信息 地点
    interOrter: "",//地点信息 内部/外部
    national: "",//地点信息 国家(地区)
    privince: "",//地点信息 省市
    locationDetailInfo: "",//地点信息 地点地址
    postCode: "",//地点信息 邮编
    addInfo: "",//附加信息 续存实业对应省公司名
    orgSortNumber: "",//附加信息 组织排序号
    orgLevel: "",//附加信息 组织层级
    area: "",//附加信息 南方/北方/子公司
    vitualOrg: "",//附加信息 虚拟组织
    owenPrivince: "",//附加信息 所属省份
    orgProprerties: "",//附加信息 组织属性
    orgcancleDate: "",//附加信息 组织撤销发文时间
    cucorgmin: "",//附加信息 最小基层单元
    orgnizationName: "",//GRE/法律实体信息 公司名称
    orgCode: "",//GRE/法律实体信息 企业组织代码
    orgPeriodCode: "",//成本信息 公司段编码
    orgPeriodSHow: "",//成本信息 公司段说明
    costCenterCode: "",//成本信息 成本中心编码
    costCenterShow: "",//成本信息 成本中心说明
    majorCode: "",//成本信息 专业段编码
    majorSHow: "",//成本信息 专业段说明
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
    *orgSearchDetailData({ payload }, { call, put }) {
      const res = yield call(orgSearchDetail);
      yield put({
        type: 'save',
        payload:{
          orgName: res.orgName,
          orgType: res.orgType,
          dateBegin: res.dateBegin,
          dateEnd: res.dateEnd,
          orgTypicalHR: res.orgTypicalHR,
          orgTypicalGRE: res.orgTypicalGRE,
          location: res.location,
          interOrter: res.interOrter,
          national: res.national,
          privince: res.privince,
          locationDetailInfo: res.locationDetailInfo,
          postCode: res.postCode,
          addInfo: res.addInfo,
          orgSortNumber: res.orgSortNumber,
          orgLevel: res.orgLevel,
          area: res.area,
          vitualOrg: res.vitualOrg,
          owenPrivince: res.owenPrivince,
          orgProprerties: res.orgProprerties,
          orgcancleDate: res.orgcancleDate,
          cucorgmin: res.cucorgmin,
          orgnizationName: res.orgnizationName,
          orgCode: res.orgCode,
          orgPeriodCode: res.orgPeriodCode,
          orgPeriodSHow: res.orgPeriodSHow,
          costCenterCode: res.costCenterCode,
          costCenterShow: res.ostCenterShow,
          majorCode: res.majorCode,
          majorSHow: res.majorSHow,
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
    *handleChange({ payload: { flexName } }, { call, put }) {
      console.log(flexName)
      yield put({
        type: 'stateUpdate',
        payload:{
          flexName: flexName,
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
