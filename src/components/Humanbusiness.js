import React, { Component } from 'react';
import { Tree, Card } from 'antd';
import './Humanbusiness.css';

const { TreeNode } = Tree;
const gridStyle = {
  width: '25%',
  height: '30px',
  textIndent: '15px',
  padding: 0,
  lineHeight: '30px',
};
const gridStyle2 = {
  width: '75%',
  height: '30px',
  padding: 0,
  lineHeight: '30px',
  textIndent: '15px',
};

class Humanbusiness extends Component {
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  render() {
    return (
      <div className="Humanbusiness">
        <div className="tableMainTitle1">组织结构查询</div>
        <div className="humanlaout">
          <div className="sider">
            <div className="siderTop">
              <b className="siderTopL">结构版本</b>
              <span className="siderTopR">四川省分公司组织结构</span>
            </div>
            <div className="siderTopC1">组织结构</div>
            <div className="siderTopC2">
              <span className="siderTopC2span1">组织名</span>
              <input className="siderTopC2input1" type="text" />
              <span className="siderTopC2span2">查找</span>
              <span className="siderTopC2span3">刷新</span>
              <span className="siderTopC2span4">组织结构图</span>
            </div>
            <div className="siderTree">
              <Tree
                defaultExpandedKeys={['0-0-0']}
                onSelect={this.onSelect}
              >
                <TreeNode title="四川省分公司" key="0-0">
                  <TreeNode title="四川省分公司总部" key="0-0-0">
                    <TreeNode title="四川省公司计划建设部" key="0-0-0-0" />
                    <TreeNode title="四川省公司战略客户部" key="0-0-0-1" />
                    <TreeNode title="四川省公司信息安全部" key="0-0-0-2" />
                  </TreeNode>
                  <TreeNode title="四川省地市分公司" key="0-0-1">
                    <TreeNode title="乐川市分公司" key="0-0-1-0" />
                    <TreeNode title="绵阳市分公司" key="0-0-1-1" />
                  </TreeNode>
                </TreeNode>
              </Tree>
            </div>
          </div>
          <div className="content">
            <div>
              <table className="Title_bk" width="100%" cellPadding="0" cellSpacing="0">
                <tr>
                  <td width="6%" className="tableTdWithColor_12345">版本号:</td>
                  <td width="6%" className="tableTdWithColor_r_12345">
                    <select name="flexVersion" className="contentselect">
                      <option value="2167">48</option>
                    </select>
                  </td>
                  <td width="7%" className="tableTdWithColor_12345">开始日期:</td>
                  <td width="9%" className="tableTdWithColor_r_12345">
                    <input
                      id="dateFrom"
                      name="dateFrom"
                      readOnly="readonly"
                      value="2018-05-10"
                      className="contentselect"
                    />
                  </td>
                  <td width="7%" className="tableTdWithColor_12345">结束日期:</td>
                  <td width="9%" className="tableTdWithColor_r_12345">
                    <input
                      name="dateTo"
                      readOnly="readonly"
                      value=""
                      onFocus="setday(this)"
                      className="contentselect"
                    />
                  </td>
                  <td width="15%">
                    <ul className="contentul">
                      <li className="contentli">查询</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </div>
            <div id="meddleDiv">
              <Card title="组织信息" />
            </div>
            <div id="thistableas">
              <Card title="基本信息">
                <Card.Grid style={gridStyle} className="tableTdWithColor">组织名称:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">组织类型:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">日期 自:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">至:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">组织分类</Card.Grid>
                <Card.Grid style={gridStyle2}>
                  <input type="checkbox" name="orgType" id="orgType1" value="1" disabled />HR组织
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="checkbox" name="orgType" id="orgType2" value="2" disabled />GRE、法律实体
                </Card.Grid>
              </Card>
              <Card title="地点信息">
                <Card.Grid style={gridStyle} className="tableTdWithColor">地点:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">内部/外部:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">国家(地区):</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">省市</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">地点地址:</Card.Grid>
                <Card.Grid style={gridStyle2}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">邮编:</Card.Grid>
                <Card.Grid style={gridStyle2}></Card.Grid>
              </Card>
              <Card title="附加信息">
                <Card.Grid style={gridStyle} className="tableTdWithColor">续存实业对应省公司名:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">组织排序号:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">组织层级:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">南方、北方、子公司</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">虚拟组织:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">所属省份:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">组织属性:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">组织撤销发文时间:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">组织更名-原组织:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">组织更名-新组织:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">划小单元:</Card.Grid>
                <Card.Grid style={gridStyle2}></Card.Grid>
              </Card>
              <Card title="GRE法律实体信息">
                <Card.Grid style={gridStyle} className="tableTdWithColor">公司名称:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">企业组织代码:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
              </Card>
              <Card title="成本信息">
                <Card.Grid style={gridStyle} className="tableTdWithColor">公司段编码:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">公司段说明:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">成本中心编码:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">成本中心说明:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">专业段编码:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
                <Card.Grid style={gridStyle} className="tableTdWithColor">专业段说明:</Card.Grid>
                <Card.Grid style={gridStyle}></Card.Grid>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Humanbusiness;
