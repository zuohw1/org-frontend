import request from '../../utils/request';

export default {
  list(search) {
    let url = `orgHeaderBatch/all?pageNumber=${search.pageNumber}&pageSize=${search.pageSize}`;
    if(search.batchCode!==undefined){
      url+= `&batchCode=${search.batchCode}`;
    }
    if(search.workFlowStatus!==undefined){
      url+= `&workFlowStatus=${search.workFlowStatus}`;
    }
    if(search.batchVerifier!==undefined){
      url+= `&batchVerifier=${search.batchVerifier}`;
    }
    if(search.fullName!==undefined){
      url+= `&fullName=${search.fullName}`;
    }
    if(search.batDateS!==undefined){
      url+= `&batDateS=${search.batDateS.format('YYYY-MM-DD')}`;
    }
    if(search.batDateE!==undefined){
      url+= `&batDateE=${search.batDateE.format('YYYY-MM-DD')}`;
    }
    return request.get(url);
  },
  add(records) {
    return request.post('orgApproval', records);
  },
  update(records, id) {
    return request.put(`orgApproval/${id}`, records);
  },
  remove() {

  },
};
