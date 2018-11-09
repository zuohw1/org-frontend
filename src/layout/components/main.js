import React, { Component } from 'react';
import {
  Layout, Breadcrumb, Card, Calendar,
} from 'antd';
import cultivateImg from './assets/images/u4462.png';
import variousImg from './assets/images/u4463.png';
import seniorImg from './assets/images/u4464.png';
import checkImg from './assets/images/u4465.png';
import qualificationsImg from './assets/images/u4466.png';
import performanceImg from './assets/images/u4467.png';
import './assets/styles/Manpower.css';

const { Content } = Layout;

function onPanelChange(value, mode) {
  console.log(value, mode);
}

class Main extends Component {
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
                      extra={<a href="#">设置</a>}
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
                        extra={<a href="#">更多</a>}
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
                <div className="part2son"><img src={cultivateImg} className="autoImg" alt="" /></div>
                <div className="part2son"><img src={variousImg} className="autoImg" alt="" /></div>
                <div className="part2son"><img src={seniorImg} className="autoImg" alt="" /></div>
                <div className="part2son"><img src={checkImg} className="autoImg" alt="" /></div>
              </div>
              <div className="part3">
                <div className="part3son"><img src={qualificationsImg} className="autoImg" alt="" /></div>
                <div className="part3son"><img src={performanceImg} className="autoImg" alt="" /></div>
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default Main;
