import React, { Component } from 'react';
import '../layout/components/assets/styles/main.less';
import { Tree, Input, Icon, Button } from 'antd';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const x = 3;
const y = 2;
const z = 1;
const gData = [];
const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;
  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    //console.log(dataList)
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
generateList(gData);
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
class TreeShade extends Component {
        state = {
          expandedKeys: [],
          searchValue: '',
          autoExpandParent: true,
          userName: '',
        }
        emitEmpty = () => {
          this.userNameInput.focus();
          this.setState({ userName: '' });
        }
        onExpand = (expandedKeys) => {
          this.setState({
            expandedKeys,
            autoExpandParent: false,
          });
        }
        onChange = (e) => {
          const value = e.target.value;
          const expandedKeys = dataList.map((item) => {
            if (item.title.indexOf(value) > -1) {
              return getParentKey(item.key, gData);
            }
            return null;
          }).filter((item, i, self) => item && self.indexOf(item) === i);
          this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
          });
        }
        showConTree=() => {
            this.refs.covTree.style.display = "block";
            this.refs.conTree.style.display = "block";
        }
      	closeConTree=() => {
            this.refs.covTree.style.display = "none";
      	    this.refs.conTree.style.display = "none";
      	}
        enterTreeData=() => {
            this.refs.covTree.style.display = "none";
            this.refs.conTree.style.display = "none";
            console.log(this.state.userName)
        }
        selectNode=(selectedKeys, e) => {
          console.log(selectedKeys);
          console.log(e)
        }
        change=(e) =>{
          console.log(e)
        }
        selectTreeNode=(selectedKeys, e)=>{
            console.log(selectedKeys, e)
            this.setState({
                userName: selectedKeys[0]
            })
        }
        render() {
        	const { searchValue, expandedKeys, autoExpandParent } = this.state;
    	    const loop = data => data.map((item) => {
    		    const index = item.title.indexOf(searchValue);
    		    const beforeStr = item.title.substr(0, index);
    		    const afterStr = item.title.substr(index + searchValue.length);
    		    const title = index > -1 ? (
    		        <span>
    		          {beforeStr}
    		          <span style={{ color: '#f50' }}>{searchValue}</span>
    		          {afterStr}
    		        </span>
    		    ) : <span>{item.title}</span>;
    		    if (item.children) {
    		        return (
    		          <TreeNode key={item.key} title={title} onSelect = {this.selectNode}>
    		            {loop(item.children)}
    		          </TreeNode>
    		        );
    		    }
    		    return <TreeNode key={item.key} title={title} />;
    	    })
            const { userName } = this.state;
            const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
            return (
                <div className="Treeshade">
                    <div id="covTree" ref="covTree"></div>
        				    <div id="conTree" ref="conTree">
                        <div className="treeHeader">可搜索的树</div>
                        <div className="treeContent">
                            <div className="treeContentT">
                              <Search placeholder="Search" onChange={this.onChange} />
                            </div>
                            <div className="treeContentB">
                                <Tree
                                  onExpand={this.onExpand}
                                  expandedKeys={expandedKeys}
                                  autoExpandParent={autoExpandParent}
                                  onSelect={this.selectTreeNode}
                                >
                                  {loop(gData)}
                                </Tree>
                            </div>
                        </div>
                        <div className="treeFooter">
                          <Button type="danger" onClick = {this.closeConTree} className="shadeButton">关闭</Button>
                          <Button type="primary" onClick = {this.enterTreeData} className="shadeButton">确定</Button>
                        </div>
        				    </div>
                    <Button type="primary" onClick = {this.showConTree} className="openTree">树之遮罩</Button>
                    <Input
                      placeholder="请选择树节点"
                      suffix={suffix}
                      value={userName}
                      ref={node => this.userNameInput = node}
                      className="nodeInput"
                      onChange = {this.change}
                    />
                </div>
            );
    }
}
export default TreeShade;
