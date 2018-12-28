import { connect } from 'dva';
import { Form } from 'antd';
import { bindActionCreators } from 'redux';
import Index from '../components/orgstructure/index';
import * as actions from '../actions/org-structure';

const mapStateToProps = state => ({
  ...state.orgStructure,
  loading: state.loading.models.orgStructure,
});

const WrappedApp = Form.create()(Index);

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(WrappedApp);
