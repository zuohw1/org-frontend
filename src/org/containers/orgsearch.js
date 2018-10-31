import { connect } from 'dva';
import { Form } from 'antd';
import { bindActionCreators } from 'redux';
import Index from '../components/orgsearch/index';
import * as actions from '../actions/orgsearch';

const mapStateToProps = state => ({
  ...state.orgSearch,
  loading: state.loading.models.orgSearch,
});

const WrappedApp = Form.create()(Index);

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(WrappedApp);
