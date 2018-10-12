import React, { Component } from 'react';
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
import manpower from './Manpower.css';

const { Content } = Layout;

class Manpower extends Component {
  render() {
    return (
      <div className={manpower.Manpower}>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ minHeight: 360 }} className={manpower.part}>
              <div className={manpower.part1}>
                <div className={manpower.part1Left}>
                  <div className={manpower.part1LeftTop}>
                    <img src={importantthingImg} className={manpower.autoImg} alt="" />
                  </div>
                  <div className={manpower.part1LeftBottom}><img src={quickstartImg} className={manpower.autoImg} alt="" /></div>
                </div>
                <div className={manpower.part1Right}><img src={kalendarImg} className={manpower.autoImg} alt="" /></div>
              </div>
              <div className={manpower.part2}>
                <div className={manpower.part2son}><img src={cultivateImg} className={manpower.autoImg} alt="" /></div>
                <div className={manpower.part2son}><img src={variousImg} className={manpower.autoImg} alt="" /></div>
                <div className={manpower.part2son}><img src={seniorImg} className={manpower.autoImg} alt="" /></div>
                <div className={manpower.part2son}><img src={checkImg} className={manpower.autoImg} alt="" /></div>
              </div>
              <div className={manpower.part3}>
                <div className={manpower.part3son}><img src={qualificationsImg} className={manpower.autoImg} alt="" /></div>
                <div className={manpower.part3son}><img src={performanceImg} className={manpower.autoImg} alt="" /></div>
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default Manpower;
