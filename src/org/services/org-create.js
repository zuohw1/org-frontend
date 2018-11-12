import request from '../../utils/request';

export default {
  list(search) {
    let url = `orgHeaderBatch/all?pageNumber=${search.pageNumber}&pageSize=${search.pageSize}`;
    if (search.batchCode && search.batchCode !== '') {
      url += `&batchCode=${search.batchCode}`;
    }
    if (search.workFlowStatus && search.workFlowStatus !== '') {
      url += `&workFlowStatus=${search.workFlowStatus}`;
    }
    if (search.batchVerifier && search.batchVerifier !== '') {
      url += `&batchVerifier=${search.batchVerifier}`;
    }
    if (search.fullName && search.fullName !== '') {
      url += `&fullName=${search.fullName}`;
    }
    if (search.batDateS && search.batDateS !== '') {
      url += `&batDateS=${search.batDateS.format('YYYY-MM-DD')}`;
    }
    if (search.batDateE && search.batDateE !== '') {
      url += `&batDateE=${search.batDateE.format('YYYY-MM-DD')}`;
    }
    return request.get(url);
  },
};