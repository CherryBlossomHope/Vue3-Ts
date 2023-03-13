import { onMounted, onUnmounted } from 'vue';
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