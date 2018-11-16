export function searchData(name, id) {
  return {
    type: 'orgSearch/searchData',
    payload: {
      name, id,
    },
  };
}
export function orgSearchDetailData() {
  return {
    type: 'orgSearch/orgSearchDetailData',
    payload: {
    },
  };
}
export function isTrueExecute(execute) {
  return {
    type: 'orgSearch/isTrueExecute',
    payload: {
      execute,
    },
  };
}
export function getTreeChildren(treeData) {
  return {
    type: 'orgSearch/getTreeChildren',
    payload: {
      treeData,
    },
  };
}
export function changeKey(id) {
  return {
    type: 'orgSearch/changeKey',
    payload: {
      id,
    },
  };
}
export function handleChange(flexName) {
  return {
    type: 'orgSearch/handleChange',
    payload: {
      flexName,
    },
  };
}
export function searchTreeNodes(orgTreeName) {
  return {
    type: 'orgSearch/searchTreeNodes',
    payload: {
      orgTreeName,
    },
  };
}
