<template>
    <div>
        <div class="product-create d-flex justify-content-end mb-3">
            <div class="">
                <input type="button" @click="openModal" class="btn btn-primary btn-sm" value="+ Thêm mới">
                <div v-if="myModal" class="modal">
                    <transition name="model" class="modal-form">
                        <div class="modal-mask">
                            <form class="p-3 cate-form" @submit.prevent="onSubmit" >
                                <div class="border-bottom">
                                    <h3>Thêm Bài Viết</h3>
                                </div>
                                <p v-if="error.length > 0">
                                    <ul>
                                        <li class="text-danger" v-for="(aleft, index) in error" :key="index">{{ aleft }}</li>
                                    </ul>
                                </p>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group row pt-3">
                                            <label for="inputEmail3" class="col-sm-3 col-form-label">Tên : </label>
                                            <div class="col-sm-9">
                                                <input 
                                                    type="text"
                                                    class="form-control"
                                                    id="inputName"
                                                    placeholder="Gucci"
                                                    v-model="title" 
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group row pt-3">
                                            <label for="inputEmail3" class="col-sm-3 col-form-label">Ngày hiển thị : </label>
                                            <div class="col-sm-9">
                                                <input 
                                                    type="date"
                                                    class="form-control"
                                                    id="inputName"
                                                    placeholder="Gucci"
                                                    v-model="public_start_at" 
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group row pt-3">
                                            <label for="inputEmail3" class="col-sm-3 col-form-label">Ngày kết thúc : </label>
                                            <div class="col-sm-9">
                                                <input 
                                                    type="date"
                                                    class="form-control"
                                                    id="inputName"
                                                    placeholder="Gucci"
                                                    v-model="public_end_at" 
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputEmail3" class="col-sm-3 col-form-label">Hình ảnh : </label>
                                            <div class="col-sm-9">
                                                <input accept="image/*"  type="file" ref="fileUpload" @change="previewFiles($event)"  class="form-control" name="image" id="image">
                                                <img
                                                    class="brand-img"
                                                    alt=""
                                                    :src="newImage || 'https://www.namepros.com/attachments/empty-png.89209/'"
                                                />
                                            </div>
                                            <div id="preview">
                                                <img v-if="url" :src="url" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group row pt-3">
                                            <label for="inputEmail3" class="col-sm-3 col-form-label">Nội dung ngắn : </label>
                                            <div class="col-sm-9">
                                                <textarea 
                                                    type="text"
                                                    class="form-control description"
                                                    placeholder="Thiết kế lạ mắt ..."
                                                    v-model="content"
                                                />
                                            </div>
                                        </div>
                                        <div class="form-group row pt-3">
                                            <label for="inputEmail3" class="col-sm-3 col-form-label">Chi tiết : </label>
                                            <div class="col-sm-9">
                                                <textarea 
                                                    type="text"
                                                    class="form-control description"
                                                    placeholder="Thiết kế lạ mắt ..."
                                                    v-model="description"
                                                />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputEmail3" class="col-sm-3 col-form-label">Trạng thái : </label>
                                            <div class="col-sm-9">
                                                <select v-model="status" class="custom-select custom-select-sm">
                                                    <option value="0"> Vô hiệu hóa</option>
                                                    <option value="1"> Kích hoạt</option>
                                                </select>
                                            </div>
                                        </div>
                                        
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
                        <th scope="col">Tiêu đề </th>
                        <th scope="col">Ngày hiển thị </th>
                        <th scope="col">Ngày kết thúc </th>
                        <th scope="col">Trạng thái </th>
                        <th  v-if="$auth.user.role == 2"  scope="col" class="text-right pr-5">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in posts" :key="key">
                        <th scope="row">{{key+1}}</th>
                        <td class="brand-image"><img :src="'http://127.0.0.1:8000/' + item.image"></td>
                        <td>{{item.title}}</td>
                        <td>{{item.public_start_at}}</td>
                        <td>{{item.public_end_at}}</td>
                        <td v-if="item.status == 0">
                            Vô hiệu hóa
                        </td>
                        <td v-else>Kích hoạt</td>
                        <td  v-if="$auth.user.role == 2"  class="operation text-right">
                            <NuxtLink
                                :to="'/post/' + item.id"
                                class="btn btn-outline-primary btn-sm"
                                >
                                <font-awesome-icon :icon="['fas', 'edit']"  />Edit
                            </NuxtLink>
                            <button type="button" class="btn btn-primary btn-sm" @click="onDelete(item.id)">
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
import Pagination from 'vue-pagination-2';
export default {
    props: {
        posts: {
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
            title: '',
            content:'',
            public_start_at:'',
            public_end_at:'',
            status: '',
            description:'',
            posts:[],
            myModal: false,
            error:[],
            url:'',
            newImage: ""
        }
    },
    mounted(){
        this.list()
    },
    methods: {
        async previewFiles(event) {
            const file = event.target.files[0];

            const theReader = new FileReader();
            theReader.onloadend = async () => {
                this.newImage = await theReader.result;
            };
            theReader.readAsDataURL(file);
        },
        callback: function(page) {
            console.log(`Page ${page} was selected. Do something about it`);
        },
        async list(page=1){
            await axios.get(`/api/categories?page=${page}`).then(({data})=>{
                this.brands = data
            }).catch(({ response })=>{
                console.error(response)
            })
        },

        openModal() {
            this.myModal = true;
        },
        async onDelete(id) {
            if (confirm('Bạn có muốn xóa thương hiệu ? ')) {
                await this.$axios.$delete("http://127.0.0.1:8000/api/brand/destroy/" + id)
                location.reload();
            }
        },
        async submitData() {
            this.error = [];

            if (!this.title) {
                this.error.push("Tiêu đề không được để trống");
            }

            if (!this.content) {
                this.error.push("Nội dung ngắn không được để trống");
            }

            if (!this.public_start_at) {
                this.error.push("Ngày hiển thị không được để trống");
            }

            if (!this.public_end_at) {
                this.error.push("Ngày kết thúc hiển thị không được để trống");
            }

            if (!this.description) {
                this.error.push("Chi tiết hiệu không được để trống");
            }

            if (!this.status) {
                this.error.push("Trạng thái không được để trống");
            }

            if (!this.error.length) {
                let formData = new FormData();
                formData.append('title', this.title);
                formData.append('content', this.content);
                formData.append('public_start_at', this.public_start_at);
                formData.append('public_end_at', this.public_end_at);
                formData.append('description', this.description);
                formData.append('status', this.status);
                if(document.getElementById('image').files[0]) {
                    formData.append('image',document.getElementById('image').files[0]);
                }

                await this.$axios.$post('http://127.0.0.1:8000/api/post/store', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(res => {
                    this.$refs.fileUpload.value="";
                    location.reload();
                    alert("Thêm thành công !")
                })
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
    width: 1200px;
    background-color: white;
}

.brand-img {
    max-width: 150px;
    height: 100px;
    
}

.brand-image img {
    max-width: 100px;
    height: auto;
    object-fit: cover;
}

</style>