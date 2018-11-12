import React from 'react';
import ReactEcharts from 'echarts-for-react';

const CadreAccount = () => {
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
        data: ['省管干部正式', '省管干部后备', '集团高管正式', '集团高管后备'],
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
            { value: 25, name: '省管干部后备', itemStyle: { color: '#FCB92C' } },
            { value: 20, name: '集团高管正式', itemStyle: { color: '#FC922B' } },
            { value: 30, name: '集团高管后备', itemStyle: { color: '#46A4B3' } },
            { value: 25, name: '省管干部正式', itemStyle: { color: '#FB6566' } },
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
    <div className="cadre">
      <div className="parent-cadre">
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

export default CadreAccount;
