import axios from '../utils/axios'

// 登录
export function _login(params) {
    return axios.post('/login/logon', params)
}

// 退出登录
export function _logout() {
    return axios.post('/login/logout')
}

// 检查登录，用于模块跳转
export function _check(params) {
    return axios.get('/login/check', params)
}

// 修改密码
export function _changePassword(params) {
    return axios.post('/login/change_password', params)
}

// 切换语言
export function _changeLang(params) {
    return axios.post('/change_lang', params)
}

// 获取支持的语言列表
export function _queryLang() {
    return axios.get('/query_lang')
}

// 获取用户个人参数
export function _userParam() {
    return axios.get('/user_param')
}

// 左侧菜单
export function _menus() {
    return axios.get('/menus')
}

// 切换主题
export function _changeTheme(params) {
    return axios.post('/change_theme', params)
}

// 模块列表
export function _modules() {
    return axios.get('/modules')
}