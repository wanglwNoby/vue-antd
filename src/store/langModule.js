const SET_LANG = 'SET_LANG'

const langModule = {
    state: {
        lang: '1033', // 语言包
    },
    getters: {},
    mutations: {
        [SET_LANG](state, lang) {
            state.lang = lang
        }
    },
    actions: {
        setLang({ commit }, lang) {
            commit(SET_LANG, lang)
        }
    }
}

export default langModule