import React, { Component } from 'react';
import {
  Layout, Breadcrumb, Card, Calendar, Col, Row,
} from 'antd';
import CadreAccount from './echarts/cadre-account';
import SeniorCadreAccount from './echarts/senior-cadre-account';
import VariousExamineAccount from './echarts/various-examine-account';
import VariousCadreEducationDistribution from './echarts/various-cadre-education-distribution';
import './assets/styles/main.css';

const { Content } = Layout;

function onPanelChange(value, mode) {
  console.log(value, mode);
}

class Manpower extends Component {
  render() {
    return (
      <div className="Manpower">
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>人员管理</Breadcrumb.Item>
              <Breadcrumb.Item>人力业务管理</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ minHeight: 360 }} className="part">
              <div className="part1">
                <div className="part1Left">
                  <div className="part1LeftTop">
                    <Card
                      title="重要事项"
                    >
                      <p>
                        <span className="important1">[培训课前准备]</span>
                        <b className="important2">集成公司技能培训&nbsp;2018-05-30</b>
                        <i className="important3red">马上到期</i>
                      </p>
                      <p>
                        <span className="important1">[公开课审批]</span>
                        <b className="important2">人力资源管理模式全员大会培训申请&nbsp;&nbsp;2018-06-03</b>
                        <i className="important3green">进行中</i>
                      </p>
                      <p>
                        <span className="important1">[考核计划执行]</span>
                        <b className="important2">管理信息产品部ERP中心考核（8月）离上报还有3天，2....</b>
                        <i className="important3red">马上到期</i>
                      </p>
                      <p>
                        <span className="important1">[考核计划执行]</span>
                        <b className="important2">管理信息产品部ERP中心考核计划手册还有5天截止有效期</b>
                        <i className="important3green">进行中</i>
                      </p>
                    </Card>
                  </div>
                  <div className="part1LeftBottom">
                    <Card
                      title="快速开始"
                      extra={<a href=" javascript:;">设置</a>}
                    >
                      <div className="part1LeftBottompart"><p>考群设置</p><p>项目考核</p></div>
                      <div className="part1LeftBottompart"><p>绩效手册设置</p><p>排版管理</p></div>
                      <div className="part1LeftBottompart"><p>考核计划设置</p><p>考勤核对</p></div>
                      <div className="part1LeftBottompart"><p>考核状态查询</p><p>休假查询</p></div>
                      <div className="part1LeftBottompart"><p>考核计划执行</p><p>干部信息管理</p></div>
                      <div className="part1LeftBottompart"><p>OKR考核</p><p>干部查询</p></div>
                    </Card>
                  </div>
                </div>
                <div className="part1Right">
                  <div className="part1RightL">
                    <div className="part1RightLTop" />
                    <div className="part1RightLBottom">
                      <Card
                        title="编辑"
                        extra={<a href=" javascript:;">更多</a>}
                      >
                        <p>09:30&nbsp;&nbsp;1058房间新人......</p>
                        <p>13:30&nbsp;&nbsp;考核计划执行</p>
                        <p>14:30&nbsp;&nbsp;1050房间视频会议</p>
                        <p>15:00&nbsp;&nbsp;1050房间视频会议</p>
                        <p>16:20&nbsp;&nbsp;1050房间视频会议</p>
                      </Card>
                    </div>
                  </div>
                  <div className="part1RightR">
                    <div className="kalendar">
                      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="part2">
                <Row gutter={16}>
                  <Col span={8}>
                    <Card title="实时培训看板" extra={<a href=" javascript:;">编辑</a>} bordered={false} className="part2SonFirst">
                      <p className="part2SonFirstP"><i>[签到率]</i><span className="part2SonFirstPSpan1">70%</span><span className="part2SonFirstPSpan2">产品经理课程</span></p>
                      <p className="part2SonFirstP"><i>[评价率]</i><span className="part2SonFirstPSpan1">20%</span><span className="part2SonFirstPSpan2">SPARK培训</span></p>
                      <p className="part2SonFirstP"><i>[报名率]</i><span className="part2SonFirstPSpan1">70%</span><span className="part2SonFirstPSpan2">OGG技术培训</span></p>
                      <p className="part2SonFirstP"><i>[报名率]</i><span className="part2SonFirstPSpan1">400%</span><span className="part2SonFirstPSpan2">OGG技术培训</span></p>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="各类干部占比" bordered={false} className="part2SonFirst">
                      <CadreAccount />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="高管干部年龄占比" bordered={false} className="part2SonFirst">
                      <SeniorCadreAccount />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="各类考核占比" bordered={false} className="part2SonFirst">
                      <VariousExamineAccount />
                    </Card>
                  </Col>
                </Row>
              </div>
              <div className="part3">
                <div className="part3son">
                  <Card title="各类干部学历分布" bordered={false} className="part2SonFirst">
                    <VariousCadreEducationDistribution />
                  </Card>
                </div>
                <div className="part3son part3son2">
                  <Card title="绩效消息中心" bordered={false} className="part2SonFirst">
                    <p className="part2SonSecondP1">当前处于员工自评的计划有&nbsp;<i>5</i>&nbsp;条</p>
                    <p className="part2SonSecondP">
                      <span className="part2SonSecondPSpan1">系统运行中心考核计划（8月）</span>
                      <span className="part2SonSecondPSpan2"><i>5</i>人未填写</span>
                      <span className="part2SonSecondPSpan3">8月25日汇总上报</span>
                    </p>
                    <p className="part2SonSecondP">
                      <span className="part2SonSecondPSpan1">管理信息产品部中心经理考核计...</span>
                      <span className="part2SonSecondPSpan2"><i>5</i>人未填写</span>
                      <span className="part2SonSecondPSpan3">8月30日汇总上报</span>
                    </p>
                    <p className="part2SonSecondP">
                      <span className="part2SonSecondPSpan1">管信-ERP-人力考核计划（8月）</span>
                      <span className="part2SonSecondPSpan2"><i>6</i>人未填写</span>
                      <span className="part2SonSecondPSpan3">8月30日汇总上报</span>
                    </p>
                    <p className="part2SonSecondP">
                      <span className="part2SonSecondPSpan1">管信-ERP-财务考核计划（8月）</span>
                      <span className="part2SonSecondPSpan2"><i>8</i>人未填写</span>
                      <span className="part2SonSecondPSpan3">8月30日汇总上报</span>
                    </p>
                    <p className="part2SonSecondP">
                      <span className="part2SonSecondPSpan1">
                      管信-ERP-物流考核计划（8月）
                      </span>
                      <span className="part2SonSecondPSpan2"><i>7</i>人未填写</span>
                      <span className="part2SonSecondPSpan3">8月30日汇总上报</span>
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default Manpower;
