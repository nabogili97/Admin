<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Laravel Vue JS File Upload Demo</div>
                    <div class="card-body">
                        <div v-if="success != ''" class="alert alert-success">
                            {{success}}
                        </div>
                        <form @submit="formSubmit" enctype="multipart/form-data">
                            <p v-if="error.length > 0">
                                <ul>
                                    <li class="text-danger" v-for="(aleft, index) in error" :key="index">{{ aleft }}</li>
                                </ul>
                            </p>
                            <span>Name</span>
                            <input type="text" v-model="name" /><br>
                            <span>cate</span>
                            <input type="text" v-model="category_id" /><br>
                            <span>brand</span>
                            <input type="text" v-model="brand_id" /><br>
                            <span>price</span>
                            <input type="text" v-model="price" /><br>
                            <span>retail Price</span>
                            <input type="text" v-model="retail_price" /><br>
                            <span>description</span>
                            <input type="text" v-model="description" /><br>
                            <span>content</span>
                            <input type="text" v-model="content" /><br>
                            <span>status</span>
                            <input type="text" v-model="status" /><br>
                            <span>anhr</span>
                            <input type="file" class="form-control" v-on:change="onChange">
                            <button class="btn btn-primary btn-block">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: '',
                file: '',
                success: '',
                path:'',
                image:'',
                category_id: '',
                brand_id:'',
                price:'',
                retail_price:'',
                description:'',
                content:'',
                status:'',
                error:''
            };
        },
        methods: {
            
            onChange(e) {
                this.image = e.target.files[0];
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
                    data.append('status', this.status);
                    this.$axios.$post('http://127.0.0.1:8000/api/upload/', data, config)
                    .then(function (res) {
                        existingObj.success = res.data.success;
                    })
                    .catch(function (err) {
                        existingObj.output = err;
                    });
                }
                
            }
        }
    }
</script>