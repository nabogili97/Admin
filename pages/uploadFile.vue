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
          <FileUploadComponent />
        </div>
        <div class="pl-5 mt-5">
          <random-chart />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileUploadComponent from '../components/FileUploadComponent.vue'
import MenuHead from '../components/MenuHead.vue'
import MenuLeft from '../components/MenuLeft.vue'
export default {
  components: {MenuLeft, MenuHead, FileUploadComponent},
  name: 'IndexPage'

    
}
</script>
<style scoped>
.dasboard {
  background-color: #f4f5f9;
}
</style>
