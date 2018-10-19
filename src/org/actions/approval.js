export function isModeShow(modal) {
  return {
    type: 'orgApproval/stateWillUpdate',
    payload: {
      modal,
    },
  };
}

export function getRecord(record) {
  return {
    type: 'orgApproval/stateWillUpdate',
    payload: {
      record,
    },
  };
}

export function isNewModeShow(newModal) {
  return {
    type: 'orgApproval/stateWillUpdate',
    payload: {
      newModal,
    },
  };
}

export function selectName(search) {
  return {
    type: 'orgApproval/stateWillUpdate',
    payload: {
      search,
    },
  };
}

export function listTable(search) {
  return {
    type: 'orgApproval/fetch',
    payload: {
      search,
    },
  };
}

export function updataRecord(record) {
  return {
    type: 'orgApproval/updataRecord',
    payload: {
      record,
    },
  };
}

export function newRecord(record) {
  return {
    type: 'orgApproval/newRecord',
    payload: {
      record,
    },
  };
}

export function setToggle(expand) {
  console.log(expand);
  return {
    type: 'orgApproval/stateWillUpdate',
    payload: {
      expand,
    },
  };
}
