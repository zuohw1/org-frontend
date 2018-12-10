import request from '../../utils/request';

export default {
  list(search) {
    let url = `orgMerge/list?pageNumber=${search.pageNumber}&pageSize=${search.pageSize}`;
    if (search.docCode && search.docCode !== '') {
      url += `&docCode=${search.docCode}`;
    }
    if (search.isApprove && search.isApprove !== '') {
      url += `&isApprove=${search.isApprove}`;
    }
    if (search.docVerifier && search.docVerifier !== '') {
      url += `&docVerifier=${search.docVerifier}`;
    }
    if (search.docStatus && search.docStatus !== '') {
      url += `&docStatus=${search.docStatus}`;
    }
    if (search.docDateS && search.docDateS !== '') {
      url += `&docDateS=${search.docDateS.format('YYYY-MM-DD')}`;
    }
    if (search.docDateE && search.docDateE !== '') {
      url += `&docDateE=${search.docDateE.format('YYYY-MM-DD')}`;
    }
    return request.get(url);
  },
};
