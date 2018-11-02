import { connect } from 'dva';
import { Form } from 'antd';
import { bindActionCreators } from 'redux';
import Index from '../components/orgapproval/index';
import * as actions from '../actions/approval';

const mapStateToProps = state => ({
  ...state.orgApproval,
  loading: state.loading.models.orgApproval,
});

const WrappedApp = Form.create()(Index);

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(WrappedApp);
