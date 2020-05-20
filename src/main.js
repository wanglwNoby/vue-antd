import Vue from 'vue'
import { LocaleProvider, Button, Message, Icon, Form, Input, Modal, Row, Col, ConfigProvider, Layout, Dropdown, Menu, Tabs } from 'ant-design-vue'
import router from './router'
import store from './store/index'
import i18n from './i18n'
import App from './App.vue'

Message.config({
    top: 250,
    duration: 2,
    maxCount: 1
})

Vue.use(LocaleProvider)
Vue.use(Button)
Vue.use(Message)
Vue.use(Icon)
Vue.use(Form)
Vue.use(Input)
Vue.use(Modal)
Vue.use(Row)
Vue.use(Col)
Vue.use(ConfigProvider)
Vue.use(Layout)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Tabs)
Vue.prototype.$message = Message

Vue.config.productionTip = false

import './App.less'

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')
