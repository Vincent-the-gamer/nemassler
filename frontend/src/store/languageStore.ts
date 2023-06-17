import { writable } from "svelte/store";

/**
 * 语言：  zh: 中文， en：英文
 */
export const language = createLanguage("zh")

function createLanguage(initLang){
   // 可写状态
   const { subscribe, set, update } = writable(initLang)

   return {
      subscribe,  // 一定要return，这样才能自动订阅响应式
      set(newVal: string){
         set(newVal)
      }
   }
}
