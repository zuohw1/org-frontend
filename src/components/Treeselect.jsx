import React, { Component } from 'react';
import './Manpower.css';
import { TreeSelect, Tree } from 'antd';
const TreeNode = Tree.TreeNode;
class Treeselect extends Component {
	onChange = (value) => {
	    console.log(value);
	    this.setState({ value });
	}
	state = {
		value: undefined,
	    treeData: [
	      { title: 'Expand to load', key: '0', value: 'Expand to load' },
	      { title: 'Expand to load', key: '1', value: 'Expand to load' },
	      { title: 'Tree Node', key: '2', value: 'Tree Node', isLeaf: true },
	    ],
	}

	onLoadData = (treeNode) => {
	    return new Promise((resolve) => {
	      if (treeNode.props.children) {
	        resolve();
	        return;
	      }
	      setTimeout(() => {
	        treeNode.props.dataRef.children = [
	          { title: 'Child Node', value: 'Child Node', key: `${treeNode.props.eventKey}-0` },
	          { title: 'Child Node', value: 'Child Node', key: `${treeNode.props.eventKey}-1` },
	        ];
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
	          <TreeNode title={item.title} value={item.value} key={item.key} dataRef={item}>
	            {this.renderTreeNodes(item.children)}
	          </TreeNode>
	        );
	      }
	      return <TreeNode {...item} dataRef={item} />;
	    });
	}
    render() {
        return (
            <div className="Treeselect">
                <TreeSelect
			        style={{ width: 300 }}
			        value={this.state.value}
			        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
			        loadData={this.onLoadData}
			        placeholder="Please select"
			        treeDefaultExpandAll
			        onChange={this.onChange}
			    >
			    	{this.renderTreeNodes(this.state.treeData)}
			    </TreeSelect>
            </div>
        );
    }
}
export default Treeselect;