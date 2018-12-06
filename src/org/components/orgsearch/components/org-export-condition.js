/* eslint-disable */
import React, { Component } from 'react';
import {
  Button, Layout, Select, TreeSelect, message, Tree,
} from 'antd';
import request from '../../../../utils/request';
import { Link } from 'dva/router';
import '../../assets/styles/org-export-condition.less';

const { Header, Content } = Layout;
const Option = Select.Option;
const { TreeNode } = Tree;

class OrgExportCondition extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	refUrl: `organization/list?login_name=hq-ehr&resp_id=200000515`,
	    	treeId: "",
	    	rootValue: undefined,
	    	treeData: [],
	    	key: "1",
	    	sta: {},
	    	treeNodeId: "",
	    };
	}
	async componentDidMount() {
	    const result = await request.get(this.state.refUrl);
	    this.setState({ treeData: result.treeData });
	    this.setState({ sta: result });
	}
	orgReset = ()=>{
	    this.setState({ 
	    	rootValue: undefined,
	    });
	    this.setState({ 
	    	key: "1",
	    });
	}
	orgExportExcel = () => {
		if(this.state.rootValue === undefined){
			message.warning('请选择根节点');
		}else{
			window.location.href=`http://10.10.14.13:8080/api/organization/all?topId=${this.state.treeNodeId}&lev=${this.state.key}`;
			message.success('导出Excel成功');
		}
	}
	changeKey = (event) => {
	    this.setState({ 
	    	key: event
	    });
	}
	handleChange = (rootValue, label, extra) => {
		console.log(rootValue, label, extra);
	    this.setState({ rootValue });
	    if(rootValue !== undefined){
	    	this.setState({
		    	treeNodeId: extra.triggerNode.props.eventKey
		    });
	    }
	}
	LoadData = (treeNode) => {
		console.log(treeNode);
		const { dataRef } = treeNode.props;
		return new Promise((resolve) => {
	      if (treeNode.props.children) {
	      	console.log(111);
	        resolve();
	        return;
	      }
	      setTimeout(async () => {
	        const id = dataRef.id;
	        const result = await request.get(`organization/sub?topId=${id}&versionId=${this.state.sta.flexValue}`);
	        dataRef.children = result;
	        this.setState({
	          treeData: [...this.state.treeData]
	        });
	        resolve();
	      }, 1000);
	    });
	}
	renderTreeNodes = (data) => {
    	return data.map((item) => {
		    if (item.children) {
		        return (
		          <TreeNode {...item} dataRef={item}>
		            {this.renderTreeNodes(item.children)}
		          </TreeNode>
		        );
		    }
		    return <TreeNode {...item} dataRef={item} />;
	    });
	}
	render() {
		const childItem4 = [];
		for (let i = 1; i < 11; i += 1) {
		    childItem4.push(<Option key={i.toString()}>{i}</Option>);
		}
	    return (
	    	<div className="OrgExportCondition">
		  		<Layout>
		      	<Header>组织结构图查询条件</Header>
		      	<Content>
		      		<div className="conditionContainer">
						<span className="conditionContainerItem1">选择根节点：</span>
						<span className="conditionContainerItem2">
							<TreeSelect
						        allowClear
						        showSearch={false}
						        defaultExpandAll={true}
						        value={this.state.rootValue}
						        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
						        placeholder="请选择"
						        onChange={this.handleChange}
						        loadData={this.LoadData}
						    >
						    	{this.renderTreeNodes(this.state.treeData)}
						    </TreeSelect>	
						</span>
						<span className="conditionContainerItem3">展示层数：</span>
						<span className="conditionContainerItem4">
							<Select value={this.state.key} onChange={this.changeKey}>{childItem4}</Select>
						</span>
						<span className="conditionContainerItem5">
							<Button type="primary" onClick={this.orgExportExcel}>导出</Button>
							<Button type="primary" onClick={this.orgReset}>重置</Button>
							<Button type="primary"><Link to="/org/search">返回</Link></Button>
						</span>
					</div>
		      	</Content>
		    	</Layout>
		  	</div>
	    );
	}
}

export default OrgExportCondition;