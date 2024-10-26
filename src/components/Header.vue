<script setup lang="ts">
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
import Minimize from "~/assets/images/minimize.svg"
import Maximize from "~/assets/images/maximize.svg"
import Close from "~/assets/images/close.svg"

const appWindow = getCurrentWebviewWindow()

onMounted(() => {
    document
        .getElementById('titlebar-minimize')!
        .addEventListener('click', () => appWindow.minimize())
    document
        .getElementById('titlebar-maximize')!
        .addEventListener('click', () => appWindow.toggleMaximize())
    document
        .getElementById('titlebar-close')!
        .addEventListener('click', () => appWindow.close())
})

const { width, height } = useWindowSize()
</script>

<template>
    <div data-tauri-drag-region titlebar>
        <h3 w-fit m="0 auto" translate-x-12 color-black>Nemassler - {{ width }} * {{ height }}</h3>
        <div titlebar-button id="titlebar-minimize">
            <img :src="Minimize" alt="minimize" />
        </div>
        <div titlebar-button id="titlebar-maximize">
            <img :src="Maximize" alt="maximize" />
        </div>
        <div titlebar-button id="titlebar-close">
            <img :src="Close" alt="close" />
        </div>
    </div>
</template>