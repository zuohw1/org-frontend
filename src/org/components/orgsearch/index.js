import React from 'react';
import {
  Tree, Card, Form, Layout, Breadcrumb, Button, Input, DatePicker, Select,
} from 'antd';
import '../assets/styles/Orgsearch.css';
import AdvancedSearchForm from '../../../components/AdvancedSearchForm';
import AdvancedSearchForm2 from '../../../components/AdvancedSearchForm2';
import AdvancedSearchForm3 from '../../../components/AdvancedSearchForm3';
import AdvancedSearchForm4 from '../../../components/AdvancedSearchForm4';
//import moment from 'moment';

const { Sider, Content } = Layout;
const { TreeNode } = Tree;
const Option = Select.Option;
//const dateFormat = 'YYYY/MM/DD';
const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
const WrappedAdvancedSearchForm2 = Form.create()(AdvancedSearchForm2);
const WrappedAdvancedSearchForm3 = Form.create()(AdvancedSearchForm3);
const WrappedAdvancedSearchForm4 = Form.create()(AdvancedSearchForm4);


const Orgsearch = (state) => {
  console.log(state)
  console.log(state.orgTree)
  const { actions, } = state;
  const { searchData, isTrueExecute } = actions;
  const children = [];
  for (let i = 0; i < state.dataList.length; i++) {
    children.push(<Option key={ state.dataList[i].show }>{ state.dataList[i].show }</Option>);
  }
  if(state.execute === true){
    searchData();
    isTrueExecute();
  }
  const select = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  const loadData = (treeNode) => {
    return new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      setTimeout(() => {
        treeNode.props.dataRef.children = [
          { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
          { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
        ];
        this.setState({
          treeData: [...this.state.treeData],
        });
        resolve();
      }, 1000);
    });
  }
  const renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.id} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  }

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
                    onSelect={select}
                    onLoadData={loadData}
                  >
                    {renderTreeNodes(state.orgTree)}
                  </Tree>
                </div>
              </Sider>
              <Content className="content"> 
                <div id="thistableas">
                  <div className="contentTop">
                    <div className="contentTopItem1">
                      <span>版本号</span>
                      <Select
                        size='default'
                        defaultValue={ state.flexName }
                        onChange={handleChange}
                      >
                        {children}
                      </Select>
                    </div>
                    <div className="contentTopItem2">
                      <Input addonBefore="开始日期：" defaultValue={ state.dateFrom }/>
                      <span>结束日期：</span>
                      <DatePicker  className="contentTopItem2Third"/>
                    </div>
                    <div className="contentTopItem3"><Button className="contentTopItem3But">查找</Button></div>
                  </div>
                  <Card title="基本信息">
                    <WrappedAdvancedSearchForm />
                  </Card>
                  <Card title="地点信息">
                    <WrappedAdvancedSearchForm2 />
                  </Card>
                  <Card title="附加信息">
                    <WrappedAdvancedSearchForm3 />
                  </Card>
                  <Card title="GRE/法律实体信息">
                    <WrappedAdvancedSearchForm4 />
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
