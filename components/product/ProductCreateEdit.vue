<template>
    <div  class="">
        <form class="p-3">
            <p v-if="error.length > 0">
                <ul>
                    <li class="text-danger" v-for="(aleft, index) in error" :key="index">{{ aleft }}</li>
                </ul>
            </p>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-3 col-form-label">Trạng thái : </label>
                <div class="col-sm-10 col-9 brand-img">
                    <div id="preview" class="file-img">
                        <img v-if="url" :src="url" />
                    </div>
                    <img
                        class="brand-img"
                        alt=""
                        :src="newImage || 'http://127.0.0.1:8000/' + product.image"
                    />
                    <input accept="image/*"  type="file" ref="fileUpload" @change="previewFiles($event)"  class="form-control" name="image" id="image">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-3 col-form-label">Tên : </label>
                <div class="col-sm-10 col-9" >
                    <input 
                        type="text"
                        class="form-control"
                        v-model="product.name"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-3 col-form-label">Danh mục : </label>
                <div class="col-sm-10 col-9">
                    <select v-model="product.category_id" class="custom-select custom-select-sm">
                        <option value="1"> Cao cổ</option>
                        <option value="2"> Thấp cổ</option>
                        <option value="3"> Giày da</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-3 col-form-label">Thương hiệu : </label>
                <div class="col-sm-10 col-9">
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
                <label for="inputEmail3" class="col-sm-2 col-3 col-form-label">Giá nhập : </label>
                <div class="col-sm-10 col-9" >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Giày sneaker"
                        v-model="product.price"
                    >
                </div>
            </div>

            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-3 col-form-label">Giá bán : </label>
                <div class="col-sm-10 col-9" >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Giày sneaker"
                        v-model="product.retail_price"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-3 col-form-label">Số lượng : </label>
                <div class="col-sm-10 col-9" >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Giày sneaker"
                        v-model="product.qty"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-3 col-form-label">Mô tả : </label>
                <div class="col-sm-10 col-9" >
                    <textarea 
                        type="text"
                        class="form-control"
                        placeholder="Giày sneaker"
                        v-model="product.description"
                     />
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-3 col-form-label">Trạng thái : </label>
                <div class="col-sm-10 col-9">
                    <select v-model="product.status" class="custom-select custom-select-sm">
                        <option value="0"> Vô hiệu hóa</option>
                        <option value="1"> Kích hoạt</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-3 col-form-label">Nội dung : </label>
                <div class="col-sm-10 col-9" >
                    <client-only placeholder="loading...">
                        <ckeditor-nuxt v-model="product.content" :config="editorConfig"  />
                    </client-only>
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
// import Vue from 'vue'
// import VueFileAgent from 'vue-file-agent'
// import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css'
// Vue.use(VueFileAgent)
export default {
    props:["product", "edit"],
    components: {
        'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
    },
    data() {
        return {
            error: [],
            proId: this.$route.params.edit,
            id: this.$route.params.id,
            newImage: "",
            editorConfig: {
                simpleUpload: {
                    uploadUrl: 'path_to_image_controller',
                    headers: {
                        'Authorization': 'optional_token'
                        }
                    }
                },
        }
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

            if (!this.product.qty) {
                this.error.push("Số lượng sản phẩm không được để trống");
            }

            if (!this.product.status) {
                this.error.push("Trạng thái không được để trống");
            }

            if (!this.error.length) {
                if (this.id) {

                    let formData = new FormData();
                    formData.append('name', this.product.name);
                    formData.append('category_id', this.product.category_id);
                    formData.append('brand_id', this.product.brand_id);
                    formData.append('price', this.product.price);
                    formData.append('qty', this.product.qty);
                    formData.append('retail_price', this.product.retail_price);
                    formData.append('description', this.product.description);
                    formData.append('content', this.product.content);
                    formData.append('status', this.product.status);

                    if(document.getElementById('image').files[0]) {
                        formData.append('image',document.getElementById('image').files[0]);
                    }

                    formData.append("_method", "PUT");

                    await this.$axios.$post('http://127.0.0.1:8000/api/product/update/'+ this.id, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(res => {
                        this.$refs.fileUpload.value="";
                        alert("Cập nhật thành công !")
                        return this.$router.push('/product')
                    })
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
.brand-img img {
    max-height: 200px;
    height: auto;
    object-fit: cover;
}
</style>