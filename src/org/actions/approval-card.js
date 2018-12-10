/* 设置参照界面是否显示 */
export function setRefModeShow(refModal) {
  return {
    type: 'approvalCard/stateWillUpdate',
    payload: {
      refModal,
    },
  };
}

/* 设置参照列表选中数据 */
export function setRefSelectData(refSelectData, refModal) {
  if (refSelectData === null) {
    return {
      type: 'approvalCard/stateWillUpdate',
      payload: {
        refSelectData: {}, refModal,
      },
    };
  } else {
    return {
      type: 'approvalCard/setRefSelectData',
      payload: {
        refModal, record: refSelectData,
      },
    };
  }
}

/* 设置表单数据 */
export function setRecord(record) {
  return {
    type: 'approvalCard/stateWillUpdate',
    payload: {
      record,
    },
  };
}

/* 更新数据 */
export function updateRecord(record) {
  const id = record.DOC_HEADER_ID;
  if (id && id !== '') {
    return {
      type: 'approvalCard/updateRecord',
      payload: {
        record,
      },
    };
  } else {
    return {
      type: 'approvalCard/newRecord',
      payload: {
        record,
      },
    };
  }
}
