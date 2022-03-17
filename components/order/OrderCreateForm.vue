<template>
    <div class="">
        <form class="p-3">
            <p v-if="error.length > 0">
                <ul>
                    <li class="text-danger" v-for="(aleft, index) in error" :key="index">{{ aleft }}</li>
                </ul>
            </p>
            <div class="form-group row" hidden>
                <div class="col-sm-9" >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Giày sneaker"
                        v-model="order.user_id"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Tên : </label>
                <div class="col-sm-9" >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Giày sneaker"
                        v-model="order.name"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Địa chỉ : </label>
                <div class="col-sm-9" >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Giày sneaker"
                        v-model="order.address"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Điện thoại : </label>
                <div class="col-sm-9" >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Giày sneaker"
                        v-model="order.phone"
                    >
                </div>
            </div>
            <div class="form-group row" hidden>
                <div class="col-sm-9" >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Giày sneaker"
                        v-model="order.order_details"
                    >
                </div>
            </div>
            <div class="form-group row" hidden>
                <div class="col-sm-9" >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Giày sneaker"
                        v-model="order.amount"
                    >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-3 col-form-label">Trạng thái : </label>
                <div class="col-sm-9">
                    <select v-model="order.status" class="custom-select custom-select-sm">
                        <option value="0"> Đang xử lý</option>
                        <option value="1"> Đã xác nhận</option>
                        <option value="2"> Đang giao hàng</option>
                        <option value="3"> Đã nhận hàng</option>
                        <option value="4"> Hoàn hàng</option>
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
    props:["order", "edit"],
    data() {
        return {
            error: [],
            orderId: this.$route.params.edit,
            id: this.$route.params.id,
        }
    },
    methods: {
        async submitData() {
            this.error = [];

            if (!this.order.address) {
                this.error.push("Địa chỉ không được để trống");
            }

            if (!this.order.name) {
                this.error.push("Tên người nhận không được để trống");
            }

            if (!this.order.phone) {
                this.error.push("Điện thoại không được để trống");
            }

            if (!this.order.status) {
                this.error.push("Trạng thái không được để trống");
            }

            if (!this.error.length) {
                if (this.id) {
                    await this.$axios.$put('http://127.0.0.1:8000/api/payment/update/' + this.id, this.order)
                    return this.$router.push('/order')
                }
            }  
        },

        cancel() {
           return this.$router.push('/order')
        },
    },

    
}
</script>