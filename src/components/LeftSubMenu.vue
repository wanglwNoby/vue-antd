<template functional>
    <a-sub-menu :key="props.menuData.id">
        <span slot="title">
            <a-icon v-if="props.menuData.id === '1021110110000000000'" type="sliders" />
            <a-icon v-if="props.menuData.id === '1021110110100000000'" type="team" />
            <a-icon v-if="props.menuData.id === '1021110111100000000'" type="environment" />
            <a-icon v-if="props.menuData.id === '1021110110200000000'" type="bank" />
            <a-icon v-if="props.menuData.id === '1021110110300000000'" type="safety-certificate" />
            <span>{{ props.menuData.name }}</span>
        </span>
        <template v-for="item in props.menuData.children">
            <left-sub-menu v-if="item.children.length > 0" :key="item.id" :menuData="item" />
            <a-menu-item v-else :key="item.id" :title="item.name">
                <a-icon v-if="item.id === '1021110110000000000'" type="sliders" />
                <a-icon v-if="item.id === '1021110110100000000'" type="team" />
                <a-icon v-if="item.id === '1021110111100000000'" type="environment" />
                <a-icon v-if="item.id === '1021110110200000000'" type="bank" />
                <a-icon v-if="item.id === '1021110110300000000'" type="safety-certificate" />
                <span>{{ item.name }}</span>
            </a-menu-item>
        </template>
    </a-sub-menu>
</template>

<script>
export default {
    name: "LeftSubMenu",
    props: ["menuData"]
};
</script>