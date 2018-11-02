import { connect } from 'dva';
import { bindActionCreators } from 'redux';
import { Form } from 'antd';
import Index from '../components/keyresprank/index';
import * as actions from '../actions/keyresprank';

const mapStateToProps = state => ({
  ...state.keyRespRank,
  loading: state.loading.models.keyRespRank,
});

const WrappedApp = Form.create()(Index);

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(WrappedApp);
