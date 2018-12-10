import { connect } from 'dva';
import { Form } from 'antd';
import { bindActionCreators } from 'redux';
import Index from '../components/orgdelete/index';
import * as actions from '../actions/org-delete';

const mapStateToProps = state => ({
  ...state.orgDelete,
  loading: state.loading.models.orgDelete,
});

const WrappedApp = Form.create()(Index);

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(WrappedApp);
