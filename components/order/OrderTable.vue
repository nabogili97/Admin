<template>
    <div>
        <div class="card mb-5 form-search">
            <div class="form-title pb-3 card-header">
                <b>TÌM KIẾM THÔNG TIN</b>
            </div>  
            <div class="card-body">
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Tên</label>
                            <input type="email" class="form-control"  placeholder="Tên">
                        </div>
                        <div class="form-group col-md-6">
                            <label >Số điện thoại</label>
                            <input type="text" class="form-control" placeholder="">
                        </div>
                        <div class="form-group col-md-6">
                            <label >Địa chỉ</label>
                            <input type="text" class="form-control" placeholder="">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Tìm kiếm</button>
                    </form>
            </div>
        </div>
        <div class="product-create d-flex justify-content-end mb-3">
            <div>
                <b-button v-b-modal.modal-2 variant="btn btn-primary btn-sm">+ Thêm mới</b-button>

                <b-modal id="modal-1" title="Thêm sản phẩm">
                    <form class="p-3">
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-3 col-form-label">Tên : </label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control"  placeholder="Air Jordan ....">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-3 col-form-label">Giá: </label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control"  placeholder="15000000">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-3 col-form-label">Số lượng : </label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control"  placeholder="99">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-3 col-form-label">Ảnh : </label>
                            <div class="col-sm-9">
                                <input type="file" class="form-control"  placeholder="99">
                            </div>
                        </div>
                    </form>
                </b-modal>
            </div> 
        </div>
        <div class="product-list">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên KH</th>
                        <th scope="col">SĐT </th>
                        <th scope="col">Sản phẩm</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col" class="text-right pr-5">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in orders" :key="key">
                        <th scope="row">{{key+1}}</th>
                        <td>{{item.name}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.product}}</td>
                        <td>{{item.total}}</td>
                        <td>{{item.address}}</td>
                        <td class="operation text-right">
                            <a href="#">
                                <font-awesome-icon :icon="['fas', 'edit']"  /> 
                                Sửa
                            </a> |
                            <a href="#">
                                <font-awesome-icon :icon="['fas', 'trash-alt']"  /> 
                                Xóa
                            </a>
                        </td>
                    </tr>
                </tbody>
                </table>
        </div>
    </div>
</template>
<script>
export default {
    props: ['orders'],
    data() {
        return {
            modal: false
        }
    },
    methods: {
        toggleModal() {
            this.modal = !this.modal;
        }
    }
}
</script>
<style scoped>
.product-img img {
    width: 100px;
    height: auto;
    object-fit: cover;
}

a {
    text-decoration: none;
}

.operation a:hover {
    color: red;
}
</style>