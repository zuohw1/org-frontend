import request from '../../utils/request';

export default {
  getAttachData(id) {
    return request.get(`orgHeaderBatch/getAttachData?id=${id}`);
  },
  getNoticeList() {
    return request.get('noticeName/getNoticeList');
  },
  add(records) {
    return request.post('orgCreate/saveOrgHeaderDoc', records);
  },
  update(records) {
    return request.post('orgCreate/updateOrgHeaderDoc', records);
  },
};
