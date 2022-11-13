// 时间：2022-08-25
// 文章：2022-89



// 文章统计图
function chart1() {
  // 基于准备好的Dom，初始化Echarts实例
  var myChart1 = echarts.init(document.getElementById('main1'));
  // 响应容器大小的变化
  window.addEventListener('resize',() => myChart1.resize(), false);
  // 准备数据和配置项
  var option1 = {
    // backgroundColor: '#eee',
    title: {
      text: '小世界周年文章统计',
      subtext: '2021-08-25 至 2022-08-25',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '5%',
      left: 'center'
    },
    series: [
      {
        name: '数量',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 1
        },
        // label: {
        //   show: false,
        //   position: 'center'
        // },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 142, name: '文章(篇)' },
          { value: 71, name: '分类(个)' },
          { value: 11, name: '标签(条)' }
        ]
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表
  myChart1.setOption(option1);
}



// 访问统计图
function chart2() {
  // 基于准备好的Dom，初始化Echarts实例
  var myChart2 = echarts.init(document.getElementById('main2'));
  // 响应容器大小的变化
  window.addEventListener('resize',() => myChart2.resize(), false);
  // 准备数据和配置项
  var option2 = {
    title: {
      text: '小世界周年访问统计',
      subtext: '2021-08-25 至 2022-08-25',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      // axisPointer: {
      //   type: 'shadow'
      // }
    },
    legend: {
        bottom: '5%',
        left: 'center'
    },
    // grid: {
    //   left: '3%',
    //   right: '4%',
    //   bottom: '15%',
    //   containLabel: true
    // },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['1周年']
    },
    series: [
      {
        name: '总访客数(人)',
        type: 'bar',
        data: [3606]
      },
      {
        name: '总访问量(次)',
        type: 'bar',
        data: [14289]
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表
  myChart2.setOption(option2);
}



// 字数统计图
function chart3() {
  // 基于准备好的Dom，初始化Echarts实例
  var myChart3 = echarts.init(document.getElementById('main3'));
  // 响应容器大小的变化
  window.addEventListener('resize',() => myChart3.resize(), false);
  // 准备数据和配置项
  var option3 = {
    title: {
      text: '小世界周年字数统计(单位:K)',
      subtext: '2021-08-25 至 2022-08-25',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: ['刘慈欣《三体》', '《新华字典》', '博客总字数', '余华《活着》', '《乌合之众》']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [
          900,
          660,
          {
            value: 338.9,
            itemStyle: {
              color: '#a90000'
            }
          },
          132,
          102
        ],
        type: 'bar',
        label: {
          show: true,
          position: 'inside'
        },
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表
  myChart3.setOption(option3);
}



// 页面加载完后执行
window.onload = function() {
  chart1();
  chart2();
  chart3();
}