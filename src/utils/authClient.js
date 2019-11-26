const localStorageKey = '__token__'

const APP_API_URL = 'http://localhost:3333'
function client(endpoint, { body, ...customConfig } = {}) {
    const token = window.localStorage.getItem(localStorageKey)
    const headers = { 'content-type': 'application/json' }

    if (token) {
        headers.Authorization = 'Bearer ' + token
    }

    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    }

    if (body) {
        config.body = JSON.stringify(body)
    }

    return window.fetch(APP_API_URL + '/' + endpoint, config).then(r => r.json())
}

function login(loginData) {
    return client('login', { body: loginData })
}

function logout() {
    window.localStorage.removeItem(localStorageKey)
    return Promise.resolve()
}

export default { login, logout }
