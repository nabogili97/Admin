<template>
    <div>
        <div class="product-create d-flex justify-content-end mb-3">
            <div class="">
                <input type="button" @click="openModal" class="btn btn-primary btn-sm" value="+ Nhập hàng">
                <div v-if="myModal" class="modal">
                    <transition name="model" class="modal-form">
                        <div class="modal-mask">
                            <form class="p-3 cate-form" @submit.prevent="onSubmit" >
                                <div class="border-bottom">
                                    <h3>Nhập Kho</h3>
                                </div>
                                <p v-if="error.length > 0">
                                    <ul>
                                        <li class="text-danger" v-for="(aleft, index) in error" :key="index">{{ aleft }}</li>
                                    </ul>
                                </p>
                                <div class="form-group row pt-3">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Sản phẩm : </label>
                                    <div class="col-sm-9">
                                        <div class="form-group">
                                            <select  v-model="productDetail.product_id" class="form-control" id="exampleFormControlSelect1">
                                                <option v-for="(item, key) in products.data" :key="key" :value="item.id">{{item.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row pt-3">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Size : </label>
                                    <div class="col-sm-9">
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
                                <div class="form-group row pt-3">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Số lượng : </label>
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
                                <div class="form-submit">
                                    <div class="form-group text-center p-3">
                                        <button class="btn btn-success" @click.prevent="submitData">Lưu</button>
                                        <button class="btn btn-primary"  @click="closeModal">Hủy</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </transition>
                </div>
            </div> 
        </div> 
        <div class="d-flex justify-content-center">
            <div v-if="loading" style="z-index: 10000;" class="spinner-border text-info">
                <div class="sr-only"/>
            </div>
        </div>
        <div  v-if="!loading"  class="product-list">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Size </th>
                        <th scope="col">Số lượng </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in receipts" :key="key" v-bind:class="[{bgred: item.qty < 10}]">
                        <th scope="row">{{key+1}}</th>
                        <td class="product-image"><img :src="'http://127.0.0.1:8000/' + item.image"></td>
                        <td>{{item.name}}</td>
                        <td>{{item.size_value}}</td>
                        <td>{{item.qty}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    props: {
        receipts: {
            type: Array,
            default: () => []
        },

        loading: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            products:[],
            loading: false,
            modal: false,
            // id: this.$route.params.id,
            productDetail:{
                product_id: '',
                size_id:'',
                qty:'',
            },
            myModal: false,
            error:[],
            url:'',
            newImage: ""
        }
    },

    async fetch() {
      this.products = await fetch(
        'http://127.0.0.1:8000/api/productLists'
      ).then(res => res.json())
    },

    methods: {

        openModal() {
            this.myModal = true;
        },
        async onDelete(id) {
            if (confirm('Bạn có muốn xóa thương hiệu ? ')) {
                await this.$axios.$delete("http://127.0.0.1:8000/api/productDetail/destroy/" + id)
                this.$swal("Thành công", "Xóa phiếu nhập hàng thành công", "success")
                location.reload();
            }
        },
        async submitData() {
            this.error = [];

            if (!this.productDetail.product_id) {
                this.error.push("Sản phẩm không được để trống");
            }

            if (!this.productDetail.size_id) {
                this.error.push("Size không được để trống");
            }

            if (!this.productDetail.qty) {
                this.error.push("Số lượng không được để trống");
            }

            if (!this.error.length) {
                if (this.id) {
                    await this.$axios.$put('http://127.0.0.1:8000/api/productDetail/update/' + this.id, this.productDetail)
                    this.myModal = false;
                    location.reload();
                }
                // await this.$axios.$post('http://127.0.0.1:8000/api/productDetail/store',{
                //     'sku' = this.productDetail
                // } );

                const response = await axios.post('http://127.0.0.1:8000/api/productDetail/store',{
                    'product_id':  this.productDetail.product_id,
                    'size_id': this.productDetail.size_id,
                    'qty':this.productDetail.qty
                });

                this.myModal = false;
                this.$swal("Thành công", "Nhập kho thành công", "success")
                location.reload();
            }
        },

        closeModal(){
            this.myModal = false;
        },

         linkEdit(id) {
            return "/brands/" + id;
        },
    },
}
</script>
<style scoped>

a {
    text-decoration: none;
}

.operation a:hover {
    color: red;
}
 .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
} 
.modal-form {
    height: auto;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
} 

.cate-form {
    border-radius: 5px;
    padding: 20px;
    width: 800px;
    background-color: white;
}

.brand-img {
    max-width: 150px;
    height: 100px;
    
}

.product-image img {
    max-width: 100px;
    height: auto;
    object-fit: cover;
}

.bgred {
    background-image: linear-gradient(#ffecd2, #fcb69f);
}
</style>