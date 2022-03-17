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
          <order-search-form v-on:search="searchOrder" class="pl-5 pt-3" />
        </div>
        <div>
          <div class="d-flex justify-content-center">
              <div v-if="loading" style="z-index: 10000;" class="spinner-border text-info">
                  <div class="sr-only"/>
              </div>
          </div>
          <div v-if="!loading" class="pl-5 pr-5 pt-5 pb-3 ">
            <div  class="product-list card">
              <table class="table table-striped ">
                  <thead>
                      <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Tên KH</th>
                          <th scope="col">SĐT </th>
                          <th scope="col">Sản phẩm</th>
                          <th scope="col">Tổng tiền</th>
                          <th scope="col">Địa chỉ</th>
                          <th scope="col">Trạng thái</th>
                          <th scope="col" class="text-right pr-5">Thao tác</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(item, key) in orders" :key="key">
                          <th scope="row">{{key+1}}</th>
                          <td>{{item.name}}</td>
                          <td>{{item.phone}}</td>
                          <td>
                              <ul v-for="(item, index) in JSON.parse(item.order_details)" :key="index" >
                                  <li class="d-flex justify-content-start">
                                      <div class="product-list" v-if="item.img">
                                          <img :src="'http://127.0.0.1:8000/'+item.img">
                                      </div>
                                      <div class="pl-3">
                                          {{item.name}}
                                      </div>
                                  </li>
                              </ul>
                          </td>
                          <td>{{formatPrice(item.amount)}} VNĐ</td>
                          <td>{{item.address}}</td>
                          <td v-if="item.status == 0" > Đang xử lý</td>
                          <td v-if="item.status == 1"> Đã xác nhận</td>
                          <td v-if="item.status == 2"> Đang giao hàng</td>
                          <td v-if="item.status == 3"> Đã nhận hàng</td>
                          <td v-if="item.status == 4"> Hoàn hàng</td>
                          <td  v-if="$auth.user.role == 2"  class="operation text-right">
                              <NuxtLink
                                  :to="'/order/' + item.id"
                                  class="btn btn-outline-primary btn-sm"
                                  >
                                  <font-awesome-icon :icon="['fas', 'edit']"  />Edit
                              </NuxtLink>
                              <button  type="button" class="btn btn-primary btn-sm" @click="onDelete(item.id)">
                                  <font-awesome-icon :icon="['fas', 'trash-alt']"  /> 
                                  Xóa
                              </button>
                          </td>
                      </tr>
                  </tbody>
                  </table>
          </div>
            <div class="pt-3">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item" v-bind:class="[{disabled: !panigation.prev_page_url}]">
                    <a @click="fetchProduct(panigation.prev_page_url)" class="page-link" href="#">Trang trước</a>
                  </li>
                  <li class="page-item disabled"><a class="page-link " >Trang {{panigation.current_page}} - {{panigation.last_page}}</a></li>
                  <li class="page-item" v-bind:class="[{disabled: !panigation.next_page_url}]">
                    <a  @click="fetchProduct(panigation.next_page_url)" class="page-link" href="#">Trang sau</a>
                  </li>
                </ul>
              </nav>
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
import OrderTable from '../../components/order/OrderTable.vue'
import OrderSearchForm from '../../components/order/OrderSearchForm.vue'
export default {
  components: { MenuHead, MenuLeft, OrderTable, OrderSearchForm },
    data: () => ({
      orders: [],
      name:'',
      phone: '',
      address:'',
      email: '',
      loading: false,
      total: 0,
      currentPage: 0,
      perPage: 10,
      totalItems: 0,
      panigation:{},
      search:''
    }),

    mounted () {
      this.loading = true
    },

    created() {
      this.fetchOrders();
    },


    methods: {
      fetchOrders(page_url) {
        const vm = this;
        page_url = page_url || 'http://127.0.0.1:8000/api/payments';
        this.loading = true
        fetch(page_url)
        .then(res=>res.json())
        .then(res=> {
          this.orders = res.data;
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

      formatPrice(value) {
            const val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },

        async onDelete(id) {
            if (confirm('Bạn có muốn xóa đơn hàng ? ')) {
                await this.$axios.$delete("http://127.0.0.1:8000/api/payment/destroy/" + id)
                location.reload();
            }
        },
        searchOrder(keywork) {
        this.loading = true
        this.$axios.$get('http://127.0.0.1:8000/api/payments?name='+ keywork)
          .then(res => {
            this.orders = res.data;
          })
          this.loading = false
        }
    }
    
}
</script>
<style scoped>
.product-list img {
    width: 80px;
    height: auto;
    object-fit: cover;
}
</style>