<template>
    <div  class="">
        <form   v-for="(item, key) in product" :key="key" class="p-3">
            <p v-if="error.length > 0">
                <ul>
                    <li class="text-danger" v-for="(aleft, index) in error" :key="index">{{ aleft }}</li>
                </ul>
            </p>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Ảnh : </label>
                <div class="col-sm-9 product-img" >
                    <img 
                        :src="item.image"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Tên : </label>
                <div class="col-sm-9" >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Giày sneaker"
                        v-model="item.name"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Danh mục : </label>
                <div class="col-sm-9">
                    <select v-model="item.category_id" class="custom-select custom-select-sm">
                        <option value="1"> Cao cổ</option>
                        <option value="2"> Thấp cổ</option>
                        <option value="3"> Giày da</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Thương hiệu : </label>
                <div class="col-sm-9">
                    <select v-model="item.brand_id" class="custom-select custom-select-sm">
                        <option value="1">Gucci</option>
                        <option value="2">Nike</option>
                        <option value="3">Vans</option>
                        <option value="4">Louis Vuition</option>
                        <option value="5">Converse</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Giá nhập : </label>
                <div class="col-sm-9" >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Giày sneaker"
                        v-model="item.price"
                    >
                </div>
            </div>

            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Giá bán : </label>
                <div class="col-sm-9" >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Giày sneaker"
                        v-model="item.retail_price"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Mô tả : </label>
                <div class="col-sm-9" >
                    <textarea 
                        type="text"
                        class="form-control"
                        placeholder="Giày sneaker"
                        v-model="item.description"
                     />
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Nội dung : </label>
                <div class="col-sm-9" >
                    <textarea 
                        type="text"
                        class="form-control"
                        placeholder="Giày sneaker"
                        v-model="item.content"
                     />
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Trạng thái : </label>
                <div class="col-sm-9">
                    <select v-model="item.status" class="custom-select custom-select-sm">
                        <option value="0"> Vô hiệu hóa</option>
                        <option value="1"> Kích hoạt</option>
                    </select>
                </div>
            </div>
            <div class="form-submit">
                <div class="form-group text-center p-3">
                    <button class="btn btn-success" @click.prevent="submitData">Lưu</button>
                    <button class="btn btn-primary"  @click.prevent="cancel">Hủy</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    props:["product", "edit"],
    data() {
        return {
            error: [],
            proId: this.$route.params.edit,
            id: this.$route.params.id,
        }
    },
    methods: {
        async submitData() {
            this.error = [];

            if (!this.product.name) {
                this.error.push("Tến sản phẩm không được để trống");
            }

            if (!this.product.category_id) {
                this.error.push("Danh mục sản phẩm không được để trống");
            }

            if (!this.product.brand_id) {
                this.error.push("Thương hiệu sản phẩm không được để trống");
            }

            if (!this.product.price) {
                this.error.push("Giá nhập sản phẩm không được để trống");
            }

            if (!this.product.retail_price) {
                this.error.push("Giá bán sản phẩm không được để trống");
            }

            if (!this.product.description) {
                this.error.push("Mô tả sản phẩm không được để trống");
            }

            if (!this.product.content) {
                this.error.push("Nội dung sản phẩm không được để trống");
            }

            if (!this.product.status) {
                this.error.push("Trạng thái không được để trống");
            }

            if (!this.error.length) {
                if (this.id) {
                    await this.$axios.$put('http://127.0.0.1:8000/api/product/update/' + this.id, this.product)
                    return this.$router.push('/product')
                }
            }  
        },

        cancel() {
           return this.$router.push('/product')
        },
    },

    
}
</script>

<style scoped>
.product-img img {
    max-width: 300px;
    height: auto;
}
</style>