const SET_THEME = 'SET_THEME'

const themeModule = {
    state: {
        theme: 'dark', // 主题
    },
    getters: {},
    mutations: {
        [SET_THEME](state, theme) {
            state.theme = theme
        }
    },
    actions: {
        setTheme({ commit }, theme) {
            commit(SET_THEME, theme)
        }
    }
}

export default themeModule