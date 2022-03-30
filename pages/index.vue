<template>
  <div class="container-fulid dasboard">
    <div class="row">
      <div class="col-md-2 pr-0">
        <MenuLeft />
      </div>
      <div class="col-md-10 pl-0">
        <div>
          <MenuHead />
        </div>
        <div class="pl-5 pr-5 pt-5 pb-0">
          <Dasboard />
          <DasboardRandomChart class="mt-5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dasboard from '../components/dasboard/Dasboard.vue'
import MenuHead from '../components/MenuHead.vue'
import MenuLeft from '../components/MenuLeft.vue'
import DasboardRandomChart from '../components/dasboard/RandomChart.vue'
export default {
  components: {MenuLeft, MenuHead, Dasboard,DasboardRandomChart},
  name: 'IndexPage',
}

</script>
<style scoped>
.dasboard {
  background-color: #f4f5f9;
}
</style>
