import request from '../../utils/request';

export function orgquery() {
  return request.get('orgquery001');
}
export function orgSearchDetail() {
  return request.get('orgSearchDetail');
}
