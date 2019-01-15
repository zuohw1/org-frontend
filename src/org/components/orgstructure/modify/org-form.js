import React from 'react';
import {
  Button, Card, Checkbox, Col, Form, Input, Modal, Row, Table,
} from 'antd';
import SearchTable from '../../../../components/search-table';
import OrgTree from '../../../../components/org-tree';

const FormItem = Form.Item;

export default (props) => {
  const {
    form,
    orgStructureInfo,
    newAddOrgList,
    updateParentOrgList,
    checkedKeys,
    orgModel,
    refSelectData,
    actions,
    versionId,
    updateOrgModel,
  } = props;

  const { getFieldDecorator } = form;
  const {
    setOrgModel, saveOrgManualInfo, updateIsCreateNewVer, setUpdateOrgModel, deleteOrgManualById,
  } = actions;

  const onClickDeleteAdd = (id) => {
    const data = newAddOrgList.filter(item => item.docHeaderId !== id);
    deleteOrgManualById(id, 'ADD', data);
  };

  const onClickDeleteMod = (id) => {
    const data = updateParentOrgList.filter(item => item.docHeaderId !== id);
    deleteOrgManualById(id, 'UPD', data);
  };

  const addNewOrg = () => {
    if (checkedKeys.length === 0) {
      Modal.info({
        title: '提示',
        content: (
          <div>
            <p>请先勾选父组织！</p>
          </div>
        ),
      });
    } else {
      const newOrgId = form.getFieldValue('newOrgId');
      if (!newOrgId || newOrgId === null || newOrgId === '') {
        Modal.info({
          title: '提示',
          content: (
            <div>
              <p>请先选择要新增的组织！</p>
            </div>
          ),
        });
      } else {
        saveOrgManualInfo({
          organizationIdParent: checkedKeys[0], organizationIdChild: newOrgId, orgStructureVersionIdEhr: versionId, operationType: 'ADD',
        });
      }
    }
  };

  const onClickNewOrg = () => {
    if (checkedKeys.length === 0) {
      Modal.info({
        title: '提示',
        content: (
          <div>
            <p>请先勾选父组织！</p>
          </div>
        ),
      });
    } else {
      setOrgModel(true);
    }
  };

  const onClickParentOrg = () => {
    const newVersionFlag = form.getFieldValue('newVersionFlag');
    if (newVersionFlag === false) {
      Modal.info({
        title: '提示',
        content: (
          <div>
            <p>修改组织结构必须勾选生成新版本！</p>
          </div>
        ),
      });
    } else if (checkedKeys.length === 0) {
      Modal.info({
        title: '提示',
        content: (
          <div>
            <p>请先勾选修改组织！</p>
          </div>
        ),
      });
    } else {
      setUpdateOrgModel(true);
    }
  };

  const updateParentOrg = () => {
    if (checkedKeys.length === 0) {
      Modal.info({
        title: '提示',
        content: (
          <div>
            <p>请先勾选变更组织！</p>
          </div>
        ),
      });
    } else {
      const newOrgId = form.getFieldValue('parentOrgId');
      if (!newOrgId || newOrgId === null || newOrgId === '') {
        Modal.info({
          title: '提示',
          content: (
            <div>
              <p>请先选择父组织！</p>
            </div>
          ),
        });
      } else {
        saveOrgManualInfo({
          organizationIdChild: checkedKeys[0], organizationIdParent: newOrgId, orgStructureVersionIdEhr: versionId, operationType: 'UPD',
        });
      }
    }
  };

  const updateNewVerFlag = (e) => {
    if (e.target.checked === true) {
      updateIsCreateNewVer('Y', versionId);
    } else if (updateParentOrgList.length > 0) {
      Modal.info({
        title: '提示',
        content: (
          <div>
            <p>存在组织结构修改记录，必须勾选生成新版本！</p>
          </div>
        ),
      });
    } else {
      updateIsCreateNewVer('N', versionId);
    }
  };

  const columnsAdd = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      width: 50,
    }, {
      title: '新添加组织',
      dataIndex: 'organizationNameChild',
      key: 'organizationNameChild',
      align: 'center',
      width: 200,
    }, {
      title: '父组织',
      dataIndex: 'organizationNameParent',
      key: 'organizationNameParent',
      align: 'center',
      width: 200,
    }, {
      title: '操作人',
      dataIndex: 'createName',
      key: 'createName',
      align: 'center',
      width: 100,
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: 50,
      render: (_, records) => {
        return (
          <span>
            <a href=" javascript:;" onClick={() => onClickDeleteAdd(records.docHeaderId)}>删除</a>
          </span>
        );
      },
    },
  ];

  const columnsMod = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      width: 50,
    }, {
      title: '组织名称',
      dataIndex: 'organizationNameChild',
      key: 'organizationNameChild',
      align: 'center',
      width: 200,
    }, {
      title: '修改后父组织',
      dataIndex: 'organizationNameParent',
      key: 'organizationNameParent',
      align: 'center',
      width: 200,
    }, {
      title: '操作人',
      dataIndex: 'createName',
      key: 'createName',
      align: 'center',
      width: 100,
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: 50,
      render: (_, records) => {
        return (
          <span>
            <a href=" javascript:;" onClick={() => onClickDeleteMod(records.docHeaderId)}>删除</a>
          </span>
        );
      },
    },
  ];

  const refUrl = 'orgStructure/selectNewAddOrgList?';
  const refColumns = [{
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    align: 'center',
    width: '12%',
  }, {
    title: '组织名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  }];
  const refCodes = [{ code: 'newOrgId', refcode: 'id' }, { code: 'newOrgName', refcode: 'name' }];

  const OrgRefCodes = [{ code: 'parentOrgId', refcode: 'id' }, { code: 'parentOrgName', refcode: 'title' }];

  return (
    <div>
      <SearchTable
        refUrl={refUrl}
        columns={refColumns}
        refCodes={refCodes}
        refSelectData={refSelectData}
        setRefModeShow={setOrgModel}
        refModal={orgModel}
        parentForm={form}
        placeholder="查找组织"
      />
      <OrgTree
        refCodes={OrgRefCodes}
        refSelectData={refSelectData}
        setRefModeShow={setUpdateOrgModel}
        refModal={updateOrgModel}
        parentForm={form}
        versionId={versionId}
      />
      <Card
        title="组织结构版本"
      >
        <Form className="ant-advanced-search-form">
          <Row>
            <Col span={24} key={1}>
              <FormItem label="组织结构名称">
                {getFieldDecorator('structureName', {
                  initialValue: orgStructureInfo.structureName,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8} key={2}>
              <FormItem label="编号">
                {getFieldDecorator('versionNumber', {
                  initialValue: orgStructureInfo.versionNumber,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
            <Col span={8} key={3}>
              <FormItem label="起始日期">
                {getFieldDecorator('dateFrom', {
                  initialValue: orgStructureInfo.dateFrom,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
            <Col span={8} key={4}>
              <FormItem label="截止日期">
                {getFieldDecorator('dateTo', {
                  initialValue: orgStructureInfo.dateTo,
                })(
                  <Input disabled />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={3} key={5}>
              <FormItem label="生成新版本">
                {getFieldDecorator('newVersionFlag')(
                  <Checkbox onChange={updateNewVerFlag} checked={orgStructureInfo.newVersionFlag === 'Y'} />,
                )}
              </FormItem>
            </Col>
            <Col span={21} key={6}>
              <div style={{ paddingTop: '8px', paddingLeft: '5px' }}>如果在本次的结构调整中需要生成新版本的情况，请勾选生成新版本选项，系统在同步的时候会自动生成新版本。 </div>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        title="添加新组织"
      >
        <Form className="ant-advanced-search-form">
          <Row gutter={8}>
            <Col span={20}>
              <FormItem label="选择新组织">
                {getFieldDecorator('newOrgName')(
                  <Input.Search onSearch={onClickNewOrg} />,
                )}
              </FormItem>
              {getFieldDecorator('newOrgId')(
                <Input hidden />,
              )}
            </Col>
            <Col span={4}><Button onClick={addNewOrg}>确认</Button></Col>
          </Row>
        </Form>
        <Row>
          <Table columns={columnsAdd} size="small" bordered dataSource={newAddOrgList} pagination={false} />
        </Row>
      </Card>
      <Card
        title="组织结构修改"
      >
        <Form className="ant-advanced-search-form">
          <Row gutter={8}>
            <Col span={20}>
              <FormItem label="选择父组织">
                {getFieldDecorator('parentOrgName')(
                  <Input.Search onSearch={onClickParentOrg} />,
                )}
              </FormItem>
              {getFieldDecorator('parentOrgId')(
                <Input hidden />,
              )}
            </Col>
            <Col span={4}><Button onClick={updateParentOrg}>确认</Button></Col>
          </Row>
        </Form>
        <Row>
          <Table columns={columnsMod} size="small" bordered dataSource={updateParentOrgList} pagination={false} />
        </Row>
      </Card>
    </div>
  );
};
