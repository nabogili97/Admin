<template>
    <div class="form-search">
        <div class="form-title pb-3">
            <span>TÌM KIẾM THÔNG TIN</span>
        </div>  
        <div>
            <form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <input 
                            type="text"
                            class="form-control"
                            placeholder="Hãy nhập tên..."
                            v-model="name"
                        >
                    </div>
                    <div class="form-group col-md-6">
                        <input 
                            type="text"
                            class="form-control"
                            placeholder="Hãy nhập email..."
                            v-model="email"
                        >
                    </div>
                    <div class="form-group col-md-6">
                        <input 
                            type="text"
                            class="form-control"
                            placeholder="Hãy nhập địa chỉ..."
                            v-model="address"
                        >
                    </div>
                    <div class="form-group col-md-6">
                        <input 
                            type="text"
                            class="form-control"
                            placeholder="Hãy nhập địa chỉ..."
                            v-model="phone"
                        >
                    </div>
                    <div class="col-md-3">
                        <button type="button" class="btn btn-primary"  @click="searchUser" >Tìm kiếm</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: '',
            phone: '',
            email:'',
            address: '',
            listSearch:''
        }
  },

  computed: {
      condition () {
      const condition = {}

      if (this.name) {
        condition.name = this.name
      }

      if (this.email) {
        condition.email = this.email
      }

      if (this.phone) {
        condition.phone = this.phone
      }

      if (this.address) {
        condition.address = this.address
      }

      return condition
    }
  },

  methods: {
    searchUser() {
        this.$emit("name",this.name);
        this.$emit("phone",this.phone);
        this.$emit("email",this.email);
        this.$emit("address",this.address);
    },
  }
}
</script>