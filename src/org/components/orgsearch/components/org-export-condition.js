/* eslint-disable */
import React, { Component } from 'react';
import {
  Button, Layout, Select, TreeSelect,
} from 'antd';
import request from '../../../../utils/request';
import { Link } from 'dva/router';
import '../../assets/styles/org-export-condition.less';

const { Header, Content } = Layout;
const Option = Select.Option;
const childItem4 = [];
for (let i = 1; i < 11; i += 1) {
    childItem4.push(<Option key={i.toString()}>{i}</Option>);
}

class OrgExportCondition extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	refUrl: `organization/list?login_name=hq-ehr&resp_id=200000515`,
	    	treeId: "",
	    	value: undefined,
	    	treeData: [],
	    };
	}
	async componentDidMount() {
	    const result = await request.get(this.state.refUrl);
	    console.log(result);
	    this.setState({ treeData: result.treeData });
	}
	orgReset = () => {
	    this.setState({ 
	    	value: undefined,
	    });
	}
	onChange = (value) => {
	    console.log(value);
	    this.setState({ value });
	}
	onLoadData = (treeNode) => {
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
	render() {
	  	console.log(this.props)
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
						        showSearch
						        value={this.state.value}
						        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
						        placeholder="请选择"
						        onChange={this.onChange}
						        treeData={this.state.treeData}
						        loadData={this.onLoadData}
						    />
						</span>
						<span className="conditionContainerItem3">展示层数：</span>
						<span className="conditionContainerItem4">
							<Select defaultValue="1">{childItem4}</Select>
						</span>
						<span className="conditionContainerItem5">
							<Button type="primary">导出</Button>
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