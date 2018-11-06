import request from '../../utils/request';

export function orgquery() {
  return request.get('orgquery001');
}
export function orgqueryTree(id) {
  return request.get('orgquery'+ id);
}
