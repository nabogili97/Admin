<template>
    <div class="">
        <form class="p-3" @submit.prevent="onSubmit">
            <p v-if="error.length > 0">
                <ul>
                    <li class="text-danger" v-for="(aleft, index) in error" :key="index">{{ aleft }}</li>
                </ul>
            </p>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Tên : </label>
                <div class="col-sm-9">
                    <input 
                        type="text"
                        class="form-control"
                        id="inputName"
                        placeholder="Ngô Thế Cường"
                        v-model="user.name" 
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Email : </label>
                <div class="col-sm-9">
                    <input
                        type="text"
                        class="form-control"
                        id="inputName"
                        placeholder="admin@gmail.com"
                        v-model="user.email"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Mật khẩu : </label>
                <div class="col-sm-9">
                    <input
                        type="password"
                        class="form-control"
                        id="inputPassword"
                        placeholder="******"
                        v-model="user.password"
                    />
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Điện thoại : </label>
                <div class="col-sm-9">
                    <input
                        type="text"
                        class="form-control"
                        id="inputName"
                        placeholder="0326966656"
                        v-model="user.phone"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Địa chỉ : </label>
                <div class="col-sm-9">
                    <input
                        type="text"
                        class="form-control"
                        id="inputName"
                        placeholder="Hà Nội"
                        v-model="user.address"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Vai trò : </label>
                <div class="col-sm-9">
                    <select v-model="user.role" class="custom-select custom-select-sm">
                        <option value="1"> Thành viên</option>
                        <option value="0">Quản trị</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Giới tính : </label>
                <div class="col-sm-9">
                    <select v-model="user.sex" class="custom-select custom-select-sm">
                        <option value="0"> Nam</option>
                        <option value="1">Nữ</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Trạng thái : </label>
                <div class="col-sm-9">
                    <select v-model="user.status" class="custom-select custom-select-sm">
                        <option value="0"> Vô hiệu hóa</option>
                        <option value="1">Kích hoạt</option>
                    </select>
                </div>
            </div>
            <div class="form-submit">
                <div class="form-group text-center p-3">
                    <button class="btn btn-success" @click.prevent="submitData">Submit</button>
                    <button class="btn btn-primary">Clear</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    props:["user", "edit"],
    data() {
        return {
            id: this.$route.params.id,
            error: [],
            userId: this.$route.params.edit
        }
    },
    methods: {
        async submitData() {
            this.error = [];
            // this.user.role = Number(this.user.role)
            // this.user.sex = Number(this.user.sex)

            if (!this.user.name) {
                this.error.push("Tên không được để trống");
            }

            if (!this.user.email) {
                this.error.push("Email không được để trống");
            }

            if (!this.user.password) {
                this.error.push("Mật khẩu không được để trống");
            }

            if (!this.user.phone) {
                this.error.push("Điện thoại không được để trống");
            }

            if (!this.user.address) {
                this.error.push("Địa chỉ không được để trống");
            }

            if (!this.user.role) {
                this.error.push("Vai trò không được để trống");
            }

            if (!this.user.sex) {
                this.error.push("Giới tính không được để trống");
            }

            if (!this.user.status) {
                this.error.push("Trạng thái không được để trống");
            }

            if (!this.error.length) {
                if (this.id) {
                    await this.$axios.$put('http://127.0.0.1:8000/api/users/update/' + this.id, this.user)
                    return this.$router.push('/user')
                }
            }  
        },

        cancel() {
           return this.$router.push('/user')
        },
    }
}
</script>