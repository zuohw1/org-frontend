/* 获取列表数据 */
export function listTable(search) {
  return {
    type: 'orgCreate/fetch',
    payload: {
      search,
    },
  };
}

/* 设置是否展开查询 */
export function setToggle(expand) {
  return {
    type: 'orgCreate/stateWillUpdate',
    payload: {
      expand,
    },
  };
}

/* 跳转页面 */
export function redirectDetail(pathname, state) {
  return {
    type: 'orgCreate/redirect',
    payload: {
      pathname, state,
    },
  };
}

/* 删除数据 */
export function deleteRecord(record) {
  return {
    type: 'orgCreate/deleteRecord',
    payload: {
      record,
    },
  };
}
