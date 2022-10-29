<template>
  <div class="home" v-if="isLogined">
    <div class="maindiv">
      <Nav></Nav>
    </div>

    <div class="main">
      <div class="SXGraph" id="leftTop"></div>
      <div class="ZXGraph" id="rightTop"></div>
      <div class="LDGraph" id="leftBottom"></div>
      <div class="ZZGraph" id="rightBottom"></div>
    </div>

  </div>
</template>

<script>  //引入基本模块
import Nav from '@/components/nav-service'
// let echarts = require('echarts/lib/echarts')
import * as echarts from 'echarts';
// 引入饼状图组件
// require('echarts/lib/chart/pie')
// // 引入提示框和title组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
// import Nav1 from '@/components/nav-client'
export default {
  name: "home-service",
  data() {
    return {
      isLogined: false,


      opinionData1: [{name: "零食", value: "126"},
        {name: "海鲜", value: "176"},
        {name: "水果", value: "180"},
        {name: "酒水", value: "50"},
        {name: "蔬菜", value: "250"},
        {name: "日常用品", value: "100"}],
      // opinionData1:[],
      option: {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [23, 24, 18, 25, 27, 28, 25]
          }
        ]
      },

      dataMax: []
    }
  },
  components: {
    Nav
  },
  created() {
    this.isLogined = sessionStorage.getItem('isLogin');
    // this.show()

  },
  mounted() {
    // this.show();
    // this.getData();
    this.initData();

  },

  methods: {
    //初始化数据
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var leftTop = echarts.init(document.getElementById('leftTop'));
      var rightTop = echarts.init(document.getElementById('rightTop'));
      var leftBottom = echarts.init(document.getElementById('leftBottom'));
      var rightBottom = echarts.init(document.getElementById('rightBottom'));

      let data4 = [];
      this.opinionData1.forEach(item => {
        let d = {name: '', value: 100};
        d.name = item.name;
        this.dataMax.push(d);
        data4.push(item.value);
      })

      console.log(this.opinionData1)


      // 绘制图表
      leftTop.setOption({
        title: {
          text: '销售数据扇形图分析',//主标题
          subtext: '乐淘电子商务系统',//副标题
          x: 'center',//x轴方向对齐方式
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },


        series: [
          {
            name: '数据来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.opinionData1,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
      rightTop.setOption({
        title: {
          text: '销售数据柱形图分析',//主标题
          subtext: '商品类别：酒水',//副标题
          x: 'center',//x轴方向对齐方式
        },
        xAxis: {
          data: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [{
              value: 18,
              itemStyle: {
                color: '#00ff22',
                shadowColor: '#91cc75',
                borderType: 'dashed',
                opacity: 0.5
              }
            }, 34, 55, 25, 47, 28, {
              value: 19,
              itemStyle: {
                color: '#00fa57',
                shadowColor: '#91cc75',
                borderType: 'dashed',
                opacity: 0.5
              }
            },
              {
                value: 86,
                itemStyle: {
                  color: '#fd0e0e',
                  shadowColor: '#91cc75',
                  borderType: 'dashed',
                  opacity: 0.5
                }
              }, {
                value: 69,
                itemStyle: {
                  color: '#ff1616',
                  shadowColor: '#91cc75',
                  borderType: 'dashed',
                  opacity: 0.5
                }
              }, 42, 44, {
                value: 106,
                itemStyle: {
                  color: '#f60404',
                  shadowColor: '#91cc75',
                  borderType: 'dashed',
                  opacity: 0.5
                }
              }]
          }
        ]
      });
      leftBottom.setOption({
        title: {
          text: '销售数据折线图分析',//主标题
          // subtext: '商品1：苹果   商品2：香蕉',//副标题
          x: 'center',//x轴方向对齐方式
        },
        legend: {
          data: ["苹果", "香蕉"],
          top: "7%",
          textStyle: {
            color: "#1FC3CE",
            fontSize: 14
          },
          // selected: {'苹果': false} // 不需要显示的设置为false
        },
        xAxis: {
          type: 'category',
          data: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '苹果',
            data: [120, 200, 150, 71, 111, 233, 434, 283, 511, 433, 120, 232],
            type: 'line',
          }, {
            name: '香蕉',
            data: [12, 300, 286, 533, 456, 354, 148, 124, 235, 100, 186, 213],
            type: 'line',
          },
        ]
      });
      rightBottom.setOption({
        title: {
          text: '销售数据雷达图分析',//主标题
          // subtext: '乐淘电子商务系统',//副标题
          x: 'center',//x轴方向对齐方式
        },

        //配置维度的最大值
        radar: {
          name: {
            show: true,
            color: 'black',
          },
          //   雷达图的指示器，用来指定雷达图中的多个变量（维度）
          indicator: this.dataMax,
          shape: 'circle', //对雷达图形设置成一个圆形,可选 circle:圆形,polygon:多角形(默认)
        },
        series: [
          {
            type: 'radar',
            label: {
              show: true, //显示数值
            },
            areaStyle: {}, //每个雷达图形成一个阴影的面积
            data: [
              {
                name: '销售数据',
                value: data4,
                itemStyle: {
                  color: '#3ab2fd',
                  shadowColor: '#91cc75',
                  borderType: 'dashed',
                  opacity: 0.8
                }
              },

            ],
          },
        ],

      });

    },
    getData() {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/product/Data',
        headers: {"Content-Type": "application/json"},
        data: {}

      })
        .then(res => {
          // console.log(res.data);
          this.opinionData1 = [];
          res.data.forEach(item => {
            let a = {name: '', value: 0};
            a.name = item.class_name;

            a.value = item.sale;

            this.opinionData1.push(a);


          });
          // console.log(this.opinionData1)
        })
        .catch(err => {
          console.log(err);
        })

    },

  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.maindiv {
  height: 63px;
}

.home {
  width: 100vw;
  height: calc(100vh - 63px);
}

.home .title {
  width: 700px;
  height: 50px;
  padding: 50px;
  margin: auto;
  font-size: 30px;
}

el-row {
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
}

el-col {
  border-radius: 4px;
  align-items: center;
  justify-content: center;
}


.main {

  width: 100vw;
  height: 100vh;
  border: 1px solid red;

  display: grid; /*grid布局*/
  grid-template-columns:50% auto; /*设置列*/
  grid-template-rows:50% auto; /*设置行*/

  grid-template-areas:
    "SXGraph SXGraph"
    "LDGraph ZZGraph" /*点号表示该单个元为空*/
}

</style>
