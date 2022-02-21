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
          <UserSearchForm v-on:name="searchUser"   />
          <UserTable :users="users" :loading="loading" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserTable from '../../components/user/UserTable.vue'
import MenuLeft from '../../components/MenuLeft.vue'
import MenuHead from '../../components/MenuHead.vue'
import UserSearchForm from '../../components/user/UserSearchForm.vue'
export default {
  components: { UserTable, MenuHead, MenuLeft, UserSearchForm },
    data: () => ({
      users: [],
      name:'',
      phone: '',
      address:'',
      email: '',
      loading: false,
      total: 0,
      currentPage: 0,
      perPage: 10,
      totalItems: 0
    }),

    mounted () {
      this.fetch()
      this.loading = true
  //  this.list()
    },

    methods: {
      async fetch(page) {
          this.loading = true
          if (typeof page === "undefined") {
            page = 1;
          }
          const res = this.cate = await fetch("http://127.0.0.1:8000/api/users?page=" + page + "&limit=5").then(res => res.json());
          this.loading = false
          this.total = res.to
          return this.users = res.data
        },

        searchUser(keywork) {
          this.loading = true
          this.$axios.$get('http://127.0.0.1:8000/api/users?name='+ keywork)
            .then(res => {
              this.users = res.data;
            })
            this.loading = false
        },
    },
}
</script>