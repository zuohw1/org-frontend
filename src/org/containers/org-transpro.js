import { connect } from 'dva';
import { Form } from 'antd';
import { bindActionCreators } from 'redux';
import Index from '../components/orgtranspro/index';
import * as actions from '../actions/org-transpro';

const mapStateToProps = state => ({
  ...state.orgTranspro,
  loading: state.loading.models.orgTranspro,
});

const WrappedApp = Form.create()(Index);

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(WrappedApp);
