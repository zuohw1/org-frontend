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
export function getTreeChildren(orgTree) {
  return {
    type: 'orgSearch/getTreeChildren',
    payload: {
      orgTree,
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