/* 设置是否展开查询 */
export function setToggle(expand) {
  return {
    type: 'orgCostCenter/stateWillUpdate',
    payload: {
      expand,
    },
  };
}

/* 跳转页面 */
export function redirectDetail(pathname, state) {
  return {
    type: 'orgCostCenter/redirect',
    payload: {
      pathname, state,
    },
  };
}


export function getTreeChildren(treeData) {
  return {
    type: 'orgCostCenter/getTreeChildren',
    payload: {
      treeData,
    },
  };
}

/* 设置树选择项 */
export function setTreeCheckedKeys(checkedKeys) {
  return {
    type: 'orgCostCenter/stateWillUpdate',
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
    type: 'orgCostCenter/refreshTree',
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
    type: 'orgCostCenter/getTreeByName',
    payload: {
      name, versionId, showDisabled,
    },
  };
}

export function onExpandKeys(expandedKeys) {
  return {
    type: 'orgCostCenter/stateWillUpdate',
    payload: {
      expandKeys: expandedKeys,
      loadedKeys: expandedKeys,
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
    type: 'orgCostCenter/stateWillUpdate',
    payload: {
      personModal,
    },
  };
}

/* 获取列表数据 */
export function listTable(search) {
  return {
    type: 'orgCostCenter/fetch',
    payload: {
      search,
    },
  };
}
