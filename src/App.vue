<template>
    <div id="app" :class="$style.app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style lang="less" module>
.app {
    height: 100%;
    min-width: 1348px;
    min-height: 632px;
    overflow: hidden;
}
</style>