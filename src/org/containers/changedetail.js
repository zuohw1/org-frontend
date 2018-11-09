import { connect } from 'dva';
import { Form } from 'antd';
import { bindActionCreators } from 'redux';
import Index from '../components/changedetail/index';
import * as actions from '../actions/change-detail';

const mapStateToProps = state => ({
  ...state.changeDetail,
  loading: state.loading.models.changeDetail,
});

const WrappedApp = Form.create()(Index);

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(WrappedApp);
