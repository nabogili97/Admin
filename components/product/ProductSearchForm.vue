<template>
    <div class="form-search">
        <div class="form-title pb-3">
            <span>TÌM KIẾM THÔNG TIN</span>
        </div>  
        <div>
            <form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <input 
                            type="text"
                            class="form-control"
                            placeholder="Hãy nhập tên..."
                            v-model="search"
                        >
                    </div>
                    <div class="col-md-3">
                        <button type="button" class="btn btn-primary"  @click="searchProduct" >Tìm kiếm</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        search: '',
        listSearch:''
        }
  },

  methods: {
    searchProduct() {
        this.$emit("search",this.search);
    },
  }
}
</script>