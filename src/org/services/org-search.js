import request from '../../utils/request';

export function orgInitialize(name, id) {
  return request.get(`organization/list?login_name=${name}&resp_id=${id}`);
}
export function orgSearchDetail(topId, versionId) {
  return request.get(`organization/sub?topId=${topId}&versionId=${versionId}`);
}
