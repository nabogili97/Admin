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
          <ProductTable :products="products" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductTable from '../../components/product/ProductTable.vue'
import MenuLeft from '../../components/MenuLeft.vue'
import MenuHead from '../../components/MenuHead.vue'
export default {
  components: { ProductTable, MenuHead, MenuLeft },
    data() {
        return {
            products: []
        }
    },
      async fetch() {
      this.products = await fetch("http://127.0.0.1:8000/api/productLists").then(res => res.json());
      return this.products 
    },
}
</script>