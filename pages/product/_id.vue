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
        <div>
        <div class="row align-items-center">
          <div class="col">
            <ol class="breadcrumb my-3">
              <li class="breadcrumb-item active">Trang chủ</li>
              <li class="breadcrumb-item active">Sản phẩm</li>
              <li class="breadcrumb-item active">Chỉnh sửa</li>
            </ol>
          </div>
        </div>
        <div class="d-flex justify-content-center" >
          <div class="card col-md-12 p-0">
            <div class="card-header d-flex align-items-center">
            <h3 class="card-title">Chỉnh sửa sản phẩm</h3>
          </div>
            <ProductCreateEdit  :product="product" />
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import MenuLeft from '../../components/MenuLeft.vue'
import MenuHead from '../../components/MenuHead.vue'
import ProductCreateEdit from '../../components/product/ProductCreateEdit.vue'
export default {
  components: {ProductCreateEdit, MenuLeft, MenuHead },
  data() {
    return {
      product: {},
      edit:true,
      id: this.$route.params.id,
    };
  },

   methods: {
        async findproductById() {
          this.pro = await this.$axios.$get("http://127.0.0.1:8000/api/product/show/" + this.id)
          return this.product = this.pro.data
        }
    },
    mounted() {
        this.findproductById()
    }


}
</script>

<style></style>
