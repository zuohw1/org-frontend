import React, { Component } from 'react';
import './Manpower.css';
import axios from 'axios';
import { TreeSelect, Tree } from 'antd';
const TreeNode = Tree.TreeNode;
class Treeselect extends Component {
    onChange = (value) => {
          console.log(value);
          this.setState({ value });
    }
    state = {
        value: undefined,
        treeData: [],
        res:[],
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
    componentDidMount() {
        axios.get('https://www.easy-mock.com/mock/5b9f51bc8b5cc40f1f28a324/example/treefirst')
        .then( (response)=> this.setState({ treeData : response.data }))
        .catch(function (error) {
            console.log(error);
        })
    }
    render() {
        console.log(this.state.treeData)
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