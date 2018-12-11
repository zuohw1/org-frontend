import request from '../../utils/request';

export default {
  getInitTree(name, id) {
    return request.get(`organization/getInitTree?login_name=${name}&resp_id=${id}`);
  },
  checkOrgIsDelete(docHeaderId, orgId) {
    return request.get(`orgCreate/checkOrgIsDelete?docHeaderId=${docHeaderId}&orgId=${orgId}`);
  },
};
