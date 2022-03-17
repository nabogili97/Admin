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
        <div  v-if="!loading"  class="product-list">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên </th>
                        <th scope="col">Trạng thái </th>
                        <th  v-if="$auth.user.role == 2"  scope="col" class="text-right pr-5">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in listCategories" :key="key">
                        <th scope="row">{{key+1}}</th>
                        <td>{{item.name}}</td>
                        <td v-if="item.status == 0">
                            Vô hiệu hóa
                        </td>
                        <td v-else>Kích hoạt</td>
                        <td  v-if="$auth.user.role == 2"  class="operation text-right">
                            <NuxtLink
                                :to="'/categories/' + item.id"
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
        listCategories: {
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
            loading: false,
            modal: false,
            // id: this.$route.params.id,
            category: {
                name: '',
                status: ''
            },
            listCategories:[],
            myModal: false,
            error:[],
            rows: 100,
            currentPage: 1,
            totalPages: 30,
        }
    },
    // mounted(){
    //     this.list()
    // },
    methods: {
        // callback: function(page) {
        //     console.log(`Page ${page} was selected. Do something about it`);
        // },
        // async list(page=1){
        //     await axios.get(`/api/categories?page=${page}`).then(({data})=>{
        //         this.listCategories = data
        //     }).catch(({ response })=>{
        //         console.error(response)
        //     })
        // },

        openModal() {
            this.myModal = true;
        },
        async onDelete(id) {
            if (confirm('Bạn có muốn xóa danh mục ? ')) {
                await this.$axios.$delete("http://127.0.0.1:8000/api/categories/destroy/" + id)
                location.reload();
            }
        },
        async submitData() {
            this.error = [];

            if (!this.category.name) {
                this.error.push("Danh mục không được để trống");
            }

            if (!this.category.status) {
                this.error.push("Trạng thái không được để trống");
            }

            if (!this.error.length) {
                if (this.id) {
                    await this.$axios.$put('http://127.0.0.1:8000/api/categories/update/' + this.id, this.category)
                    this.myModal = false;
                    location.reload();
                }
                await this.$axios.$post('http://127.0.0.1:8000/api/categories/store', this.category)
                this.myModal = false;
                location.reload();
            }
        },

        closeModal(){
            this.myModal = false;
        },

         linkEdit(id) {
            return "/categories/" + id;
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

</style>