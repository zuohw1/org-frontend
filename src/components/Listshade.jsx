import React, { Component } from 'react';
import './Manpower.css';
import { Input, Icon, Table, Button } from 'antd';
import axios from 'axios';
const Search = Input.Search;
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
class Listshade extends Component {
  	state = {
        userName: '',
        selectedRowKeys: [],
  	    loading: false,
        key: 0,
        data: [],
      }
  	showConList=() => {
  		this.refs.covList.style.display = "block";
  		this.refs.conList.style.display = "block";
  	}
  	closeConList=() => {
  	    this.refs.covList.style.display = "none";
  	    this.refs.conList.style.display = "none";
  	}
  	enterData=() => {
  	    this.refs.covList.style.display = "none";
  	    this.refs.conList.style.display = "none";
  	    console.log(this.state.userName)
        console.log(this.state.data)
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
	  change=(e) =>{
      console.log(e)
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
    emitEmpty = () => {
	    this.userNameInput.focus();
	    this.setState({ userName: '' });
        console.log(this.state.data)
	}
    componentDidMount() {
        axios.get('https://www.easy-mock.com/mock/5b9f51bc8b5cc40f1f28a324/example/demolist')
        .then( (response)=> this.setState({ data : response.data }))
        .catch(function (error) {
            console.log(error);
        })
    }
    render() {
        const { userName } = this.state;
        const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        //const { selectedRowKeys } = this.state;
  	    /*const rowSelection = {
  	      selectedRowKeys,
  	      onChange: this.onSelectChange,
  	    };
  	    rowSelection={rowSelection}
  	    */
	      //const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="Listshade">
              <div id="covList"  ref="covList"></div>
			        <div id = "conList" ref="conList">
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
                        		dataSource={ this.state.data }
                        		onRowClick={this.rowClick}
                        	/>
                        </div>
                    </div>
                    <div className="listFooter">
                      <Button type="danger" onClick = {this.closeConList} className="shadeButton">关闭</Button>
                      <Button type="primary" onClick = {this.enterData} className="shadeButton">确定</Button>
                    </div>
			        </div>
              <Button type="primary" onClick = {this.showConList}  className="openTree">列表遮罩</Button>
      				<Input
                placeholder="请输入"
                suffix={suffix}
                value={userName}
                ref={node => this.userNameInput = node}
                className="nodeInput"
                onChange = {this.change}
                readOnly="readonly"
              />
            </div>
        );
    }
}
export default Listshade;