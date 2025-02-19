<template>
  <div>
    <h1>首页</h1>
    <h1 class="home_title" style="text-align: center">
      <el-button icon="ArrowLeft" @click="getPreYearData">上一年</el-button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>{{ year }}</span>
      <span>年学员数量</span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button @click="getNextYearData">
        下一年
        <el-icon><ArrowRight /></el-icon>
      </el-button>
    </h1>
    <div id="myChart" style="height: 500px"></div>
  </div>
</template>
<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { reqStudentsForYear } from '@/api/student'

let year = ref(new Date().getFullYear())
const getPreYearData = () => {
  year.value--
  diawChart()
}
const getNextYearData = () => {
  year.value++
  diawChart()
}
const diawChart = () => {
  reqStudentsForYear(year.value).then((response: any) => {
    const res = response
    if (res.status == '0') {
      let chartDom = document.getElementById('myChart')
      let myChart = echarts.init(chartDom)
      let option
      let dataArr = [0]
      if (res.data && res.data.length) {
        res.data.forEach((item: any) => {
          dataArr[parseInt(item._id) - 1] = item.count
        })
      }

      option = {
        xAxis: {
          data: [
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12',
          ],
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: dataArr,
          },
        ],
      }
      option && myChart.setOption(option)
    }
  })
}
onMounted(() => {
  diawChart()
})
</script>
<style scoped></style>
