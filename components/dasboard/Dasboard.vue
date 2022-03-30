<template>
    <div class="dasboard">
        <div class="row">
            <div class="col-xl-6 col-md-6">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card product-card">
                            <div class="card-block">
                                <div class="row">
                                    <div class="col-8">
                                        <h3>{{this.productTotal.length}}</h3>
                                        <h5>Sản phẩm</h5>
                                    </div>
                                    <div class="col-4 das-icon">
                                        <font-awesome-icon :icon="['fas', 'shoe-prints']"  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6">
                        <div class="card order-card">
                            <div class="card-block">
                                <div class="row">
                                    <div class="col-8">
                                        <h3>{{this.orderTotal.length}}</h3>
                                        <h5>Đơn hàng</h5>
                                    </div>
                                    <div class="col-4 das-icon">
                                        <font-awesome-icon :icon="['fas', 'file-invoice']"  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6 mt-4">
                        <div class="card brand-card">
                            <div class="card-block">
                                <div class="row">
                                    <div class="col-8">
                                        <h3>{{this.postTotal.length}}</h3>
                                        <h5>Bài viết</h5>
                                    </div>
                                    <div class="col-4 das-icon">
                                        <font-awesome-icon :icon="['fas', 'copyright']"  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6 mt-4">
                        <div class="card user-card">
                            <div class="card-block">
                                <div class="row">
                                    <div class="col-8">
                                        <h3>{{this.userTotal.length}}</h3>
                                        <h5>Người dùng</h5>
                                    </div>
                                    <div class="col-4 das-icon">
                                        <font-awesome-icon :icon="['fas', 'users']"  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-12 col-md-12 mt-4">
                        <div class="card money-card">
                            <div class="card-block">
                                <div class="row">
                                    <div class="col-8">
                                        <h3>{{formatPrice(this.amount)}} VNĐ</h3>
                                        <h5>Tổng doanh thu</h5>
                                    </div>
                                    <div class="col-4 das-icon">
                                        <font-awesome-icon :icon="['fas', 'coins']"  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-md-7">
               <BarChart :data="data" />
               <div class="text-dark text-center mt-2">
                   <b>Biểu đồ trạng thái đơn hàng</b>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
import BarChart from './PieChart'
export default {
    components:{BarChart},
    data() {
        return {
            userTotal:'',
            productTotal:'',
            brandTotal:'',
            orderTotal:'',
            postTotal:'',
            amount:'',
            data:[]
        }
    },

    created() {
        this.fetchProducts();
        this.fetchUsers();
        this.fetchBrands();
        this.fetchOrders();
        this.fetchPosts();
        this.fetchAmount()
    },

    async fetch() {
            this.data = await fetch(
            'http://127.0.0.1:8000/api/orderStatus'
            ).then(res => res.json())
        },

    methods: {
        fetchProducts() {
            this.$axios.$get('http://127.0.0.1:8000/api/product/listProduct/')
                    .then(res => {
                    this.productTotal = res.data;
                })
        },

        fetchUsers() {
            this.$axios.$get('http://127.0.0.1:8000/api/users')
                    .then(res => {
                    this.userTotal = res.data;
            })
        },

        fetchBrands() {
            this.$axios.$get('http://127.0.0.1:8000/api/brands')
                    .then(res => {
                    this.brandTotal = res.data;
            })
        },

        fetchOrders() {
            this.$axios.$get('http://127.0.0.1:8000/api/orderList')
                    .then(res => {
                    this.orderTotal = res.data;
            })
        },

        fetchPosts() {
            this.$axios.$get('http://127.0.0.1:8000/api/posts')
                    .then(res => {
                    this.postTotal = res.data;
            })
        },

        fetchAmount() {
            this.$axios.$get('http://127.0.0.1:8000/api/amout-list')
                    .then(res => {
                    this.amount = res;
            })
        },

        formatPrice(value) {
            const val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    },
}
</script>
<style scoped>
.dasboard {
    color: white;
}
.product-card {
    background: linear-gradient(to right, #fe9365, #feb798);
}

.card-block {
  padding: 1.25rem;
}

.order-card {
    background: linear-gradient(to right, #0ac282, #0df3a3);
}

.brand-card {
    background: linear-gradient(to right, #fe5d70, #fe909d);
}

.user-card {
    background: linear-gradient(to right, #01a9ac, #01dbdf);
}

.das-icon {
    font-size: 40px;
}

.card {
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px 0, rgba(0, 0, 0, 0.1) 0 0 1px 0;
}

.money-card {
    background: linear-gradient(to right, #009FFF, #ec2F4B);
}
</style>