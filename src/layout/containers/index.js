import { connect } from 'dva';

import Layout from '../components/index';

const mapStateToProps = (state) => {
  return {
    ...state.layout,
  };
};

const mapDispatchToProps = dispatch => ({
  // actions: bindActionCreators(actions, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
