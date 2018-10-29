export function isModeShow(modal,formEdit) {
  return {
    type: 'orgSearch/stateWillUpdate',
    payload: {
      modal,formEdit
    },
  };
}