<script setup lang="ts">
const router = useRouter()

function toRoute(route: string) {
    router.push(route)
}

function activeStyle(route: string) {
    return route === router.currentRoute.value.fullPath ? "color-deeppink" : ""
}
</script>

<template>
    <main flex="~ justify-center">
        <div absolute left-0 top-7 w-13 h-full class="bg-#00dc82" >
            <div flex="~ flex-col justify-center">
                <p absolute @click="() => toRoute('/')">
                    <div i-heroicons-musical-note-solid icon 
                         :title="$t('audio-converter')"
                         :class="activeStyle('/')"
                    />
                </p>
                <p absolute top-12 @click="() => toRoute('/bpmDetect')">
                    <div i-heroicons-rectangle-stack-20-solid 
                       icon 
                         :title="$t('bpm-detect')"
                         :class="activeStyle('/bpmDetect')"
                    />
                </p>
                <p absolute bottom-4 @click="() => toRoute('/options')">
                    <div i-material-symbols-light-settings-outline 
                       icon 
                         :title="$t('options')"
                         :class="activeStyle('/options')"
                    />
                </p>
            </div>
        </div>
        <div>
            <RouterView/>
        </div>
    </main>
</template>