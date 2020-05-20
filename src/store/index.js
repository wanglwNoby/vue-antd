import Vue from 'vue'
import Vuex from 'vuex'
import themeModule from './themeModule'
import langModule from './langModule'
import tabModule from './tabModule'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,
    modules: {
        themeStore: themeModule,
        langStore: langModule,
        tabStore: tabModule
    }
})

export default store