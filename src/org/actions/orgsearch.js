export function searchData() {
  return {
    type: 'orgSearch/searchData',
    payload: {
    	//data,
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
/*export function handleChangeValue(value) {
  return {
    type: 'orgSearch/handleChangeValue',
    payload: {
      value,
    },
  };
}*/