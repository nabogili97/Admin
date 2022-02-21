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
          <BrandTable :brands="brands" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BrandTable from '../../components/brand/BrandTable.vue'
import MenuLeft from '../../components/MenuLeft.vue'
import MenuHead from '../../components/MenuHead.vue'
export default {
  components: { BrandTable, MenuHead, MenuLeft },
    data() {
        return {
            brands: [
                {id:"1", name: "Nike"},
                {id:"2", name: "Gucci"},
                {id:"3", name: "louis Vuitton"},
                {id:"4", name: "Converse"},
                {id:"5", name: "Vans"},
                {id:"6", name: "Banlenciaga"}
            ]
        }
    }
}
</script>