/* 获取列表数据 */
export function listTable(search) {
  return {
    type: 'orgCreate/fetch',
    payload: {
      search,
    },
  };
}
