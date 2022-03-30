<template>
    <div class="">
        <form class="p-3">
            <p v-if="error.length > 0">
                <ul>
                    <li class="text-danger" v-for="(aleft, index) in error" :key="index">{{ aleft }}</li>
                </ul>
            </p>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Tên : </label>
                <div class="col-sm-10" >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Gucci"
                        v-model="brand.name"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Trạng thái : </label>
                <div class="col-sm-10">
                    <select v-model="brand.status" class="custom-select custom-select-sm">
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
                            :src="newImage || 'http://127.0.0.1:8000/' + brand.image"
                    />
                    <div id="preview" class="file-img">
                        <img v-if="url" :src="url" />
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
    props:["brand", "edit"],
    data() {
        return {
            error: [],
            brandId: this.$route.params.edit,
            id: this.$route.params.id,
            url:'',
            newImage: "",
            brand:{
                name: '',
                status:''
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

            if (!this.brand.name) {
                this.error.push("Thương hiệu không được để trống");
            }

            if (!this.brand.status) {
                this.error.push("Trạng thái không được để trống");
            }

            if (!this.error.length) {
                if (this.id) {

                    let formData = new FormData();
                    formData.append('name', this.brand.name);
                    formData.append('status', this.brand.status);

                    if(document.getElementById('image').files[0]) {
                        formData.append('image',document.getElementById('image').files[0]);
                    }

                    formData.append("_method", "PUT");

                    await this.$axios.$post('http://127.0.0.1:8000/api/brand/update/'+ this.id, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(res => {
                        this.$refs.fileUpload.value="";
                        alert("Cập nhật thành công !")
                        return this.$router.push('/brand')
                    })
                    }
            }  
        },

        cancel() {
           return this.$router.push('/brand')
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