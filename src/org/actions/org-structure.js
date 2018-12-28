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
export function refreshTree() {
  return {
    type: 'orgStructure/refreshTree',
  };
}

/**
 * 根据名称查询树
 * @param name
 * @returns {{type: string, payload: {name: *}}}
 */
export function getTreeByName(name) {
  return {
    type: 'orgStructure/getTreeByName',
    payload: {
      name,
    },
  };
}

export function onExpandKeys(expandedKeys) {
  return {
    type: 'orgStructure/stateWillUpdate',
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
