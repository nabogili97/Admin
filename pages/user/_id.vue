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
              <li class="breadcrumb-item active">Thành viên</li>
              <li class="breadcrumb-item active">Chỉnh sửa</li>
            </ol>
          </div>
        </div>
        <div class="d-flex justify-content-center" >
          <div class="card col-md-12 p-0">
            <div class="card-header d-flex align-items-center">
            <h3 class="card-title">Chỉnh sửa thành viên</h3>
          </div>
          <UserCreateEdit :user="user" />
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
import UserCreateEdit from '~/components/user/UserCreateEdit.vue'
export default {
  components: { UserCreateEdit, MenuLeft, MenuHead },
    data() {
    return {
      user: {},
      edit:true,
      id: this.$route.params.id,
    };
  },

   methods: {
      async findUserById() {
      this.use = await this.$axios.$get("http://127.0.0.1:8000/api/users/show/" + this.id)
      return this.user = this.use.data
      }
   },
    mounted() {
        this.findUserById()
    }
}
</script>

<style></style>
