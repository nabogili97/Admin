<template>
    <div class="">
        <form class="p-3">
            <p v-if="error.length > 0">
                <ul>
                    <li class="text-danger" v-for="(aleft, index) in error" :key="index">{{ aleft }}</li>
                </ul>
            </p>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Tiêu đề : </label>
                <div class="col-sm-10" >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Gucci"
                        v-model="post.title"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Ngày hiển thị : </label>
                <div class="col-sm-10" >
                    <input 
                        type="date"
                        class="form-control"
                        placeholder="Gucci"
                        v-model="post.public_start_at"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Ngày kết thúc : </label>
                <div class="col-sm-10" >
                    <input 
                        type="date"
                        class="form-control"
                        placeholder="Gucci"
                        v-model="post.public_end_at"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Nội dung ngắn : </label>
                <div class="col-sm-10" >
                    <textarea 
                        type="text"
                        class="form-control description"
                        placeholder="Thiết kế lạ mắt ..."
                        v-model="post.description"
                    />
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Trạng thái : </label>
                <div class="col-sm-10">
                    <select v-model="post.status" class="custom-select custom-select-sm">
                        <option value="0"> Vô hiệu hóa</option>
                        <option value="1"> Kích hoạt</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Hình ảnh : </label>
                <div class="col-sm-10 file-img">
                     <input accept="image/*"  type="file" ref="fileUpload" @change="previewFiles($event)"  class="form-control" name="image" id="image">
                        <img
                            class="brand-img"
                            alt=""
                            :src="newImage || 'http://127.0.0.1:8000/' + post.image"
                    />
                    <div id="preview" class="file-img">
                        <img v-if="url" :src="url" />
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Chi tiết bài biết : </label>
                <div class="col-sm-10">
                    <client-only placeholder="loading...">
                        <ckeditor-nuxt v-model="post.content" :config="editorConfig"  />
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
export default {
    props:["post", "edit"],
    components: {
        'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
    },
    data() {
        return {
            error: [],
            brandId: this.$route.params.edit,
            id: this.$route.params.id,
            url:'',
            newImage: "",
            post:{
                title: '',
                content:'',
                public_start_at:'',
                public_end_at:'',
                description:'',
                status:'',
                editorConfig: {
                simpleUpload: {
                    uploadUrl: 'http://127.0.0.1:8000/post/images/',
                    headers: {
                        'Authorization': 'optional_token'
                        }
                    }
                },
            }
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

            if (!this.post.title) {
                this.error.push("Tiêu đề không được để trống");
            }

            if (!this.post.content) {
                this.error.push("Nội dung ngắn không được để trống");
            }

            if (!this.post.public_start_at) {
                this.error.push("Ngày hiển thị không được để trống");
            }

            if (!this.post.public_end_at) {
                this.error.push("Ngày kết thúc hiển thị không được để trống");
            }

            if (!this.post.description) {
                this.error.push("Chi tiết hiệu không được để trống");
            }

            if (!this.post.status) {
                this.error.push("Trạng thái không được để trống");
            }

            if (!this.error.length) {
                if (this.id) {

                    let formData = new FormData();
                    formData.append('title', this.post.title);
                    formData.append('content', this.post.content);
                    formData.append('public_start_at', this.post.public_start_at);
                    formData.append('public_end_at', this.post.public_end_at);
                    formData.append('description', this.post.description);
                    formData.append('status', this.post.status);

                    if(document.getElementById('image').files[0]) {
                        formData.append('image',document.getElementById('image').files[0]);
                    }

                    formData.append("_method", "PUT");

                    await this.$axios.$post('http://127.0.0.1:8000/api/post/update/'+ this.id, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(res => {
                        this.$refs.fileUpload.value="";
                        alert("Cập nhật thành công !")
                        return this.$router.push('/post')
                    })
                    }
            }  
        },

        cancel() {
           return this.$router.push('/post')
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