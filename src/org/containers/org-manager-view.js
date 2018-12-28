import { connect } from 'dva';
import { Form } from 'antd';
import { bindActionCreators } from 'redux';
import Index from '../components/orgmanagerview';
import * as actions from '../actions/org-manager-view';

const mapStateToProps = state => ({
  ...state.orgManagerView,
  loading: state.loading.models.orgManagerView,
});

const WrappedApp = Form.create()(Index);

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(WrappedApp);
