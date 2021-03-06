/* 获取列表数据 */
export function listTable(search) {
  return {
    type: 'orgMerge/fetch',
    payload: {
      search,
    },
  };
}

/* 设置是否展开查询 */
export function setToggle(expand) {
  return {
    type: 'orgMerge/stateWillUpdate',
    payload: {
      expand,
    },
  };
}

/* 跳转页面 */
export function redirectDetail(pathname, state) {
  return {
    type: 'orgMerge/redirect',
    payload: {
      pathname, state,
    },
  };
}
