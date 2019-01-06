import { connect } from 'dva';
import { Form } from 'antd';
import { bindActionCreators } from 'redux';
import Index from '../components/orgcostcenter/modify';
import * as actions from '../actions/org-costcenter';

const mapStateToProps = state => ({
  ...state.orgCostCenter,
  loading: state.loading.models.orgCostCenter,
});

const WrappedApp = Form.create()(Index);

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(WrappedApp);
