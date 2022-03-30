<template>
    <div class="bg-res">
         <div class="register container pt-5 pb-5 mb-5 login">
            <div class="row">
                <div class="register-left col-md-5">
                    <img src="https://images-cdn.newscred.com/Zz04NjA3ZjljMjQ0ODkxMWViOWRjYzU1OGJkNjI1ZjVkZA==">
                </div>
                <div class="register-right col-md-7 ">
                    <form   class="pl-4 pr-2 border-left">
                        <h5 class="mb-5">ĐĂNG NHẬP</h5>
                        <p v-if="error.length > 0">
                            <ul>
                                <li class="text-danger" v-for="(aleft, index) in error" :key="index">{{ aleft }}</li>
                            </ul>
                        </p>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email</label>
                            <input v-model="userForm.email" type="email" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Mật khẩu</label>
                            <input v-model="userForm.password"  type="password" class="form-control" >
                        </div>
                        <!-- <div class="mb-5">
                            <a href="/register">Đăng ký</a>
                        </div> -->
                        <button @click.prevent="loginUser" type="submit" class="btn btn-primary" >Đăng Nhập</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    layout: 'login',
    data() {
        return {
            userForm: {
                email: '',
                password: ''
            },
            user : [],
            isLogin : '',
            error: [],
            
        }
    },

    methods: {
        async loginUser() {

            this.error = [];

            if (!this.userForm.email) {
                this.error.push("Email không được để trống");
            }

            if (!this.userForm.password) {
                this.error.push("Mật khẩu không được để trống");
            }

            if (!this.error.length) {
                await this.$auth.login({
                    data: this.userForm
                })
                .then(() => this.$router.push('/'))
                .catch(function(erro) {
                    alert('Tài khoản sai hoặc không tồn tại !!!')
                }); 
            }
        
    }


        
    },
}
</script>

<style scoped>
.register {
    color: #fff;
    background-color: #321d61;
    margin-top: 20px;
    padding: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px;
}
.register img {
    width: 100%;
}

.login {
    margin-top: 150px;
}

.bg-res {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-zoom-virtual-background-_Tcjok-d9b4.jpg');
}
</style>