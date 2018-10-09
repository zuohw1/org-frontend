import React, { Component } from 'react';
import './Manpower.css';
import {
  Search, Icon, Table, Button,
} from 'antd';

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
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
class Listshade extends Component {
  	state = {
  	  userName: '',
  	  selectedRowKeys: [],
  	    loading: false,
  	}

  	showConList=() => {
  		this.refs.covList.style.display = 'block';
  		this.refs.conList.style.display = 'block';
  	}

  	closeConList=() => {
  	    this.refs.covList.style.display = 'none';
  	    this.refs.conList.style.display = 'none';
  	}

  	enterData=() => {
  	    this.refs.covList.style.display = 'none';
  	    this.refs.conList.style.display = 'none';
  	    console.log(this.state.userName);
  	}

  	start = () => {
  	    this.setState({ loading: true });
  	    setTimeout(() => {
  	      this.setState({
  	        selectedRowKeys: [],
  	        loading: false,
  	      });
  	    }, 1000);
  	}

  	onSelectChange = (selectedRowKeys) => {
  	    console.log('selectedRowKeys changed: ', selectedRowKeys);
  	    this.setState({ selectedRowKeys });
  	}

	change=(e) => {
	  console.log(e);
	}

    rowClick=(record, index) => {
    	console.log(record);
      	this.setState({
  		  userName: record.name,
  		});
      console.log(this);
    }

    emitEmpty = () => {
	    this.userNameInput.focus();
	    this.setState({ userName: '' });
    }

    render() {
      const { userName } = this.state;
      const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
      const { loading, selectedRowKeys } = this.state;
  	    /* const rowSelection = {
  	      selectedRowKeys,
  	      onChange: this.onSelectChange,
  	    };
  	    rowSelection={rowSelection}
  	    */
	       const hasSelected = selectedRowKeys.length > 0;
      return (
        <div className="Listshade">
          <div id="covList" ref="covList" />
          <div id="conList" ref="conList">
            <div className="listHeader">可搜索的列表</div>
            <div className="listContent">
              <div className="listContentT">
                <Search
                  placeholder=""
                  onSearch={value => console.log(value)}
                  enterButton
                />
              </div>
              <div className="listContentB">
                <Table
                  columns={columns}
                  dataSource={data}
                  onRowClick={this.rowClick}
                />
              </div>
            </div>
            <div className="listFooter">
              <Button type="danger" onClick={this.closeConList} className="shadeButton">关闭</Button>
              <Button type="primary" onClick={this.enterData} className="shadeButton">确定</Button>
            </div>
          </div>
          <Button type="primary" onClick={this.showConList} className="openTree">列表遮罩</Button>
          <Input
            placeholder="请输入"
            suffix={suffix}
            value={userName}
            ref={node => this.userNameInput = node}
            className="nodeInput"
            onChange={this.change}
            readOnly="readonly"
          />
        </div>
      );
    }
}
export default Listshade;
