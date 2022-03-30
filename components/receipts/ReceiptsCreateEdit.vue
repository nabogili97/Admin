<template>
    <div class="">
        <form class="p-3">
            <p v-if="error.length > 0">
                <ul>
                    <li class="text-danger" v-for="(aleft, index) in error" :key="index">{{ aleft }}</li>
                </ul>
            </p>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Mã sản phẩm : </label>
                <div class="col-sm-10" >
                    <div class="col-sm-9">
                        <input 
                            type="text"
                            class="form-control"
                            id="inputName"
                            placeholder="YZ350"
                            v-model="productDetail.sku" 
                        >
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Tên sản phẩm : </label>
                <div class="col-sm-10" >
                    <div class="col-sm-9">
                        <div class="form-group">
                            <select  v-model="productDetail.product_id" class="form-control" id="exampleFormControlSelect1">
                                <option v-for="(item, key) in products.data" :key="key" :value="item.id">{{item.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Size : </label>
                <div class="col-sm-10">
                    <div class="form-group">
                        <select v-model="productDetail.size_id" class="form-control" id="exampleFormControlSelect1">
                            <option value="1">36</option>
                            <option value="2">37</option>
                            <option value="3">38</option>
                            <option value="4">39</option>
                            <option value="5">40</option>
                            <option value="6">41</option>
                            <option value="7">42</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Size : </label>
                <div class="col-sm-10">
                    <div class="form-group">
                        <select v-model="productDetail.color_id" class="form-control" id="exampleFormControlSelect1">
                            <option value="1">Đen</option>
                            <option value="2">Trắng</option>
                            <option value="3">Đỏ</option>
                            <option value="4">Xanh</option>
                            <option value="5">Vàng</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Số lượng : </label>
                <div class="col-sm-10" >
                    <div class="col-sm-9">
                        <input 
                            type="number"
                            class="form-control"
                            id="inputName"
                            placeholder="100"
                            v-model="productDetail.qty" 
                        >
                    </div>
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
    props:["receipt", "edit"],
    data() {
        return {
            error: [],
            receiptId: this.$route.params.edit,
            id: this.$route.params.id,
            url:'',
            newImage: "",
            productDetail:{
                sku: '',
                product_id:'',
                color_id:'',
                size_id:'',
                qty:''

            }
        }
    },
    methods: {
        async submitData() {
            this.error = [];

            if (!this.productDetail.sku) {
                this.error.push("Mã sản phẩm không được để trống");
            }

            if (!this.productDetail.product_id) {
                this.error.push("Sản phẩm không được để trống");
            }

            if (!this.productDetail.color_id) {
                this.error.push("Màu sắc không được để trống");
            }

            if (!this.productDetail.size_id) {
                this.error.push("Kích cỡ không được để trống");
            }

            if (!this.productDetail.qty) {
                this.error.push("Số lượng không được để trống");
            }

            if (!this.error.length) {
                if (this.id) {
                    await this.$axios.$put('http://127.0.0.1:8000/api/productDetail/update/' + this.id, this.productDetail)
                    return this.$router.push('/receipts')
                }
            }  
        },

        cancel() {
           return this.$router.push('/receipts')
        },
    },

    
}
</script>
<style scoped>
.brand-img img {
    max-height: 200px;
    height: auto;
    object-fit: cover;
}

.file-img img {
    max-height: 200px;
    height: auto;
    object-fit: cover;
}
</style>