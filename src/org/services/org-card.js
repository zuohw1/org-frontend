import request from '../../utils/request';

export default {
  getInitTree() {
    return request.get('organization/getInitTree');
  },
  checkOrgIsDelete(docHeaderId, orgId) {
    return request.get(`orgCreate/checkOrgIsDelete?docHeaderId=${docHeaderId}&orgId=${orgId}`);
  },
  getTreeByName(name) {
    return request.get(`organization/getTreeByName?name=${name}`);
  },
};
