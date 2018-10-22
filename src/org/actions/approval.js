export function isModeShow(modal,formEdit) {
  return {
    type: 'orgApproval/stateWillUpdate',
    payload: {
      modal,formEdit
    },
  };
}

export function isRefModeShow(refmodal) {
  return {
    type: 'orgApproval/stateWillUpdate',
    payload: {
      refmodal
    },
  };
}

export function getRecord(record) {
  return {
    type: 'orgApproval/getRecord',
    payload: {
      record,
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

export function getRefData(url,search) {
  return {
    type: 'orgApproval/getRefData',
    payload: {
      url,search,
    },
  };
}

export function updataRecord(record) {
  if(record.BATCH_HEADER_ID && record.BATCH_HEADER_ID!==''){
    return {
      type: 'orgApproval/updataRecord',
      payload: {
        record,
      },
    };
  }else{
    return {
      type: 'orgApproval/newRecord',
      payload: {
        record,
      },
    };
  }
}

export function newRecord(record) {
  return {
    type: 'orgApproval/newRecord',
    payload: {
      record,
    },
  };
}

export function deleteRecord(record) {
  return {
    type: 'orgApproval/deleteRecord',
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
