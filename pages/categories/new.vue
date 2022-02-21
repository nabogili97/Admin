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
              <li class="breadcrumb-item active">Home</li>
              <li class="breadcrumb-item active">User</li>
              <li class="breadcrumb-item active">New</li>
            </ol>
          </div>
        </div>
        <div class="d-flex justify-content-center" >
          <div class="card col-md-12 p-0">
            <div class="card-header d-flex align-items-center">
            <h3 class="card-title">New Category</h3>
          </div>
            <category-create-edit />
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
import CategoryCreateEdit from '../../components/category/CategoryCreateEdit.vue'
export default {
  components: { MenuLeft, MenuHead, CategoryCreateEdit }
}
</script>

<style></style>
