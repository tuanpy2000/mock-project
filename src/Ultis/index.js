export function checkToken() {
    const token = JSON.parse(localStorage.getItem('token-login'))
    if (token) {
        return true
    }
    return false
}