<template>
  <div class="small">
    <line-chart ></line-chart>
  </div>
</template>

<script>
  import LineChart from './BarChart'

  export default {
    components: {
      LineChart
    }
  }
</script>

<style>
  .small {
    width: 800px;
  }
</style>