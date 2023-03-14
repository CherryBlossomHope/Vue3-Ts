import { onMounted, onUnmounted } from 'vue';
/**
 * 
 * @param {Function} callBack 事件回调函数
 * @param {string} key 键盘按键 &Enter
 */
export function useKeyboardEvents(callBack: Function, key: string) {
    onMounted(() => {
        window.addEventListener("keydown", keydown);
    })
    const keydown = (e: KeyboardEvent) => {
        if (e.key == key) {
            callBack()
        }
    }
    onUnmounted(() => {
        window.removeEventListener("keydown", keydown, false);
    });
}