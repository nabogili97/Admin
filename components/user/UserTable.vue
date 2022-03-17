<template>
    <div>
        <div class="product-create d-flex justify-content-end mb-3">
            <div class="">
                <input type="button" @click="openModal" class="btn btn-primary btn-sm" value="+ Thêm mới">
                <div v-if="userModal" class="modal">
                    <transition name="model" class="modal-form">
                        <div class="modal-mask">
                            <form class="p-3 cate-form" @submit.prevent="onSubmit">
                                <div>
                                    <h3 class="border-bottom">Thêm mới thành viên</h3>
                                </div>
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
        <div v-if="!loading" class="product-list">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên </th>
                        <th scope="col">Email </th>
                        <th scope="col">Điện thoại </th>
                        <th scope="col">Giới tính </th>
                        <th scope="col">Chức vụ </th>
                        <th scope="col">Địa chỉ </th>
                        <th  v-if="$auth.user.role == 2"  scope="col" class="text-right pr-5">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in users" :key="key">
                        <th scope="row">{{key+1}}</th>
                        <td>{{item.name}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.phone}}</td>
                        <td v-if="item.sex == 0"> Nam </td>
                        <td v-else>Nữ</td>
                        <td v-if="item.role == 0"> Quản trị viên </td>
                        <td v-else>Thành viên</td>
                        <td>{{item.address}}</td>
                        <td  v-if="$auth.user.role == 2"  class="operation text-right">
                            <NuxtLink
                                :to="'/user/' + item.id"
                                class="btn btn-outline-primary btn-sm"
                                ><font-awesome-icon :icon="['fas', 'edit']"  />Edit
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
        users: {
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
            userModal: false,
            user: {
                name: '',
                email: '',
                password:'',
                phone:'',
                address:'',
                sex:'',
                role:'',
                status: ''
            },
            error:[],
            rows: 100,
            currentPage: 1,
            totalPages: 30,
        }
    },
    methods: {
        async onDelete(id) {
            if (confirm('Bạn có muốn xóa thành viên ? ')) {
                await this.$axios.$delete("http://127.0.0.1:8000/api/users/destroy/" + id)
                this.$emit('onDelete')
                window.location.href = "/user";
            }
        },

        async submitData() {
            this.error = [];

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
                    this.userModal = false;
                    location.reload();
                }
                await this.$axios.$post('http://127.0.0.1:8000/api/auth/register', this.user)
                this.userModal = false;
                location.reload();
            }
        },

        UploadFile(upPhoto) {
            console.log(upPhoto);
        },
        
        openModal() {
            this.userModal = true;
        },

        closeModal(){
            this.userModal = false;
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