<template>
    <div>
        <div class="product-create d-flex justify-content-end mb-3">
            <div class="">
                <input type="button" @click="openModal" class="btn btn-primary btn-sm" value="+ Thêm mới">
                <div v-if="myModal" class="modal">
                    <transition name="model" class="modal-form">
                        <div class="modal-mask">
                            <form class="p-3 cate-form" @submit.prevent="onSubmit">
                                <div class="border-bottom">
                                    <h3>Thêm Danh Mục</h3>
                                </div>
                                <p v-if="error.length > 0">
                                    <ul>
                                        <li class="text-danger" v-for="(aleft, index) in error" :key="index">{{ aleft }}</li>
                                    </ul>
                                </p>
                                <div class="form-group row pt-3">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Tên : </label>
                                    <div class="col-sm-9">
                                        <input 
                                            type="text"
                                            class="form-control"
                                            id="inputName"
                                            placeholder="Giày sneaker"
                                            v-model="category.name" 
                                        >
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Trạng thái : </label>
                                    <div class="col-sm-9">
                                        <select v-model="category.status" class="custom-select custom-select-sm">
                                            <option value="0"> Vô hiệu hóa</option>
                                            <option value="1"> Kích hoạt</option>
                                        </select>
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
        <div  class="product-list">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên KH</th>
                        <th scope="col">SĐT </th>
                        <th scope="col">Sản phẩm</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col" class="text-right pr-5">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in orders" :key="key">
                        <div>Test : {{item}} </div>
                        <th scope="row">{{key+1}}</th>
                        <td>{{item.name}}</td>
                        <td>{{item.phone}}</td>
                        <td>
                            <ul v-for="(item, index) in JSON.parse(item.order_details)" :key="index" >
                                <li class="d-flex justify-content-start">
                                    <div class="product-list">
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
        
    </div>
</template>
<script>
export default {
    props: {
        orders: {
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
            myModal: false,
        }
    },
    methods: {
        toggleModal() {
            this.modal = !this.modal;
        },

        formatPrice(value) {
            const val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },

        async onDelete(id) {
            if (confirm('Bạn có muốn xóa đơn hàng ? ')) {
                await this.$axios.$delete("http://127.0.0.1:8000/api/payment/destroy/" + id)
                this.$swal("Thành công", "Xóa đơn hàng thành công", "success")
                location.reload();
            }
        },

        closeModal(){
            this.myModal = false;
        },
    }
}
</script>
<style scoped>
.product-img img {
    width: 100px;
    height: auto;
    object-fit: cover;
}

a {
    text-decoration: none;
}

.operation a:hover {
    color: red;
}

.product-list img {
    width: 80px;
    height: auto;
    object-fit: cover;
}
</style>