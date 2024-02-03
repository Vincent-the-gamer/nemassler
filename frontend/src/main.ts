import './App.styl'
import App from './App.svelte'
import i18n from "@/i18n"

i18n()

const app = new App({
  target: document.getElementById('app'),
})


export default app
