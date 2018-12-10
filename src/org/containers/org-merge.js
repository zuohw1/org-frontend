import { connect } from 'dva';
import { Form } from 'antd';
import { bindActionCreators } from 'redux';
import Index from '../components/orgmerge/index';
import * as actions from '../actions/org-merge';

const mapStateToProps = state => ({
  ...state.orgMerge,
  loading: state.loading.models.orgMerge,
});

const WrappedApp = Form.create()(Index);

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(WrappedApp);
