import { connect } from 'dva';

import Layout from '../components/index';

/* 建立组件跟 store 的 state 的映射关系 */
const mapStateToProps = (state) => {
  return {
    ...state.layout,
  };
};

/* 直接将action包装成可以被调用的函数 */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
