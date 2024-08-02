import { createI18n } from "vue-i18n"

// English
import EN from "./en/en.json"
import ZH_HANS from "./zh-hans/zh-hans.json"


const messages = {
    zh_hans: {
        ...ZH_HANS,
    },
    en: {
        ...EN,
    }
}

const i18n = createI18n({
    locale: "en",
    legacy: false, // 如果要支持Composition API，此项必须false
    globalInjection: true, // 全局注册$t方法
    messages
})

export default i18n