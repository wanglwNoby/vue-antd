import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import { _queryLang } from "./apis/global"

Vue.use(VueI18n)

_queryLang().then((res) => {
    if (res && res.result) {
        res.data.forEach((item) => {
            axios.get(`/api/${item.lang_id}.js`).then((response) => {
                i18n.setLocaleMessage(item.culture, response.data)
            })
        })
    }
})

const i18n = new VueI18n({
    locale: navigator.language || 'en-US',
    messages: {},
    silentTranslationWarn: true
})

export default i18n