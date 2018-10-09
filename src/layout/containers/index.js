import { connect } from 'dva';

import Layout from '../components/index';

const mapStateToProps = (state) => {
  return {
    ...state.layout,
  };
};

export default connect(mapStateToProps)(Layout);
