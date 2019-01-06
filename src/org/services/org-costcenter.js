import request from '../../utils/request';

export default {
  list(search) {
    let url = `orgCostHeader/list?pageNumber=${search.pageNumber}&pageSize=${search.pageSize}`;
    if (search.empNumber && search.empNumber !== '') {
      url += `&employeeName=${search.empNumber}`;
    }
    if (search.costDate && search.costDate !== '') {
      url += `&costDate=${search.costDate.format('YYYY-MM-DD')}`;
    }
    if (search.costStatus && search.costStatus !== '') {
      url += `&costStatus=${search.costStatus}`;
    }
    return request.get(url);
  },
  getInitTree() {
    return request.get('auth/getInitTree');
  },
  getTreeByName(name) {
    return request.get(`auth/getTreeByName?name=${name}`);
  },
  getCostDataById(costHeaderId) {
    return request.get(`orgCostHeader/getCostDataById?costHeaderId=${costHeaderId}`);
  },
};
