import React from 'react';
import {
  Collapse,
  Modal, Table,
} from 'antd';
import request from '../../../../utils/request';

const { Panel } = Collapse;

export default (props) => {
  const { requestList, versionId } = props;

  const getReason = (record) => {
    setTimeout(async () => {
      const result = await request.get(`orgStructure/getOrgStruErrorReason?docHeaderId=${record.docHeaderId}&versionId=${versionId}`);
      if (result !== '') {
        Modal.info({
          title: '提示',
          content: (
            <div>
              <p>result</p>
            </div>
          ),
        });
      }
    }, 0);
  };

  const addColumns = [
    {
      title: '新添加组织',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      width: 60,
      render: (text, record) => {
        if (record.docStatus === 'T4') {
          return (
            <span>
              <a href=" javascript:;" onClick={() => getReason(record)}>text</a>
            </span>
          );
        } else {
          return (
            <span>{text}</span>
          );
        }
      },
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
    },
  ];

  const modColumns = [
    {
      title: '组织结构修改',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      width: 60,
      render: (text, record) => {
        if (record.docStatus === 'T4') {
          return (
            <span>
              <a href=" javascript:;" onClick={() => getReason(record)}>text</a>
            </span>
          );
        } else {
          return (
            <span>{text}</span>
          );
        }
      },
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
    },
  ];

  return (
    <div>
      {
        requestList.map((hitem) => {
          return (
            hitem.requestList.map((item, index) => {
              const key = index + 1;
              const date = item.requestDate.substring(0, 10);
              const datetime = item.requestDate.substring(0, 16);
              if (item.newAddOrgList.length !== 0 && item.updateParentOrgList.length !== 0) {
                return (
                  <Collapse bordered={false} defaultActiveKey={['1']}>
                    <Panel header={`${date}  变更记录`} key={key}>
                      <div>&nbsp;&nbsp;第{index + 1}次 变更记录 &nbsp;&nbsp;时间：{datetime}</div>
                      <Table size="small" bordered columns={addColumns} dataSource={item.newAddOrgList} pagination={false} />
                      <Table size="small" bordered columns={modColumns} dataSource={item.updateParentOrgList} pagination={false} />
                    </Panel>
                  </Collapse>
                );
              } else if (item.newAddOrgList.length !== 0) {
                return (
                  <Collapse bordered={false}>
                    <Panel header={`${date}  变更记录`} key={key}>
                      <div>&nbsp;&nbsp;第{index + 1}次 变更记录 &nbsp;&nbsp;时间：{datetime}</div>
                      <Table size="small" bordered columns={addColumns} dataSource={item.newAddOrgList} pagination={false} />
                    </Panel>
                  </Collapse>
                );
              } else if (item.updateParentOrgList.length !== 0) {
                return (
                  <Collapse bordered={false}>
                    <Panel header={`${date}  变更记录`} key={key}>
                      <div>&nbsp;&nbsp;第{index + 1}次 变更记录 &nbsp;&nbsp;时间：{datetime}</div>
                      <Table size="small" bordered columns={modColumns} dataSource={item.updateParentOrgList} pagination={false} />
                    </Panel>
                  </Collapse>
                );
              } else {
                return (
                  <Collapse bordered={false}>
                    <Panel header={`${date}  变更记录`} key={key}>
                      <div>&nbsp;&nbsp;第{index + 1}次 变更记录 &nbsp;&nbsp;时间：{datetime}</div>
                      <Table size="small" bordered pagination={false} />
                    </Panel>
                  </Collapse>
                );
              }
            })
          );
        })
      }
    </div>
  );
};
