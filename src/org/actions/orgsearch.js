export function searchData() {
  return {
    type: 'orgSearch/searchData',
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
export function getTreeChildren(id) {
  return {
    type: 'orgSearch/getTreeChildren',
    payload: {
      id,
    },
  };
}
export function changeKey(orgTree) {//id, , dataRef
  return {
    type: 'orgSearch/changeKey',
    payload: {
      orgTree,
    },
  };
}