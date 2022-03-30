<template>
  <div class="small">
    <line-chart :data="data" :listDay="listDay"></line-chart>
  </div>
</template>

<script>
  import LineChart from './BarChart'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        data: [],
        listDay:[]
      }
    },
    async fetch() {
        this.data = await fetch(
        'http://127.0.0.1:8000/api/statistical'
      ).then(res => res.json())

      this.listDay = await fetch(
        'http://127.0.0.1:8000/api/dayList'
      ).then(res => res.json())
    },
  }
</script>

<style>
  .small {
    width: 100%;
  }
</style>