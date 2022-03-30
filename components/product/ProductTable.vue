<template>
    <div>
        <div class="product-create d-flex justify-content-end mb-3">
            <div class="">
                <input type="button" @click="openModal" class="btn btn-primary btn-sm" value="+ Thêm mới">
                <div v-if="myModal" class="modal">
                    <transition name="model" class="modal-form">
                        <div class="modal-mask">
                            <form  @submit="formSubmit"   class="p-3 cate-form">
                                <div class="border-bottom pb-1 mb-3">
                                    <h3>Thêm sản phẩm</h3>
                                </div>
                                <p v-if="error.length > 0">
                                    <ul>
                                        <li class="text-danger" v-for="(aleft, index) in error" :key="index">{{ aleft }}</li>
                                    </ul>
                                </p>
                                <div class="row">
                                    <div class="col-md-6 col-12 border-right">
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-3 col-form-label">Tên : </label>
                                            <div class="col-sm-9 col-9"  >
                                                <input 
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Giày sneaker"
                                                    v-model="name"
                                                >
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-3 col-form-label">Danh mục : </label>
                                            <div  class="col-sm-9 col-9" >
                                                <select v-model="category_id" class="custom-select custom-select-sm">
                                                    <option  v-for="(item, key) in cateList.data" :key="key" :value="item.id">{{item.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-3 col-form-label">Thương hiệu : </label>
                                            <div  class="col-sm-9 col-9" >
                                                <select v-model="brand_id" class="custom-select custom-select-sm">
                                                    <option  v-for="(item, key) in brandList.data" :key="key" :value="item.id">{{item.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label  class="col-sm-3 col-3 col-form-label">Giá nhập : </label>
                                            <div class="col-sm-9 col-9" >
                                                <input 
                                                    type="nummber"
                                                    class="form-control"
                                                    placeholder="5.000.000"
                                                    v-model="price"
                                                >
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label  class="col-sm-3 col-3 col-form-label">Giá bán : </label>
                                            <div class="col-sm-9 col-9" >
                                                <input 
                                                    type="number"
                                                    class="form-control"
                                                    placeholder="7.000.000"
                                                    v-model="retail_price"
                                                >
                                            </div>
                                        </div>
                                    <div class="form-group row">
                                        <label  class="col-sm-3 col-3 col-form-label">Trạng thái : </label>
                                        <div class="col-sm-9 col-9">
                                            <select v-model="status" class="custom-select custom-select-sm">
                                                <option value="0"> Vô hiệu hóa</option>
                                                <option value="1"> Kích hoạt</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label  class="col-sm-3 col-3 col-form-label">Ảnh : </label>
                                        <div class="col-sm-9 col-9 product-img" >
                                            <input accept="image/*" type="file" @change="previewFiles($event)" class="form-control" v-on:change="onChange">
                                            <img
                                                class="brand-img"
                                                alt=""
                                                :src="newImage || 'https://www.namepros.com/attachments/empty-png.89209/'"
                                            />
                                        </div>
                                    </div>
                                    </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group row">
                                        <div class="col-sm-12 col-12" >
                                            <label  class=" col-form-label ">Giảm giá : </label>
                                            <input 
                                                max="100"
                                                min="0"
                                                type="number"
                                                class="form-control"
                                                placeholder="10%"
                                                v-model="discount"
                                            />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-12 col-12" >
                                            <label  class=" col-form-label ">Mô tả : </label>
                                            <textarea 
                                                type="text"
                                                class="form-control description"
                                                placeholder="Thiết kế lạ mắt ..."
                                                v-model="description"
                                            />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-12 content-scroll">
                                            <label for="inputEmail3" class="col-form-label">Giới thiệu sản phẩm : </label>
                                            <client-only placeholder="loading...">
                                                <ckeditor-nuxt v-model="content" :config="editorConfig"  />
                                            </client-only>
                                        </div>
                                    </div> 
                                </div>
                                </div>
                                <div class="form-submit">
                                    <div class="form-group text-center p-3">
                                        <button class="btn btn-success">Lưu</button>
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
                        <th scope="col">Giá nhập</th>
                        <th scope="col">Giá bán</th>
                        <th scope="col">Giảm giá</th>
                        <th scope="col">Trạng thái </th>
                        <th  v-if="$auth.user.role == 2"  scope="col" class="text-right pr-5">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in products" :key="key" v-bind:class="[{bgred: item.qty < 10}]">
                        <th scope="row">{{key+1}}</th>
                        <td class="product-image"><img :src="'http://127.0.0.1:8000/' + item.image"></td>
                        <td>{{item.name}}</td>
                        <td>{{formatPrice(item.price)}} VNĐ </td>
                        <td>{{formatPrice(item.retail_price)}} VNĐ </td>
                        <td class="text-right">{{item.discount}}%</td>
                        <td v-if="item.status == 0">
                            Vô hiệu hóa
                        </td>
                        <td v-else>Kích hoạt</td>
                        <td  v-if="$auth.user.role == 2"  class="operation text-right">
                            <NuxtLink
                            
                                :to="'/product/' + item.id"
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
        'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
    },
    data() {
        return {
            selectFile: null,
            loading: false,
            modal: false,
            // id: this.$route.params.id,
            name: '',
            file: '',
            success: '',
            path:'',
            discount:'',
            image:'',
            category_id: '',
            brand_id:'',
            price:'',
            retail_price:'',
            description:'',
            content:'',
            status:'',
            error:'',
            products:[],
            myModal: false,
            error:[],
            cateList:[],
            brandList:[],
            newImage: "",
            editorConfig: {
                simpleUpload: {
                    uploadUrl: 'http://127.0.0.1:8000/post/images/',
                    headers: {
                        'Authorization': 'optional_token'
                        }
                    }
            },
        }
    },

    mounted(){
        this.list()
    },

    async fetch() {
        this.cateList = await fetch(
        'http://127.0.0.1:8000/api/categories'
      ).then(res => res.json())

      this.brandList = await fetch(
        'http://127.0.0.1:8000/api/brands'
      ).then(resp => resp.json())
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
        

        //  getPhoto(photo){
        //     return "/gate/profile/photo"+photo;
        // },


        onFileChange(e){
            this.product.image = e.target.files[0];
        },

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
                this.$swal("Thành công", "Xóa sản phẩm thành công", "success")
                location.reload();
            }
        },
        onChange(e) {
                this.file = e.target.files[0];
            },
        formSubmit(e) {
            this.error = [];

            if (!this.name) {
                this.error.push("Tên không được để trống");
            }

            if (!this.category_id) {
                this.error.push("Danh mục không được để trống");
            }

            if (!this.brand_id) {
                this.error.push("Thương hiệu không được để trống");
            }

            if (!this.price) {
                this.error.push("Giá bán không được để trống");
            }

            if (!this.retail_price) {
                this.error.push("Giá bán không được để trống");
            }

            if (!this.discount) {
                this.error.push("Giảm giá không được để trống");
            }

            if (!this.description) {
                this.error.push("Mô tả không được để trống");
            }

            if (!this.content) {
                this.error.push("nội dung không được để trống");
            }

            if (!this.status) {
                this.error.push("Trạng thái không được để trống");
            }

            e.preventDefault();
            let existingObj = this;
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            if (!this.error.length) {
                let data = new FormData();
                data.append('file', this.file);
                data.append('name', this.name);
                data.append('category_id', this.category_id);
                data.append('brand_id', this.brand_id);
                data.append('price', this.price);
                data.append('retail_price', this.retail_price);
                data.append('description', this.description);
                data.append('content', this.content);
                data.append('discount', this.discount);
                data.append('status', this.status);
                this.$axios.$post('http://127.0.0.1:8000/api/upload/', data, config)
                .then(function (res) {
                    existingObj.success = res.data.success;
                })
                .catch(function (err) {
                    existingObj.output = err;
                });
            }
            this.myModal = false;
            this.$swal("Thành công", "Thêm sản phẩm thành công", "success")
            window.location.href = "/product";
            
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
@media screen and (min-width: 375px) {
    .cate-form {
        border-radius: 5px;
        width: 550px;
        background-color: white;
    }
    .modal {
    position: fixed;
    top: 10px;
    bottom: 0;
    left: 0px;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
} 
}

@media screen and (min-width: 920px) {
    .cate-form {
        border-radius: 5px;
        padding: 20px;
        width: 1300px;
        background-color: white;
    }
}


.product-image img {
    max-width: 100px;
    height: auto;
    object-fit: cover;
}

.description {
    height: 70px;
}

.brand-img {
    max-width: 150px;
    height: 100px;
    object-fit: cover;
    
}

.bgred {
    background-image: linear-gradient(#ffecd2, #fcb69f);
}

.content-scroll {
    overflow: scroll;
    height: 300px;
}

</style>