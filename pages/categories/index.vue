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
            <CategorySearchForm v-on:search="searchCate" />
           <CategoryTable v-bind:listCategories="listCategories" :loading="loading" />
        </div>
        <div>
           <Pagination
              :total="total"
            />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import MenuLeft from '../../components/MenuLeft.vue'
import MenuHead from '../../components/MenuHead.vue'
import CategoryTable from '../../components/category/CategoryTable.vue';
import CategorySearchForm from '../../components/category/CategorySearchForm.vue'
import Pagination from '../../components/Pagination.vue'
export default {
  components: { CategoryTable, MenuHead, MenuLeft, CategorySearchForm, Pagination },
    data: function () {
      return {
        listCategories: [],
        search: " ",
        loading: false,
        total: 0,
        currentPage: 0,
        perPage: 10,
        totalItems: 0
      };
    },

    mounted () {
      this.fetch(),
      this.loading = true
    },

    methods: {
      async fetch(page) {
        this.loading = true
        if (typeof page === "undefined") {
          page = 1;
        }
        const res = this.cate = await fetch("http://127.0.0.1:8000/api/categories?page=" + page + "&limit=5").then(res => res.json());
        this.loading = false
        this.total = res.to
        return this.listCategories = res.data
      },

      searchCate(keywork) {
        this.loading = true
        this.$axios.$get('http://127.0.0.1:8000/api/categories?name='+ keywork)
          .then(res => {
            this.listCategories = res.data;
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
