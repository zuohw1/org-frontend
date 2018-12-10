import { connect } from 'dva';
import { Form } from 'antd';
import { bindActionCreators } from 'redux';
import Index from '../components/orgrename/index';
import * as actions from '../actions/org-rename';

const mapStateToProps = state => ({
  ...state.orgRename,
  loading: state.loading.models.orgRename,
});

const WrappedApp = Form.create()(Index);

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(WrappedApp);
