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
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item" v-bind:class="[{disabled: !panigation.prev_page_url}]">
                <a @click="fetchUsers(panigation.prev_page_url)" class="page-link" href="#">Trang trước</a>
              </li>
              <li class="page-item disabled"><a class="page-link " >Trang {{panigation.current_page}} - {{panigation.last_page}}</a></li>
              <li class="page-item" v-bind:class="[{disabled: !panigation.next_page_url}]">
                <a  @click="fetchUsers(panigation.next_page_url)" class="page-link" href="#">Trang sau</a>
              </li>
            </ul>
          </nav>
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
      totalItems: 0,
      panigation:{}
    }),

    mounted () {
      this.loading = true
    },

    created() {
      this.fetchUsers();
    },

    methods: {
       fetchUsers(page_url) {
        const vm = this;
        page_url = page_url || 'http://127.0.0.1:8000/api/users';
        this.loading = true
        fetch(page_url)
        .then(res=>res.json())
        .then(res=> {
          this.users = res.data;
          vm.makePagination(res.meta, res.links);
          this.loading = false
        })
      },

      makePagination(meta, links) {
        const pagination = {
          current_page: meta.current_page,
          last_page: meta.last_page,
          next_page_url: links.next,
          prev_page_url: links.prev
        }
        this.panigation = pagination
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