<template>
  <div class="container-fulid dasboard">
    <div class="row">
      <div class="col-md-2 pr-0">
        <MenuLeft />
      </div>
      <div class="col-md-10 pl-0">
        <div>
          <MenuHead />
        </div>
        <div class="pl-5 pr-5 pt-5 pb-0">
          <order-table :orders="orders" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MenuLeft from '../../components/MenuLeft.vue'
import MenuHead from '../../components/MenuHead.vue'
import OrderTable from '../../components/order/OrderTable.vue'
export default {
  components: { MenuHead, MenuLeft, OrderTable },
    data() {
        return {
            orders: [
               {id:"1", name:"Ngô Thế Cường", phone:"0326966656", total:"15000000", product:"Air Jordan 1", address:"Tổ 5, Quang Minh, Mê Linh, Hà Nội"},
               {id:"2", name:"Đào Văn báu", phone:"0326966656", total:"7500000", product:"Balenciaga", address:"Tân Hội, Đan Phượng, Hà Nội"},
            ]
        }
    }
}
</script>