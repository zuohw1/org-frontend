import request from '../../utils/request';

export default {
  list(search) {
    let url = `orgStructure/list?pageNumber=${search.pageNumber}&pageSize=${search.pageSize}`;
    if (search.structureName && search.structureName !== '') {
      url += `&structureName=${search.structureName}`;
    }
    if (search.versionNumber && search.versionNumber !== '') {
      url += `&versionNumber=${search.versionNumber}`;
    }
    if (search.versionDate && search.versionDate !== '') {
      url += `&versionDate=${search.versionDate.format('YYYY-MM-DD')}`;
    }
    if (search.empName && search.empName !== '') {
      url += `&empName=${search.empName}`;
    }
    if (search.empNumber && search.empNumber !== '') {
      url += `&empNumber=${search.empNumber}`;
    }
    if (search.status && search.status !== '') {
      url += `&status=${search.status}`;
    }
    return request.get(url);
  },
  getInitTree(versionId, showDisabled) {
    return request.get(`orgStructure/getInitTree?versionId=${versionId}&showDisabled=${showDisabled}`);
  },
  getTreeByName(name, versionId, showDisabled) {
    return request.get(`orgStructure/getSubTreeByName?versionId=${versionId}&name=${name}&showDisabled=${showDisabled}`);
  },
  getSelectData() {
    return request.get('orgStructure/getSelectData');
  },
  getOrgStructureInfoByVID(versionId, type) {
    return request.get(`orgStructure/getOrgStructureInfoByVID?versionId=${versionId}&type=${type}`);
  },
  saveOrgManualInfo(entity) {
    return request.post('orgStructure/saveOrgManualInfo', entity);
  },
  updateIsCreateNewVer(newVersionFlag, versionId) {
    return request.get(`orgStructure/updateIsCreateNewVer?newVersionFlag=${newVersionFlag}&versionId=${versionId}`);
  },
  deleteOrgManualById(id) {
    return request.delete(`orgStructure/deleteOrgManualById/${id}`);
  },
};
