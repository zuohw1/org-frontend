import { connect } from 'dva';
import { Form } from 'antd';
import { bindActionCreators } from 'redux';
import Index from '../components/changedetail/org-card';
import * as actions from '../actions/org-card';

const mapStateToProps = state => ({
  ...state.orgCard,
  loading: state.loading.models.orgCard,
});

const WrappedApp = Form.create()(Index);

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(WrappedApp);
