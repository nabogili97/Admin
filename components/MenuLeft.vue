<template>
    <div class="menu">
        <div class="menu-head">
            <h3 class="text-center p-1 border-bottom text-white">ADMIN</h3>
        </div>
        <div class="menu-list">
            <ul>
                <li>
                    <a href="/">
                        <div class="d-flex">
                            <div class="cate-icon">
                                <font-awesome-icon :icon="['fas', 'home']"  />
                            </div>
                            <div>
                                Tổng quát
                            </div>
                        </div> 
                    </a>
                </li>
                <li>
                    <a href="/brand/">
                        <div class="d-flex">
                            <div class="cate-icon">
                                <font-awesome-icon :icon="['fas', 'clone']"  />
                            </div>
                            <div>
                                 QL Thương hiệu
                            </div>
                        </div> 
                    </a>
                </li>
                <li>
                    <a href="/product/">
                        <div class="d-flex">
                            <div class="cate-icon">
                                <font-awesome-icon :icon="['fas', 'shoe-prints']"  />
                            </div>
                            <div>
                                 QL Sản phẩm
                            </div>
                        </div> 
                    </a>
                </li>
                <li>
                    <a href="/order/">
                        <div class="d-flex">
                            <div class="cate-icon">
                                <font-awesome-icon :icon="['fas', 'book']"  />
                            </div>
                            <div>
                                  QL Đơn hàng
                            </div>
                        </div> 
                    </a>
                </li>
                <li>
                    <a href="/user/">
                        <div class="d-flex">
                            <div class="cate-icon">
                                <font-awesome-icon :icon="['fas', 'users']"  />
                            </div>
                            <div>
                                   QL Thành viên
                            </div>
                        </div> 
                    </a>
                </li>
                <li>
                    <a href="/categories/">
                        <div class="d-flex">
                            <div class="cate-icon">
                                <font-awesome-icon :icon="['fas', 'book']"  />
                            </div>
                            <div>
                                   QL Danh mục
                            </div>
                        </div> 
                    </a>
                </li>
                <li>
                    <a href="/post/">
                        <div class="d-flex">
                            <div class="cate-icon">
                                <font-awesome-icon :icon="['fas', 'book']"  />
                            </div>
                            <div>
                                    QL Bài viết
                            </div>
                        </div> 
                    </a>
                </li>
                <li>
                    <a href="/receipts/">
                        <div class="d-flex">
                            <div class="cate-icon">
                                <font-awesome-icon :icon="['fas', 'book']"  />
                            </div>
                            <div>
                                    Nhập hàng
                            </div>
                        </div> 
                    </a>
                </li>
                <!-- <li><a href="#"><font-awesome-icon :icon="['fas', 'align-left']"  />  Danh mục sản phẩm</a></li> -->
                <!-- <li><a href="/brand/"><font-awesome-icon :icon="['fas', 'clone']"  /> QL Thương hiệu</a></li>
                <li><a href="/product/"><font-awesome-icon :icon="['fas', 'shoe-prints']"  /> QL Sản phẩm</a></li>
                <li><a href="/order/"><font-awesome-icon :icon="['fas', 'book']"  /> QL Đơn hàng</a></li>
                <li><a href="/user/"><font-awesome-icon :icon="['fas', 'users']"  /> QL Thành viên</a></li>
                <li><a href="/categories/"><font-awesome-icon :icon="['fas', 'book']"  /> QL Danh mục</a></li>
                <li><a href="/post/"><font-awesome-icon :icon="['fas', 'book']"  /> QLBài viết</a></li> -->
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

.cate-icon {
    width: 30px;
}
</style>