import request from '../../utils/request';

export function orgInitialize(name, id) {
  return request.get(`organization/list?login_name=${name}&resp_id=${id}`);
}
export function orgSearchDetail() {
  return request.get('organization/getOrgInfo');
}
export function orgSearchTreeNodes(orgTreeName) {
  return request.get(`organization/list?orgName=${orgTreeName}`);
}
