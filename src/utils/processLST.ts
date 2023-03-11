class processLST {
    set(key: string, value: any) {
        const jsonVal = JSON.stringify(value)
        localStorage.setItem(key, jsonVal)
    }
    get(key: string) {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key) as string)
        } else {
            return false
        }

    }
}
export default new processLST()