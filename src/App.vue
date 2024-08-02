<script setup lang="ts">
const { locale } = useI18n()

onMounted(() => {
    const storedLocale = localStorage.getItem("locale")
    if(storedLocale){
        locale.value = storedLocale.toString()
    } else {
        localStorage.setItem("locale", locale.value)
    }
})

watch(() => locale.value, (newVal: string) => {
    localStorage.setItem("locale", newVal)
})
</script>

<template>
    <!-- Header must on the top of App.vue -->
    <Header/>
    <Main m-t-35px/>
</template>