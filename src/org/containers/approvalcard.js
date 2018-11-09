import { connect } from 'dva';
import { Form } from 'antd';
import { bindActionCreators } from 'redux';
import Index from '../components/changedetail/approval-card';
import * as actions from '../actions/approval-card';

const mapStateToProps = state => ({
  ...state.approvalCard,
  loading: state.loading.models.approvalCard,
});

const WrappedApp = Form.create()(Index);

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(WrappedApp);
