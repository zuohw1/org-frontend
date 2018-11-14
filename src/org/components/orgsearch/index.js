import React from 'react';
import {
  Tree, Card, Form, Layout, Breadcrumb, Button, Input, DatePicker, Select, Icon,
} from 'antd';
import '../assets/styles/org-search.css';
import AdvancedSearchForm from './components/advanced-search-form';
import AdvancedSearchForm2 from './components/advanced-search-form2';
import AdvancedSearchForm3 from './components/advanced-search-form3';
import AdvancedSearchForm4 from './components/advanced-search-form4';
import request from '../../../utils/request';

const { Sider, Content } = Layout;
const { TreeNode } = Tree;
const { Option } = Select;
const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
const WrappedAdvancedSearchForm2 = Form.create()(AdvancedSearchForm2);
const WrappedAdvancedSearchForm3 = Form.create()(AdvancedSearchForm3);
const WrappedAdvancedSearchForm4 = Form.create()(AdvancedSearchForm4);


const Orgsearch = (state) => {
  const { actions } = state;
  const {
    searchData, isTrueExecute, getTreeChildren, handleChange,
  } = actions;
  const children = [];
  for (let i = 0; i < state.dataList.length; i += 1) {
    children.push(<Option key={state.dataList[i].show}>{ state.dataList[i].show }</Option>);
  }
  if (state.execute === true) {
    searchData(state.login_name, state.resp_id);
    isTrueExecute();
  }
  const select = () => {
    // console.log('selected', selectedKeys, info);selectedKeys, info
  };
  const handleChangeValue = (event) => {
    handleChange(event);
  };
  const onLoadData = (treeNode) => {
    const { dataRef } = treeNode.props;
    return new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      setTimeout(async () => {
        const id = dataRef.key;
        const result = await request.get(`organization/sub?topId=${id}&versionId=${state.flexValue}`);
        dataRef.children = result;
        getTreeChildren(state.treeData);
        resolve();
      }, 1000);
    });
  };
  const renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode icon={<Icon type="star-o" theme="twoTone" />} title={item.title} key={item.key} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  };

  return (
    <div className="Orgsearch">
      <Layout>
        <Content>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>组织管理</Breadcrumb.Item>
            <Breadcrumb.Item>组织结构查询</Breadcrumb.Item>
          </Breadcrumb>
          <div className="humanlaout">
            <Sider className="sider">
              <div className="siderTop">
                <b className="siderTopL">结构版本</b>
                <span className="siderTopR">{ state.structureName }</span>
              </div>
              <div className="siderTopC2">
                <span className="siderTopC2span1">组织名</span>
                <input className="siderTopC2input1" type="text" />
                <Button icon="search" className="siderTopC2span2">查找</Button>
                <Button icon="reload" className="siderTopC2span3">刷新</Button>
                <Button icon="layout" className="siderTopC2span4">组织结构图</Button>
              </div>
              <div className="siderTree">
                <Tree
                  showIcon
                  defaultExpandAll
                  onSelect={select}
                  loadData={onLoadData}
                >
                  {renderTreeNodes(state.treeData)}
                </Tree>
              </div>
            </Sider>
            <Content className="content">
              <div id="thistableas">
                <div className="contentTop">
                  <div className="contentTopItem1">
                    <span>版本号</span>
                    <Select
                      size="default"
                      value={state.flexName}
                      onChange={handleChangeValue}
                    >
                      {children}
                    </Select>
                  </div>
                  <div className="contentTopItem2">
                    <Input addonBefore="开始日期：" defaultValue={state.dateFrom} />
                    <span>结束日期：</span>
                    <DatePicker className="contentTopItem2Third" />
                  </div>
                  <div className="contentTopItem3"><Button className="contentTopItem3But">查找</Button></div>
                </div>
                <Card title="基本信息">
                  <WrappedAdvancedSearchForm sta={state} />
                </Card>
                <Card title="地点信息">
                  <WrappedAdvancedSearchForm2 sta2={state} />
                </Card>
                <Card title="附加信息">
                  <WrappedAdvancedSearchForm3 sta3={state} />
                </Card>
                <Card title="GRE/法律实体信息">
                  <WrappedAdvancedSearchForm4 sta4={state} />
                </Card>
              </div>
            </Content>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default Orgsearch;
