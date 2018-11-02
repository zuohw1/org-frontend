import { connect } from 'dva';
import { bindActionCreators } from 'redux';
import { Form } from 'antd';
import Index from '../components/keyresp/index';
import * as actions from '../actions/keyresp';

const mapStateToProps = state => ({
  ...state.keyResp,
  loading: state.loading.models.keyResp,
});

const WrappedApp = Form.create()(Index);

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(WrappedApp);
