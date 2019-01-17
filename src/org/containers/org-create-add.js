import { connect } from 'dva';
import { Form } from 'antd';
import { bindActionCreators } from 'redux';
import Index from '../components/orgcreate/add';
import * as actions from '../actions/org-create';

const mapStateToProps = state => ({
  ...state.orgCreate,
  loading: state.loading.models.orgCreate,
});

const WrappedApp = Form.create()(Index);

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(WrappedApp);
