import React, { Component } from 'react';
import { Tree } from 'antd';
import humanbusiness from './Humanbusiness.css';

const { TreeNode } = Tree;

class Humanbusiness extends Component {
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  render() {
    return (
      <div className={humanbusiness.Humanbusiness}>
        <div className={humanbusiness.tableMainTitle}>组织结构查询</div>
        <div className={humanbusiness.humanlaout}>
          <div className={humanbusiness.sider}>
            <div className={humanbusiness.siderTop}>
              <b className={humanbusiness.siderTopL}>结构版本</b>
              <span className={humanbusiness.siderTopR}>四川省分公司组织结构</span>
            </div>
            <div className={humanbusiness.siderTopC1}>组织结构</div>
            <div className={humanbusiness.siderTopC2}>
              <span className={humanbusiness.siderTopC2span1}>组织名</span>
              <input className={humanbusiness.siderTopC2input1} type="text" />
              <span className={humanbusiness.siderTopC2span2}>查找</span>
              <span className={humanbusiness.siderTopC2span3}>刷新</span>
              <span className={humanbusiness.siderTopC2span4}>组织结构图</span>
            </div>
            <div className={humanbusiness.siderTree}>
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
          <div className={humanbusiness.content}>
            <div>
              <table className={humanbusiness.Title_bk} width="100%" cellPadding="0" cellSpacing="0">
                <tr>
                  <td width="6%" className={humanbusiness.tableTdWithColor_12345}>版本号:</td>
                  <td width="6%" className={humanbusiness.tableTdWithColor_r_12345}>
                    <select name="flexVersion" className={humanbusiness.contentselect}>
                      <option value="2167">48</option>
                    </select>
                  </td>
                  <td width="7%" className={humanbusiness.tableTdWithColor_12345}>开始日期:</td>
                  <td width="9%" className={humanbusiness.tableTdWithColor_r_12345}>
                    <input
                      id="dateFrom"
                      className={humanbusiness.contentselect}
                      name="dateFrom"
                      readOnly="readonly"
                      value="2018-05-10"
                    />
                  </td>
                  <td width="7%" className={humanbusiness.tableTdWithColor_12345}>结束日期:</td>
                  <td width="9%" className={humanbusiness.tableTdWithColor_r_12345}>
                    <input
                      name="dateTo"
                      className={humanbusiness.contentselect}
                      readOnly="readonly"
                      value=""
                      onFocus="setday(this)"
                    />
                  </td>
                  <td width="15%" className={humanbusiness.inputSubmit_123}>
                    <ul className={humanbusiness.contentul}>
                      <li className={humanbusiness.contentli}>查询</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </div>
            <div id="meddleDiv">
              <table id="" className={humanbusiness.Title_bk} width="100%" cellPadding="0" cellSpacing="0">
                <tr>
                  <td colSpan="9" className={humanbusiness.tableMainTitle}>组织信息</td>
                </tr>
              </table>
            </div>
            <div id="thistableas">
              <table width="100%" cellPadding="0" cellSpacing="0" className={humanbusiness.Title_bk} border="0" id="mainTable">
                <tr>
                  <td colSpan="9" className={humanbusiness.tableMainTitle}>基本信息</td>
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>组织名称:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                  <td width="20%" className={humanbusiness.tableTdWithColor}>组织类型:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>日期 自:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                  <td width="20%" className={humanbusiness.tableTdWithColor}>至:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>组织分类:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} colSpan="3">
                    <input type="checkbox" name="orgType" id="orgType1" value="1" disabled />HR组织
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="checkbox" name="orgType" id="orgType2" value="2" disabled />GRE、法律实体
                  </td>
                </tr>
              </table>
              <table id="" className={humanbusiness.Title_bk} width="100%" cellPadding="0" cellSpacing="0">
                <tr>
                  <td colSpan="9" className={humanbusiness.tableMainTitle}>地点信息</td>
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>地点:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                  <td width="20%" className={humanbusiness.tableTdWithColor}>内部、外部:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>国家(地区):</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                  <td width="20%" className={humanbusiness.tableTdWithColor}>省市</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>地点地址:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} colSpan="3" />
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>邮编:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} colSpan="3" />
                </tr>
              </table>
              <table id="" className={humanbusiness.Title_bk} width="100%" cellPadding="0" cellSpacing="0">
                <tr>
                  <td colSpan="9" className={humanbusiness.tableMainTitle}>附加信息</td>
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>续存实业对应省公司名:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                  <td width="20%" className={humanbusiness.tableTdWithColor}>组织排序号:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>组织层级:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                  <td width="20%" className={humanbusiness.tableTdWithColor}>南方、北方、子公司</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>虚拟组织:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                  <td width="20%" className={humanbusiness.tableTdWithColor}>所属省份:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>组织属性:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                  <td width="20%" className={humanbusiness.tableTdWithColor}>组织撤销发文时间:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>组织更名-原组织:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r}>
                    <input type="hidden" name="cucOriOrgId" value="" />
                  </td>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>组织更名-新组织:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r}>
                    <input type="hidden" name="cucNewOrgId" value="" />
                  </td>
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>划小单元:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} colSpan="3" />
                </tr>
              </table>
              <table id="" className={humanbusiness.Title_bk} width="100%" cellPadding="0" cellSpacing="0">
                <tr>
                  <td colSpan="9" className={humanbusiness.tableMainTitle}>GRE法律实体信息</td>
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>公司名称:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                  <td width="20%" className={humanbusiness.tableTdWithColor}>企业组织代码:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                </tr>
              </table>
              <table id="" className={humanbusiness.Title_bk} width="100%" cellPadding="0" cellSpacing="0">
                <tr>
                  <td colSpan="9" className={humanbusiness.tableMainTitle}>成本信息</td>
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>公司段编码:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                  <td width="20%" className={humanbusiness.tableTdWithColor}>公司段说明:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>成本中心编码:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                  <td width="20%" className={humanbusiness.tableTdWithColor}>成本中心说明:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                </tr>
                <tr>
                  <td width="20%" className={humanbusiness.tableTdWithColor}>专业段编码:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                  <td width="20%" className={humanbusiness.tableTdWithColor}>专业段说明:</td>
                  <td width="30%" className={humanbusiness.tableTdWithColor_r} />
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Humanbusiness;
