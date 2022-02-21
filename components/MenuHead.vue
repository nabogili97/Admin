<template>
    <div class="menu-head ">
        <div class="d-flex justify-content-end pt-2">
            <div class="pr-3 pl-0 ">Xin chào <b>Admin</b></div>
            <div class="pr-4"><font-awesome-icon :icon="['fas', 'angle-down']"  /></div>
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
    background-color: #fff;
    height: 45px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0, 0, 0, 0.06) 0 2px 4px -1px;
}
</style>