<template>
    <div class="menu">
        <div class="menu-head">
            <h3 class="text-center p-1 border-bottom text-white">ADMIN</h3>
        </div>
        <div class="menu-list">
            <ul>
                <li><a href="/"><font-awesome-icon :icon="['fas', 'home']"  /> Tổng quát</a></li>
                <!-- <li><a href="#"><font-awesome-icon :icon="['fas', 'align-left']"  />  Danh mục sản phẩm</a></li> -->
                <li><a href="/brand/"><font-awesome-icon :icon="['fas', 'clone']"  /> Thương hiệu</a></li>
                <li><a href="/product/"><font-awesome-icon :icon="['fas', 'shoe-prints']"  /> Sản phẩm</a></li>
                <li><a href="/order/"><font-awesome-icon :icon="['fas', 'book']"  /> Đơn hàng</a></li>
                <li><a href="/user/"><font-awesome-icon :icon="['fas', 'users']"  /> Thành viên</a></li>
                <li><a href="/categories/"><font-awesome-icon :icon="['fas', 'book']"  /> Danh mục</a></li>
                <li><a href="/post/"><font-awesome-icon :icon="['fas', 'book']"  />Bài viết</a></li>
            </ul>
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
.menu-head {
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0, 0, 0, 0.06) 0 2px 4px -1px;
}
.menu {
    background-color: #3f4d66;
    min-height: 900px;
    width: 100%;
}

.menu ul li a {
    font-weight: 500;
    font-size: 16px;
    text-decoration: none;
    color: #fff;
}

.menu ul {
 padding: 15px;
}

.menu ul li {
    padding-left: 10px;
    padding-bottom: 15px;
    list-style: none;
}

.menu ul li a:hover {
    color:#fb887b;
}
</style>