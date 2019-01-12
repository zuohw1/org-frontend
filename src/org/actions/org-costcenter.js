/* 设置是否展开查询 */
export function setToggle(expand) {
  return {
    type: 'orgCostCenter/stateWillUpdate',
    payload: {
      expand,
    },
  };
}

/* 跳转页面 */
export function redirectDetail(pathname, state) {
  return {
    type: 'orgCostCenter/redirect',
    payload: {
      pathname, state,
    },
  };
}


export function getTreeChildren(treeData) {
  return {
    type: 'orgCostCenter/getTreeChildren',
    payload: {
      treeData,
    },
  };
}

/* 设置树选择项 */
export function setTreeCheckedKeys(props, costCenterData) {
  if (props) {
    let { detailList } = costCenterData;
    const newData = {
      key: detailList.length + 1,
      tOrgId: props.id,
      tOrgName: props.title,
    };
    detailList = [...detailList, newData];
    return {
      type: 'orgCostCenter/stateWillUpdate',
      payload: {
        checkedKeys: [props.id], costCenterData: { ...costCenterData, detailList },
      },
    };
  } else {
    return {
      type: 'orgCostCenter/stateWillUpdate',
      payload: {
        checkedKeys: [],
      },
    };
  }
}

/**
 * 刷新树
 * @returns {{type: string}}
 */
export function refreshTree(versionId, showDisabled) {
  return {
    type: 'orgCostCenter/refreshTree',
    payload: {
      versionId, showDisabled,
    },
  };
}

/**
 * 根据名称查询树
 * @param name
 * @returns {{type: string, payload: {name: *}}}
 */
export function getTreeByName(name, versionId, showDisabled) {
  return {
    type: 'orgCostCenter/getTreeByName',
    payload: {
      name, versionId, showDisabled,
    },
  };
}

export function onExpandKeys(expandedKeys) {
  return {
    type: 'orgCostCenter/stateWillUpdate',
    payload: {
      expandKeys: expandedKeys,
      loadedKeys: expandedKeys,
    },
  };
}

/**
 * 查询条件人员参照
 * @param personModel
 * @returns {{type: string, payload: {personModel: *}}}
 */
export function setPersonModel(personModal) {
  return {
    type: 'orgCostCenter/stateWillUpdate',
    payload: {
      personModal,
    },
  };
}

/* 获取列表数据 */
export function listTable(search) {
  return {
    type: 'orgCostCenter/fetch',
    payload: {
      search,
    },
  };
}

/**
 * 变更弹出框
 * @param detailModel
 * @returns {{type: string, payload: {detailModel: *}}}
 */
export function setDetailModel(detailModel) {
  return {
    type: 'orgCostCenter/stateWillUpdate',
    payload: {
      detailModel,
    },
  };
}

/**
 * 变更弹出框
 * @param detailModel
 * @returns {{type: string, payload: {detailModel: *}}}
 */
export function setDetailData(detailModel, detailRecord) {
  return {
    type: 'orgCostCenter/stateWillUpdate',
    payload: {
      detailModel, detailRecord,
    },
  };
}

/**
 * 删除成本变更行
 * @param costId
 * @param costHeaderId
 * @returns {{type: string, payload: {costId: *, costHeaderId: *}}}
 */
export function deleteDetailData(costId, costHeaderId) {
  return {
    type: 'orgCostCenter/deleteDetailData',
    payload: {
      costId, costHeaderId,
    },
  };
}

/* 更新table数据 */
export function setDetailList(costCenterData) {
  return {
    type: 'orgCostCenter/stateWillUpdate',
    payload: {
      costCenterData,
    },
  };
}

/* 保存数据 */
export function saveCostData(record) {
  return {
    type: 'orgCostCenter/saveCostData',
    payload: {
      record,
    },
  };
}

export function setCorpModel(corpModel) {
  return {
    type: 'orgCostCenter/stateWillUpdate',
    payload: {
      corpModel,
    },
  };
}

export function setCostCenterModel(costCenterModel, refPid) {
  return {
    type: 'orgCostCenter/stateWillUpdate',
    payload: {
      costCenterModel, refPid,
    },
  };
}

export function setMajorModel(majorModel) {
  return {
    type: 'orgCostCenter/stateWillUpdate',
    payload: {
      majorModel,
    },
  };
}

/* 更新数据 */
export function updateCostInfor(record) {
  return {
    type: 'orgCostCenter/updateCostInfor',
    payload: {
      record,
    },
  };
}

export function syncData(costDate, costHeaderId) {
  return {
    type: 'orgCostCenter/syncData',
    payload: {
      costDate, costHeaderId,
    },
  };
}
