const SET_DEFAULT_TAB = 'SET_DEFAULT_TAB'
const ADD_TAB = 'ADD_TAB'
const CHANGE_TAB = 'CHANGE_TAB'
const DELETE_TAB = 'DELETE_TAB'

const tabModule = {
    state: {
        tabList: [], // tab列表
        activeID: '' // 选中tab的ID
    },
    getters: {},
    mutations: {
        [SET_DEFAULT_TAB](state, tab) {
            state.tabList = [{ id: tab.id, name: tab.name, active: true }]
            state.activeID = tab.id
        },
        [ADD_TAB](state, tab) {
            state.tabList.forEach(item => {
                item.active = false
            })
            const index = state.tabList.findIndex(item => item.id === tab.id)
            if (index > -1) {
                state.tabList[index].active = true
                state.activeID = tab.id
            } else {
                state.tabList.push({ id: tab.id, name: tab.name, active: true })
                state.activeID = tab.id
            }
        },
        [CHANGE_TAB](state, id) {
            state.tabList.forEach(item => {
                item.active = (item.id === id)
            })
            state.activeID = id
        },
        [DELETE_TAB](state, id) {
            if (state.tabList.length > 1) {
                const index = state.tabList.findIndex(item => item.id === id)
                if (state.tabList[index].active) {
                    if (index === 0) {
                        state.tabList[index + 1].active = true
                        state.activeID = state.tabList[index + 1].id
                    } else {
                        state.tabList[index - 1].active = true
                        state.activeID = state.tabList[index - 1].id
                    }
                }
                state.tabList.splice(index, 1)
            }
        }
    },
    actions: {
        setDefaultTab({ commit }, { id, name }) {
            commit(SET_DEFAULT_TAB, { id, name })
        },
        addTab({ commit }, { id, name }) {
            commit(ADD_TAB, { id, name })
        },
        changeTab({ commit }, id) {
            commit(CHANGE_TAB, id)
        },
        deleteTab({ commit }, id) {
            commit(DELETE_TAB, id)
        }
    }
}

export default tabModule