import React from 'react';
import { Layout, Breadcrumb, Button } from 'antd';
import Card from './card';
import View from './org-view';
import '../../../assets/styles/module.less';

const { Content } = Layout;

const orgCreate = (state) => {
  const onClickReturn = () => {
    state.history.goBack(-1);
  };

  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '10px 0' }}>
        <Breadcrumb.Item>
          组织管理
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <strong>组织业务发起信息</strong>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="page-module"
        style={{
          background: '#fff', padding: '15px', margin: 0,
        }}
      >
        <Card {...state} />
        <View {...state} />
        <Button onClick={onClickReturn}>返回
        </Button>
      </Content>
    </React.Fragment>
  );
};

export default orgCreate;
