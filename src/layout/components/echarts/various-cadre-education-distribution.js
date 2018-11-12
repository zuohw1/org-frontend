import React from 'react';
import ReactEcharts from 'echarts-for-react';

class VariousCadreEducationDistribution extends React.Component {
  constructor(props) {
    super(props);
    this.timeTicket = null;
    this.count = 51;

    const labelOption = {
      normal: {
        show: false, // true
        position: 'insideBottom',
        distance: 15,
        align: 'left',
        verticalAlign: 'middle',
        rotate: 90,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {
            textBorderColor: '#fff',
          },
        },
      },
    };

    const option = {
      color: ['#FB6566', '#FCB92C', '#FFAEB9'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['研究生及以上', '本科', '专科及以下'],
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['集团高管', '高管干部', '地市高管'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '研究生及以上',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          data: [60, 50, 40],
        },
        {
          name: '本科',
          type: 'bar',
          label: labelOption,
          data: [30, 25, 40],
        },
        {
          name: '专科及以下',
          type: 'bar',
          label: labelOption,
          data: [10, 25, 20],
        },
      ],
    };

    this.state = {
      option,
    };

    this.fetchNewDate = this.fetchNewDate.bind(this);
  }

  componentDidMount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
    this.timeTicket = setInterval(this.fetchNewDate, 1000);
  }

  componentWillUnmount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
  }

  fetchNewDate() {
    const axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
    const { option } = this.state;
    const data0 = option.series[0].data;
    const data1 = option.series[1].data;
    data0.shift();
    data0.push(Math.round(Math.random() * 1000));
    data1.shift();
    data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

    option.xAxis[0].data.shift();
    option.xAxis[0].data.push(axisData);
    this.setState({ option });
  }

  render() {
    const { option } = this.state;
    return (
      <div className="education">
        <div className="parent-education">
          <ReactEcharts
            option={option}
            style={{ height: 300 }}
          />
        </div>
      </div>
    );
  }
}

export default VariousCadreEducationDistribution;
