<template>
    <a-config-provider :locale="locale">
        <a-layout :class="$style.layout">
            <a-layout-header
                :class="$style.header"
                :style="{color: $store.state.themeStore.theme === 'light' && '#fff'}"
            >
                <img :src="logoUrl" alt="eMP" />
                <div :class="$style.logoTitle">{{ $t('BDN00013001011') }}</div>
                <div :class="$style.headerRight">
                    <a-dropdown placement="bottomCenter">
                        <a-icon :class="$style.icon" type="global" />
                        <a-menu slot="overlay">
                            <a-menu-item v-for="lang in langList" :key="lang.lang_id">
                                <a-icon
                                    type="check"
                                    v-if="$store.state.langStore.lang === lang.lang_id.toString()"
                                />
                                <span @click="handleLangChange(lang.lang_id)">{{ lang.name }}</span>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                    <a-icon :class="$style.icon" type="skin" @click="this.toggleTheme" />
                    <a-icon :class="$style.icon" type="message" />
                    <a-icon :class="$style.icon" type="edit" @click="visible = true" />
                    <a-icon :class="$style.icon" type="user" />
                    <a-icon :class="$style.icon" type="logout" @click="this.logout" />
                </div>
            </a-layout-header>
            <a-layout-content :class="$style.main">
                <div :class="`${$style.menuWrapper} menu`">
                    <div :class="`${$style.menuTitle} menuTitle`">
                        <a-icon type="appstore" />
                        <span :style="{marginLeft: '8px'}">{{ $t('COM10100000010002') }}</span>
                    </div>
                    <a-menu
                        mode="inline"
                        :theme="$store.state.themeStore.theme"
                        :class="$style.menu"
                        :defaultOpenKeys="defaultOpenKeys"
                        @click="addTab"
                    >
                        <template v-for="item in menuData">
                            <left-sub-menu
                                v-if="item.children.length > 0"
                                :key="item.id"
                                :menuData="item"
                            />
                            <a-menu-item v-else :key="item.id">
                                <span>{{item.name}}</span>
                            </a-menu-item>
                        </template>
                    </a-menu>
                </div>
                <a-tabs
                    :class="$style.tabs"
                    hideAdd
                    type="editable-card"
                    :activeKey="$store.state.tabStore.activeID"
                    @change="onTabsChange"
                    @edit="onTabsEdit"
                >
                    <a-tab-pane
                        v-for="item in $store.state.tabStore.tabList"
                        :tab="item.name"
                        :key="item.id"
                    >
                        <roles-manage v-if="item.id === '1021110110100000000'" />
                        <org-user v-if="item.id === '1021110110200000000'" />
                        <domain-manage v-if="item.id === '1021110111100000000'" />
                    </a-tab-pane>
                </a-tabs>
            </a-layout-content>
            <a-layout-footer :class="`${$style.footer} footer`">
                <span>{{ empName }}</span>
                <span>{{ $t('COM10100000010004') }}</span>
                <span>Ver. 2.3.0</span>
            </a-layout-footer>

            <draggable-modal
                :visible="visible"
                :title="$t('COM10100000040004')"
                :width="600"
                :onOk="handleOk"
                :onCancel="() => {visible = false}"
            >
                <a-row>
                    <a-col :span="8">{{ $t('COM10100000040001') }}</a-col>
                    <a-col :span="16">
                        <a-input-password v-model="oldPassword" />
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="8">{{ $t('COM10100000040002') }}</a-col>
                    <a-col :span="16">
                        <a-input-password v-model="newPasswordOnce" />
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="8">{{ $t('COM10100000040003') }}</a-col>
                    <a-col :span="16">
                        <a-input-password v-model="newPasswordTwice" />
                    </a-col>
                </a-row>
            </draggable-modal>
        </a-layout>
    </a-config-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import zhTW from "ant-design-vue/lib/locale-provider/zh_TW";
import enUS from "ant-design-vue/lib/locale-provider/en_US";
import moment from "moment";
import "moment/locale/zh-cn";
import "moment/locale/zh-tw";
import "moment/locale/en-gb";
import DraggableModal from "../../components/DraggableModal";
import LeftSubMenu from "../../components/LeftSubMenu";
import {
    _userParam,
    _queryLang,
    _changeLang,
    _changeTheme,
    _logout,
    _menus,
    _changePassword
} from "../../apis/global";

const RolesManage = () => import("../roles-manage/rolesManage");
const OrgUser = () => import("../org-user/orgUser");
const DomainManage = () => import("../domain-manage/domainManage");

export default {
    name: "Home",
    components: {
        DraggableModal,
        LeftSubMenu,
        RolesManage,
        OrgUser,
        DomainManage
    },
    data() {
        return {
            empName: `${
                JSON.parse(sessionStorage.getItem("empBasic")).full_name
            }( ${JSON.parse(sessionStorage.getItem("empBasic")).account} )`,
            logoUrl: require("../../assets/logo.png"),
            locale: enUS,
            langList: [],
            menuData: [],
            visible: false,
            oldPassword: "",
            newPasswordOnce: "",
            newPasswordTwice: "",
            defaultOpenKeys: []
        };
    },
    created() {},
    mounted() {
        this.getLangList();
        this.getUserParam();
        this.getMenuData();
    },
    methods: {
        async getMenuData() {
            const res = await _menus();
            if (res && res.result) {
                this.$store.dispatch("setDefaultTab", {
                    id: "1021110110100000000",
                    name: this.$t("FO1021110110100000000")
                });
                this.menuData = res.data;
                this.getDefaultOpenKeys(res.data);
            }
        },
        async getLangList() {
            const res = await _queryLang();
            this.langList = res.data;
        },
        async getUserParam() {
            const res = await _userParam();
            if (res && res.result) {
                res.data.forEach(item => {
                    if (item.param_id === "903010101") {
                        this.$store.dispatch("setLang", item.value);
                        this.initLanguage(item.value);
                    }
                    if (item.param_id === "903010102") {
                        switch (item.value) {
                            case "S1":
                                this.changeTolight();
                                break;
                            case "S2":
                                this.changeToDark();
                                break;
                            default:
                                this.changeToDark();
                                break;
                        }
                    }
                });
            }
        },
        // 初始化语言
        initLanguage(lang) {
            switch (lang) {
                case "2052":
                    this.$i18n.locale = "zh-CN";
                    moment.locale("zh-cn");
                    this.locale = zhCN;
                    break;
                case "1028":
                    this.$i18n.locale = "zh-TW";
                    moment.locale("zh-tw");
                    this.locale = zhTW;
                    break;
                case "1033":
                    this.$i18n.locale = "en-US";
                    moment.locale("en-gb");
                    this.locale = enUS;
                    break;
                default:
                    this.$i18n.locale = "en-US";
                    moment.locale("en-gb");
                    this.locale = enUS;
                    break;
            }
        },
        // 浅色主题
        changeTolight() {
            window.less
                .modifyVars({})
                .then(() => {
                    this.$store.dispatch("setTheme", "light");
                })
                .catch(error => {
                    this.$message.error(error);
                });
        },
        // 深色主题
        changeToDark() {
            const blackTheme = {
                "@layout-header-background": "#001529",
                "@layout-body-background": "#44515F",
                "@heading-color": "fade(@white, 85%)",
                "@text-color": "fade(@white, 65%)",
                "@text-color-secondary": "fade(@white, 45%)",
                "@table-header-background": "#1d2935",
                "@table-body-background": "#2C3E50",
                "@menu-background": "#2c3e50",
                "@tabs-background": "#273646",
                "@line-color": "#001529"
            };
            window.less
                .modifyVars(blackTheme)
                .then(() => {
                    this.$store.dispatch("setTheme", "dark");
                })
                .catch(error => {
                    this.$message.error(error);
                });
        },
        // 切换语言
        handleLangChange(langID) {
            _changeLang({
                lang_id: langID.toString()
            }).then(res => {
                if (res && res.result) {
                    window.location.reload();
                }
            });
        },
        // 切换主题
        toggleTheme() {
            console.log(this.$store.state.themeStore.theme);
            switch (this.$store.state.themeStore.theme) {
                case "light":
                    _changeTheme({ theme_name: "S2" });
                    this.changeToDark();
                    break;
                case "dark":
                    _changeTheme({ theme_name: "S1" });
                    this.changeTolight();
                    break;
                default:
                    break;
            }
        },
        // 退出登录
        async logout() {
            const res = await _logout();
            if (res && res.result) {
                sessionStorage.removeItem("empBasic");
                this.$router.replace("/login");
            }
        },
        handleOk() {
            if (this.newPasswordOnce !== this.newPasswordTwice) {
                this.$message.error(this.$t("COM00200000010001"));
                return;
            }
            this.changePassword();
        },
        async changePassword() {
            const res = await _changePassword({
                type: "not",
                oldpassword: window.btoa(this.state.oldPassword),
                newpassword: window.btoa(this.state.newPasswordOnce)
            });
            this.visible = false;
            if (res && res.result) {
                this.$message.success(this.$t("SUC10100000020001"));
                sessionStorage.removeItem("empBasic");
                this.$router.replace("/login");
            } else {
                this.$message.error(res.msg);
            }
        },
        // 获取默认展开key
        getDefaultOpenKeys(data) {
            data.forEach(item => {
                if (item.show) {
                    this.defaultOpenKeys.push(item.id);
                }
                if (item.children.length > 0) {
                    this.getDefaultOpenKeys(item.children);
                }
            });
        },
        // 点击菜单menu，添加tab
        addTab(item) {
            this.$store.dispatch("addTab", {
                id: item.key,
                name: item.item.title
            });
        },
        // tabs切换
        onTabsChange(activeKey) {
            this.$store.dispatch("changeTab", activeKey);
        },
        onTabsEdit(targetKey, action) {
            if (action === "remove") {
                this.$store.dispatch("deleteTab", targetKey);
            }
        }
    }
};
</script>

<style lang="less" module>
@import "./home.less";
</style>