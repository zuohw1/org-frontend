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
