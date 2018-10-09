import React, { Component } from 'react';
import './Manpower.css';
import { Tree, Table, Button } from 'antd';
const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;
const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];
class Treelist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            selectedRowKeys: [], 
            data:[],
            arr:[],
            res:[],
        }
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
  	showConTrli=() => {
  		this.refs.covTrli.style.display = "block";
  		this.refs.conTrli.style.display = "block";
  	}
  	closeConTrli=() => {
  	    this.refs.covTrli.style.display = "none";
  	    this.refs.conTrli.style.display = "none";
  	}
    onSelect = (selectedKeys,selectedNodes) => {
        if(selectedKeys == "0-0"){
            this.setState({
              data: this.state.arr.slice(0,9)
            });
        }else if(selectedKeys == "0-0-0"){
            this.setState({
              data: this.state.arr.slice(9,18)
            });
        }else if(selectedKeys == "0-0-1"){
            this.setState({
              data: this.state.arr.slice(18,27)
            });
        }else if(selectedKeys == "0-1"){
            this.setState({
              data: this.state.arr.slice(27,36)
            });
        }else if(selectedKeys == "0-1-0"){
            this.setState({
              data: this.state.arr.slice(36,45)
            });
        }else if(selectedKeys == "0-1-1"){
            this.setState({
              data: this.state.arr.slice(45,54)
            });
        }
    }
    onExpand = () => {
        console.log('Trigger Expand');
    }
    componentDidMount(){
        for (let i = 0; i < 54; i++) {
          this.state.arr.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
          });
        }
        this.setState({
          data: this.state.arr.slice(0,9)
        })
    } 
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
          hideDefaultSelections: true,
          onSelection: this.onSelection,
        }
        return (
            <div className="Treelist">
                <div id="covTrli"  ref="covTrli"></div>
			    <div id = "conTrli" ref="conTrli">
		            <div className="trliHeader">左树右表</div>
                    <div className="trliContent">
                        <div className="trliContentLeft">
                            <DirectoryTree
                                multiple
                                defaultExpandAll
                                onSelect={this.onSelect}
                                onExpand={this.onExpand}
                            >
                                <TreeNode title="parent 0" key="0-0">
                                  <TreeNode title="leaf 0-0" key="0-0-0" isLeaf />
                                  <TreeNode title="leaf 0-1" key="0-0-1" isLeaf />
                                </TreeNode>
                                <TreeNode title="parent 1" key="0-1">
                                  <TreeNode title="leaf 1-0" key="0-1-0" isLeaf />
                                  <TreeNode title="leaf 1-1" key="0-1-1" isLeaf />
                                </TreeNode>
                            </DirectoryTree>
                        </div>
                        <div className="trliContentRight">
                            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
                        </div>
                    </div>
                    <div className="trliFooter">
                      <Button type="danger" onClick = {this.closeConTrli}  className="shadeButton">关闭</Button>
                    </div>
        			    </div>
                  <Button type="primary" onClick = {this.showConTrli}  className="openTree">左树右表</Button>
            </div>
        );
    }
}
export default Treelist;