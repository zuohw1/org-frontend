import React, { Component } from 'react';
import { Tree, Card, Form, Layout, Breadcrumb, Button } from 'antd';
import '../assets/styles/Orgsearch.css';
import AdvancedSearchForm from '../../../components/AdvancedSearchForm';
import AdvancedSearchForm2 from '../../../components/AdvancedSearchForm2';
import AdvancedSearchForm3 from '../../../components/AdvancedSearchForm3';
import AdvancedSearchForm4 from '../../../components/AdvancedSearchForm4';
//import fetch from 'dva/fetch';
import { connect } from 'dva';

const { Sider, Content } = Layout;
const { TreeNode } = Tree;
const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
const WrappedAdvancedSearchForm2 = Form.create()(AdvancedSearchForm2);
const WrappedAdvancedSearchForm3 = Form.create()(AdvancedSearchForm3);
const WrappedAdvancedSearchForm4 = Form.create()(AdvancedSearchForm4);

class Orgsearch extends Component {
  constructor(props){
    super(props)
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'orgSearch/fetch',
      payload: {//可以不填
        //data: data
      },
    })
  }
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  ///orgquery
  /*componentDidMount(){
    fetch('/api/orgquery', { // 在URL中写上传递的参数
      method: 'GET'
    })
    .then((res)=>{
      return res.text()
    })
    .then((res)=>{
      console.log(res)
    })
  }*/
  render() {
    //查看网络请求传递出来的内容
    console.log(this.props.data)
    //this.props.data为mapStateToProps中的data
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
                  <span className="siderTopR">四川省分公司组织结构</span>
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
                    defaultExpandedKeys={['0-0-0']}
                    onSelect={this.onSelect}
                  >
                    <TreeNode title="四川省分公司" key="0-0">
                      <TreeNode title="四川省分公司总部" key="0-0-0">
                        <TreeNode title="四川省公司计划建设部" key="0-0-0-0" />
                        <TreeNode title="四川省公司战略客户部" key="0-0-0-1" />
                        <TreeNode title="四川省公司信息安全部" key="0-0-0-2" />
                      </TreeNode>
                      <TreeNode title="四川省地市分公司" key="0-0-1">
                        <TreeNode title="乐川市分公司" key="0-0-1-0" />
                        <TreeNode title="绵阳市分公司" key="0-0-1-1" />
                      </TreeNode>
                    </TreeNode>
                  </Tree>
                </div>
              </Sider>
              <Content className="content">
                <div id="thistableas">
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
  }
}

//export default Orgsearch;

const mapStateToProps = (state) => {  //见名知意，把state转换为props
  //可以打印state看看数据结构，然后放到data里
  return {
    data: state.data
  };
};
export default connect(mapStateToProps)(Orgsearch)
