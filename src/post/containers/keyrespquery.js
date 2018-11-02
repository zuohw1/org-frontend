import { connect } from 'dva';
import { bindActionCreators } from 'redux';
import { Form } from 'antd';
import Index from '../components/keyrespquery/index';
import * as actions from '../actions/keyrespquery';

const mapStateToProps = state => ({
  ...state.keyRespQuery,
  loading: state.loading.models.keyRespQuery,
});

const WrappedApp = Form.create()(Index);

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(WrappedApp);
