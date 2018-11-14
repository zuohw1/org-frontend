import { connect } from 'dva';
import { bindActionCreators } from 'redux';
import Index from '../components/changedetail/org-view';
import * as actions from '../actions/org-view';

const mapStateToProps = state => ({
  ...state.orgView,
  loading: state.loading.models.orgView,
});

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(actions, dispatch),
}))(Index);
