import request from '../../utils/request';

export function orgquery() {
  return request.get('orgquery001');
}
export function orgqueryTree(n) {
  return request.get('orgquery'+ n);
}
