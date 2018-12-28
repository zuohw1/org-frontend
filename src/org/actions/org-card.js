/* 设置是否展开查询 */
export function setToggle(expand) {
  return {
    type: 'orgCard/stateWillUpdate',
    payload: {
      expand,
    },
  };
}

export function getTreeChildren(treeData) {
  return {
    type: 'orgCard/getTreeChildren',
    payload: {
      treeData,
    },
  };
}

/* 设置树选择项 */
export function setTreeCheckedKeys(checkedKeys) {
  return {
    type: 'orgCard/stateWillUpdate',
    payload: {
      checkedKeys,
    },
  };
}

/* 校验所选父组织是否删除 */
export function checkOrgIsDelete(docHeaderId, orgId) {
  return {
    type: 'orgCard/checkOrgIsDelete',
    payload: {
      docHeaderId, orgId,
    },
  };
}

/**
 * 刷新树
 * @returns {{type: string}}
 */
export function refreshTree() {
  return {
    type: 'orgCard/refreshTree',
  };
}

/**
 * 根据名称查询树
 * @param name
 * @returns {{type: string, payload: {name: *}}}
 */
export function getTreeByName(name) {
  return {
    type: 'orgCard/getTreeByName',
    payload: {
      name,
    },
  };
}

export function onExpandKeys(expandedKeys) {
  return {
    type: 'orgCard/stateWillUpdate',
    payload: {
      expandKeys: expandedKeys,
      loadedKeys: expandedKeys,
    },
  };
}
