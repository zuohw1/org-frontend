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

class OrgExportCondition extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	refUrl: `organization/list?login_name=hq-ehr&resp_id=200000515`,
	    	treeId: "",
	    	value: undefined,
	    	treeData: [],
	    	key: "1",
	    	sta: {},
	    };
	}
	async componentDidMount() {
	    const result = await request.get(this.state.refUrl);
	    console.log(result);
	    this.setState({ treeData: result.treeData });
	    this.setState({ sta: result });
	}
	orgReset = () => {
	    this.setState({ 
	    	value: undefined,
	    });
	    this.setState({ 
	    	key: "1",
	    });
	}
	changeKey = (event) => {
	    console.log(event);
	    this.setState({ 
	    	key: event
	    });
	}
	onChange = (value) => {
	    console.log(value);
	    this.setState({ value });
	}
	LoadData = (treeNode) => {
		console.log(treeNode)
	    return new Promise((resolve) => {
	      if (treeNode.props.children !== []) {
	        resolve();
	        return;
	      }
	      setTimeout(async () => {
	        const id = treeNode.props.id;
	        const result = await request.get(`organization/sub?topId=${id}&versionId=${this.state.sta.flexValue}`);
	        console.log(result)
	        treeNode.props.children = result;
	        this.setState({
	          treeData: [...this.state.treeData],
	        });
	        resolve();
	      }, 1000);
	    });
	}
	renderTreeNodes = (data) => {
    	return data.map((item) => {
		    if (item.children) {
		        return (
		          <TreeNode title={item.title} key={item.key} dataRef={item}>
		            {renderTreeNodes(item.children)}
		          </TreeNode>
		        );
		    }
		    return <TreeNode {...item} dataRef={item} />;
	    });
	};
	select = () => {}
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
						        showSearch
						        defaultExpandAll
						        value={this.state.value}
						        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
						        placeholder="请选择"
						        onSelect={this.select}
						        onChange={this.onChange}
						        treeData={this.state.treeData}
						        loadData={this.LoadData}
						    />
						</span>
						<span className="conditionContainerItem3">展示层数：</span>
						<span className="conditionContainerItem4">
							<Select value={this.state.key} onChange={this.changeKey}>{childItem4}</Select>
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