<template>
    <div class="">
        <form class="p-3">
            <p v-if="error.length > 0">
                <ul>
                    <li class="text-danger" v-for="(aleft, index) in error" :key="index">{{ aleft }}</li>
                </ul>
            </p>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Tên : </label>
                <div class="col-sm-9" >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Gucci"
                        v-model="brand.name"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Trạng thái : </label>
                <div class="col-sm-9">
                    <select v-model="brand.status" class="custom-select custom-select-sm">
                        <option value="0"> Vô hiệu hóa</option>
                        <option value="1"> Kích hoạt</option>
                    </select>
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
        }
    },
    methods: {
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
                    await this.$axios.$put('http://127.0.0.1:8000/api/brand/update/' + this.id, this.brand)
                    return this.$router.push('/brand')
                }
            }  
        },

        cancel() {
           return this.$router.push('/brand')
        },
    },

    
}
</script>