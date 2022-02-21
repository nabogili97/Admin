<template>
    <div class="dasboard">
        <div class="row">
            <div class="col-xl-3 col-md-6">
                <div class="card product-card">
                    <div class="card-block">
                        <div class="row">
                            <div class="col-8">
                                <h3>199</h3>
                                <h5>Sản phẩm</h5>
                            </div>
                            <div class="col-4 das-icon">
                                <font-awesome-icon :icon="['fas', 'shoe-prints']"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card order-card">
                    <div class="card-block">
                        <div class="row">
                            <div class="col-8">
                                <h3>250</h3>
                                <h5>Đơn hàng</h5>
                            </div>
                            <div class="col-4 das-icon">
                                <font-awesome-icon :icon="['fas', 'file-invoice']"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card brand-card">
                    <div class="card-block">
                        <div class="row">
                            <div class="col-8">
                                <h3>6</h3>
                                <h5>Thương hiệu</h5>
                            </div>
                            <div class="col-4 das-icon">
                                <font-awesome-icon :icon="['fas', 'copyright']"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card user-card">
                    <div class="card-block">
                        <div class="row">
                            <div class="col-8">
                                <h3>99</h3>
                                <h5>Người dùng</h5>
                            </div>
                            <div class="col-4 das-icon">
                                <font-awesome-icon :icon="['fas', 'users']"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    setup() {
        
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
</style>