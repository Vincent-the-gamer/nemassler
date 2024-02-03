import { addMessages, init, locale } from "svelte-i18n"

import en from "./en.json"
import zh from "./zh.json"

export default function i18n(){
    const storageLocale = localStorage.getItem("initLocale")
    addMessages("zh", zh)
    addMessages("en", en)

    let initialLocale = "en"

    if(storageLocale) {
        initialLocale = storageLocale
    }

    // on locale change
    locale.subscribe(value => {
        localStorage.setItem("initLocale", value!)
    })

    init({
        fallbackLocale: "zh",
        initialLocale
    })
}
