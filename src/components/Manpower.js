import React, { Component } from 'react';
import './Manpower.css';
import { Layout, Breadcrumb } from 'antd';
import importantthingImg from '../images/u4459.png';
import quickstartImg from '../images/u4461.png';
import kalendarImg from '../images/u4460.png';
import cultivateImg from '../images/u4462.png';
import variousImg from '../images/u4463.png';
import seniorImg from '../images/u4464.png';
import checkImg from '../images/u4465.png';
import qualificationsImg from '../images/u4466.png';
import performanceImg from '../images/u4467.png';

const { Content } = Layout;

class Manpower extends Component {
  render() {
    return (
      <div className="Manpower">
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ minHeight: 360 }} className="part">
              <div className="part1">
                <div className="part1Left">
                  <div className="part1LeftTop">
                    <img src={importantthingImg} className="autoImg" alt="" />
                  </div>
                  <div className="part1LeftBottom"><img src={quickstartImg} className="autoImg" alt="" /></div>
                </div>
                <div className="part1Right"><img src={kalendarImg} className="autoImg" alt="" /></div>
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

export default Manpower;
