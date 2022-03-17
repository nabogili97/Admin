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
              <li class="breadcrumb-item active">Thương hiệu</li>
              <li class="breadcrumb-item active">Chỉnh sửa</li>
            </ol>
          </div>
        </div>
        <div class="d-flex justify-content-center" >
          <div class="card col-md-12 p-0">
            <div class="card-header d-flex align-items-center">
            <h3 class="card-title">Chỉnh sửa thương hiệu</h3>
          </div>
            <BrandCreateEdit  :brand="brand" />
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
import BrandCreateEdit from '../../components/brand/BrandCreateEdit.vue'
export default {
  components: {BrandCreateEdit, MenuLeft, MenuHead },
  data() {
    return {
      brand: {},
      edit:true,
      id: this.$route.params.id,
    };
  },

   methods: {
        async findproductById() {
        this.cate = await this.$axios.$get("http://127.0.0.1:8000/api/brand/show/" + this.id)
        return this.brand = this.cate.data
        }
    },
    mounted() {
        this.findproductById()
    }


}
</script>

<style></style>
