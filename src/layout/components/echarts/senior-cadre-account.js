import React from 'react';
import ReactEcharts from 'echarts-for-react';

const SeniorCadreAccount = () => {
  const onChartReady = (echart) => {
    console.log('echart is ready', echart);
  };
  const onChartLegendselectchanged = (param, echart) => {
    console.log(param, echart);
  };
  const onChartClick = (param, echart) => {
    console.log(param, echart);
  };
  const getOtion = () => {
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      grid: {
        left: '8%',
        top: '8%',
        containLabel: true,
      },
      legend: {
        x: 'right',
        y: '10%',
        orient: 'vertical',
        data: ['40岁以下', '40岁-50岁', '50岁以上'],
      },
      series: [
        {
          type: 'pie',
          center: ['30%', '36%'],
          radius: '55%',
          avoidLabelOverlap: false,
          labelLine: {
            normal: {
              show: false,
            },
          },
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: '{d}%',
              textStyle: {
                align: 'center',
                baseline: 'middle',
                fontFamily: '微软雅黑',
                fontSize: 15,
                fontWeight: 'bolder',
              },
            },
          },
          data: [
            { value: 35, name: '40岁-50岁', itemStyle: { color: '#46A4B3' } },
            { value: 40, name: '50岁以上', itemStyle: { color: '#FB6566' } },
            { value: 25, name: '40岁以下', itemStyle: { color: '#FCB92C' } },
          ],
        },
      ],
    };
    return option;
  };

  const onEvents = {
    click: onChartClick,
    legendselectchanged: onChartLegendselectchanged,
  };

  return (
    <div className="senior">
      <div className="parent-senior">
        <ReactEcharts
          option={getOtion()}
          style={{ height: 200 }}
          onChartReady={onChartReady}
          onEvents={onEvents}
        />
      </div>
    </div>
  );
};

export default SeniorCadreAccount;
