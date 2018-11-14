import React, { Component } from 'react';
import '../layout/components/assets/styles/main.less';
import axios from 'axios';
import { Tree, Table, Button } from 'antd';
const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;
const columns = [{
  title: 'Code',
  dataIndex: 'code',
}, {
  title: 'Number',
  dataIndex: 'number',
}, {
  title: 'Name',
  dataIndex: 'name',
}];
class TreeList extends Component {
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
        this.setState({
            data: this.state.arr.slice(0,18)
        });
  	}
  	closeConTrli=() => {
  	    this.refs.covTrli.style.display = "none";
  	    this.refs.conTrli.style.display = "none";
  	}
    onSelect = (selectedKeys,selectedNodes) => {
        if(selectedKeys === "0-0"){
            this.setState({
              data: this.state.arr.slice(0,18)
            });
        }else if(selectedKeys === "0-0-0"){
            this.setState({
              data: this.state.arr.slice(18,36)
            });
        }else if(selectedKeys === "0-0-1"){
            this.setState({
              data: this.state.arr.slice(36,47)
            });
        }else if(selectedKeys === "0-1"){
            this.setState({
              data: this.state.arr.slice(47,74)
            });
        }else if(selectedKeys === "0-1-0"){
            this.setState({
              data: this.state.arr.slice(74,96)
            });
        }else if(selectedKeys === "0-1-1"){
            this.setState({
              data: this.state.arr.slice(96,110)
            });
        }
    }
    onExpand = () => {
        console.log('Trigger Expand');
    }
    rowClick=(record, index) =>{
        this.setState({
              userName: record.name
            })
        this.setState({
          key: record.key
        })
        var aLi = document.getElementsByClassName("ant-table-row-level-0");
        for(var i = 0; i < aLi.length; i ++){
          aLi[i].classList.remove("row-selected");
          if(i === index){
            aLi[i].className += ' row-selected';
          }
        }
    }
    enterData=() => {
        this.refs.covList.style.display = "none";
        this.refs.conList.style.display = "none";
        console.log(this.state.userName)
      console.log(this.state.data)
    }
    componentDidMount() {
        axios.get('https://www.easy-mock.com/mock/5b9f51bc8b5cc40f1f28a324/example/demolist')
        .then( (response)=> this.setState({ arr : response.data }) )
        .catch(function (error) {
            console.log(error);
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
                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={this.state.data}
                                onRowClick={this.rowClick}
                            />
                        </div>
                    </div>
                    <div className="trliFooter">
                      <Button type="danger" onClick = {this.closeConTrli}  className="shadeButton">关闭</Button>
                      <Button type="primary" onClick = {this.enterData} className="shadeButton">确定</Button>
                    </div>
        			    </div>
                  <Button type="primary" onClick = {this.showConTrli}  className="openTree">左树右表</Button>
            </div>
        );
    }
}
export default TreeList;
