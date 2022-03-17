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
            <ProductSearchForm v-on:search="searchProduct" />
           <ProductTable v-bind:products="products" :loading="loading" />
           <div>
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
</template>
<script>

import MenuLeft from '../../components/MenuLeft.vue'
import MenuHead from '../../components/MenuHead.vue'
import ProductTable from '../../components/product/ProductTable.vue';
import ProductSearchForm from '../../components/product/ProductSearchForm.vue'
import Pagination from '../../components/Pagination.vue'
export default {
  components: { ProductTable, MenuHead, MenuLeft, ProductSearchForm, Pagination },
    data: function () {
      return {
        products: [],
        search: " ",
        loading: false,
        total: 0,
        currentPage: 0,
        perPage: 10,
        totalItems: 0,
        panigation:{}
      };
    },

    mounted () {
      // this.fetchProduct(),
      this.loading = true
    },

    created() {
      this.fetchProduct();
    },

    methods: {

      fetchProduct(page_url) {
        const vm = this;
        page_url = page_url || 'http://127.0.0.1:8000/api/product/listProduct';
        this.loading = true
        fetch(page_url)
        .then(res=>res.json())
        .then(res=> {
          this.products = res.data;
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

      searchProduct(name) {
        this.loading = true
        this.$axios.$get('http://127.0.0.1:8000/api/product/listProduct?name='+ name)
          .then(res => {
            this.products = res.data;
          })
          this.loading = false
        },

      onReload () {
        this.setSort()
        setTimeout(() => this.setPageAndLimit(1, PAGE_SIZES[0]), 10)
        this.refresh()
      }
        
    }
  }
</script>
