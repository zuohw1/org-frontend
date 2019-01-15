/* 设置是否展开查询 */
export function setToggle(expand) {
  return {
    type: 'orgStructure/stateWillUpdate',
    payload: {
      expand,
    },
  };
}

/* 跳转页面 */
export function redirectDetail(pathname, state) {
  return {
    type: 'orgStructure/redirect',
    payload: {
      pathname, state,
    },
  };
}


export function getTreeChildren(treeData) {
  return {
    type: 'orgStructure/getTreeChildren',
    payload: {
      treeData,
    },
  };
}

/* 设置树选择项 */
export function setTreeCheckedKeys(checkedKeys) {
  return {
    type: 'orgStructure/stateWillUpdate',
    payload: {
      checkedKeys,
    },
  };
}

/**
 * 刷新树
 * @returns {{type: string}}
 */
export function refreshTree(versionId, showDisabled) {
  return {
    type: 'orgStructure/refreshTree',
    payload: {
      versionId, showDisabled,
    },
  };
}

/**
 * 根据名称查询树
 * @param name
 * @returns {{type: string, payload: {name: *}}}
 */
export function getTreeByName(name, versionId, showDisabled) {
  return {
    type: 'orgStructure/getTreeByName',
    payload: {
      name, versionId, showDisabled,
    },
  };
}

export function onExpandKeys(expandedKeys) {
  return {
    type: 'orgStructure/stateWillUpdate',
    payload: {
      expandKeys: expandedKeys,
    },
  };
}

/**
 * 查询条件人员参照
 * @param personModel
 * @returns {{type: string, payload: {personModel: *}}}
 */
export function setPersonModel(personModal) {
  return {
    type: 'orgStructure/stateWillUpdate',
    payload: {
      personModal,
    },
  };
}

/* 获取列表数据 */
export function listTable(search) {
  return {
    type: 'orgStructure/fetch',
    payload: {
      search,
    },
  };
}

/* 是否显示失效 */
export function updateShowDisabled(showDisabled) {
  return {
    type: 'orgStructure/stateWillUpdate',
    payload: {
      showDisabled,
    },
  };
}

/**
 * 新组织参照
 * @param orgModel
 * @returns {{type: string, payload: {personModel: *}}}
 */
export function setOrgModel(orgModel) {
  return {
    type: 'orgStructure/stateWillUpdate',
    payload: {
      orgModel,
    },
  };
}

export function setUpdateOrgModel(updateOrgModel) {
  return {
    type: 'orgStructure/stateWillUpdate',
    payload: {
      updateOrgModel,
    },
  };
}

export function saveOrgManualInfo(entity) {
  return {
    type: 'orgStructure/saveOrgManualInfo',
    payload: {
      entity,
    },
  };
}

export function updateIsCreateNewVer(newVersionFlag, versionId) {
  return {
    type: 'orgStructure/updateIsCreateNewVer',
    payload: {
      newVersionFlag, versionId,
    },
  };
}

export function deleteOrgManualById(id, operationType, data) {
  return {
    type: 'orgStructure/deleteOrgManualById',
    payload: {
      id, operationType, data,
    },
  };
}
