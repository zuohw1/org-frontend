/* 设置卡片界面是否显示，是否可编辑 */
export function setModeShow(modal, formEdit) {
  return {
    type: 'orgApproval/stateWillUpdate',
    payload: {
      modal, formEdit,
    },
  };
}

/* 设置参照界面是否显示 */
export function setRefModeShow(refModal) {
  return {
    type: 'orgApproval/stateWillUpdate',
    payload: {
      refModal,
    },
  };
}

/* 设置参照列表选中数据 */
export function setRefSelectData(refSelectData, refModal) {
  if (refSelectData === null) {
    return {
      type: 'orgApproval/stateWillUpdate',
      payload: {
        refSelectData: {}, refModal,
      },
    };
  } else {
    return {
      type: 'orgApproval/stateWillUpdate',
      payload: {
        refModal, record: refSelectData,
      },
    };
  }
}

/* 获取列表选中数据 */
export function getRecord(record, modal, formEdit) {
  return {
    type: 'orgApproval/getRecord',
    payload: {
      record, modal, formEdit,
    },
  };
}

/* 获取列表数据 */
export function listTable(search) {
  return {
    type: 'orgApproval/fetch',
    payload: {
      search,
    },
  };
}

/* 更新数据 */
export function updataRecord(record) {
  if (record.BATCH_HEADER_ID && record.BATCH_HEADER_ID !== '') {
    return {
      type: 'orgApproval/updataRecord',
      payload: {
        record,
      },
    };
  } else {
    return {
      type: 'orgApproval/newRecord',
      payload: {
        record,
      },
    };
  }
}

/* 删除数据 */
export function deleteRecord(record) {
  return {
    type: 'orgApproval/deleteRecord',
    payload: {
      record,
    },
  };
}

/* 设置是否展开查询 */
export function setToggle(expand) {
  return {
    type: 'orgApproval/stateWillUpdate',
    payload: {
      expand,
    },
  };
}
