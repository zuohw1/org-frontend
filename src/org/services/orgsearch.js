import request from '../../utils/request';

export default {
  list(search) {
    let url = `orgHeaderBatch/all?pageNumber=${search.pageNumber}&pageSize=${search.pageSize}`;
    return request.get(url);
  }
};
