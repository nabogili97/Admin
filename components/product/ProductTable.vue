<template>
    <div>
        <div class="product-create d-flex justify-content-end mb-3">
            <div class="">
                <input type="button" @click="openModal" class="btn btn-primary btn-sm" value="+ Thêm mới">
                <div v-if="myModal" class="modal">
                    <transition name="model" class="modal-form">
                        <div class="modal-mask">
                            <form  @submit.prevent="onSubmit"   class="p-3 cate-form">
                                <p v-if="error.length > 0">
                                    <ul>
                                        <li class="text-danger" v-for="(aleft, index) in error" :key="index">{{ aleft }}</li>
                                    </ul>
                                </p>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Ảnh : </label>
                                    <div class="col-sm-9 product-img" >
                                        <input  type="text"  v-model="product.image" >
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Tên : </label>
                                    <div class="col-sm-9"  >
                                        <input 
                                            type="text"
                                            class="form-control"
                                            placeholder="Giày sneaker"
                                            v-model="product.name"
                                        >
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Danh mục : </label>
                                    <div class="col-sm-9">
                                        <select v-model="product.category_id" class="custom-select custom-select-sm">
                                            <option value="1"> Cao cổ</option>
                                            <option value="2"> Thấp cổ</option>
                                            <option value="3"> Giày da</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Thương hiệu : </label>
                                    <div class="col-sm-9">
                                        <select v-model="product.brand_id" class="custom-select custom-select-sm">
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
                                            type="nummber"
                                            class="form-control"
                                            placeholder="5.000.000"
                                            v-model="product.price"
                                        >
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Giá bán : </label>
                                    <div class="col-sm-9" >
                                        <input 
                                            type="number"
                                            class="form-control"
                                            placeholder="7.000.000"
                                            v-model="product.retail_price"
                                        >
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Số lượng : </label>
                                    <div class="col-sm-9" >
                                        <input 
                                            type="number"
                                            class="form-control"
                                            placeholder="7.000.000"
                                            v-model="product.qty"
                                        >
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Mô tả : </label>
                                    <div class="col-sm-9" >
                                        <textarea 
                                            type="text"
                                            class="form-control"
                                            placeholder="Thiết kế lạ mắt ..."
                                            v-model="product.description"
                                        />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Nội dung : </label>
                                    <div class="col-sm-9" >
                                        <textarea 
                                            type="text"
                                            class="form-control"
                                            placeholder="Content...."
                                            v-model="product.content"
                                        />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Trạng thái : </label>
                                    <div class="col-sm-9">
                                        <select v-model="product.status" class="custom-select custom-select-sm">
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
        <div  v-if="!loading"  class="product-list">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Ảnh </th>
                        <th scope="col">Tên</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Trạng thái </th>
                        <th scope="col" class="text-right pr-5">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in products" :key="key">
                        <th scope="row">{{key+1}}</th>
                        <td class="product-image"><img :src="item.image"></td>
                        <td>{{item.name}}</td>
                        <td>{{formatPrice(item.retail_price)}} VNĐ </td>
                        <td>{{item.qty}}</td>
                        <td v-if="item.status == 0">
                            Vô hiệu hóa
                        </td>
                        <td v-else>Kích hoạt</td>
                        <td class="operation text-right">
                            <NuxtLink
                                :to="'/product/' + item.id"
                                class="btn btn-outline-primary btn-sm"
                                >
                                <font-awesome-icon :icon="['fas', 'edit']"  />Edit
                            </NuxtLink> |
                            <button type="button" class="btn btn-primary btn-sm" @click="onDelete(item.id)">
                                <font-awesome-icon :icon="['fas', 'trash-alt']"  /> 
                                Xóa
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- <div>
                <p>Current page: {{ currentPage }}</p>
                <v-pagination v-model="currentPage"
                    :page-count="totalPages"
                    :classes="bootstrapPaginationClasses"
                    :labels="paginationAnchorTexts"
                    :click-handler="changePage"
                    >
                </v-pagination>
            </div> -->
        </div>
        <!-- <div>
            <div>
                <h6>Trang</h6>
                <b-pagination v-model="currentPage" pills :total-rows="rows" size="sm"></b-pagination>
            </div>
            <div>
                Test
               <Page :total="100" />
            </div>
        </div> -->

        <div class="border-bottom">
            <Pagination :records="15" v-model="page" :per-page="5" @paginate="callback" />
        </div> 

        <!-- 
        <v-pagination
            v-model="pagination.current"
            :length="pagination.total"
            @input="onPageChange"
        ></v-pagination> -->


    </div>
</template>
<script>
import Pagination from 'vue-pagination-2';
export default {
    props: {
        products: {
            type: Array,
            default: () => []
        },

        loading: {
            type: Boolean,
            default: () => false
        }
    },
    components: {
        Pagination
    },
    data() {
        return {
            loading: false,
            modal: false,
            // id: this.$route.params.id,
            product: {
                name: '',
                category_id:"",
                brand_id:"",
                price:"",
                retail_pridce: "",
                description: "",
                content:"",
                status: ''
            },
            products:[],
            myModal: false,
            error:[],
            rows: 100,
            currentPage: 1,
            totalPages: 30,
            bootstrapPaginationClasses: {
                ul: 'pagination',
                li: 'page-item',
                liActive: 'active',
                liDisable: 'disabled',
                button: 'page-link'  
            },
            paginationAnchorTexts: {
                first: 'First',
                prev: 'Previous',
                next: 'Next',
                last: 'Last'
            },
            pagination: {
                current: 1,
                total: 0
            },
            page: 1
        }
    },
    mounted(){
        this.list()
    },
    methods: {
        callback: function(page) {
            console.log(`Page ${page} was selected. Do something about it`);
        },
        async list(page=1){
            await axios.get(`/api/products?page=${page}`).then(({data})=>{
                this.products = data
            }).catch(({ response })=>{
                console.error(response)
            })
        },

        openModal() {
            this.myModal = true;
        },
        async onDelete(id) {
            if (confirm('Bạn có muốn xóa sản phẩm ? ')) {
                await this.$axios.$delete("http://127.0.0.1:8000/api/product/destroy/" + id)
                location.reload();
            }
        },
        async submitData() {
            this.error = [];

            if (!this.product.name) {
                this.error.push("Tên không được để trống");
            }

            if (!this.product.category_id) {
                this.error.push("Danh mục không được để trống");
            }

            if (!this.product.brand_id) {
                this.error.push("Thương hiệu không được để trống");
            }

            if (!this.product.price) {
                this.error.push("Giá bán không được để trống");
            }

            if (!this.product.retail_price) {
                this.error.push("Giá bán không được để trống");
            }

            if (!this.product.description) {
                this.error.push("Mô tả không được để trống");
            }

            if (!this.product.content) {
                this.error.push("nội dung không được để trống");
            }

            if (!this.product.status) {
                this.error.push("Trạng thái không được để trống");
            }

            if (!this.error.length) {
                if (this.id) {
                    await this.$axios.$put('http://127.0.0.1:8000/api/product/update/' + this.id, this.product)
                    this.myModal = false;
                    location.reload();
                }
                await this.$axios.$post('http://127.0.0.1:8000/api/product/store', this.product)
                this.myModal = false;
                location.reload();
            }
        },

        closeModal(){
            this.myModal = false;
        },

         linkEdit(id) {
            return "/product/" + id;
        },

        formatPrice(value) {
        const val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
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

.product-image img {
    max-width: 100px;
    height: auto;
    object-fit: cover;
}

</style>