<template>
    <div class="menu-head ">
        <div class="d-flex justify-content-end ">
            <div class="pr-3 pl-0 ">
                <div v-if="$auth.loggedIn"  >
                   <span>Hello <b>{{$auth.user.name}}</b></span>
                        <b-dropdown id="dropdown-right" right variant="infor" class="m-2">
                            <b-dropdown-item href="#"> <a @click.prevent="logout" type="submit" class="btn btn-primary">Đăng Xuất</a></b-dropdown-item>
                        </b-dropdown>
                </div>
                <p v-if="!$auth.loggedIn">
                    <a href="/login">Login</a>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    setup() {
        
    },
    methods: {
        logout() {
            this.$auth.logout();
            return this.$router.push('/login')
        },
    },
}
</script>
<style scoped>
.menu-head {
    background-color: #fff;
    height: 45px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0, 0, 0, 0.06) 0 2px 4px -1px;
}
</style>