<script setup lang="ts">
interface BPMResult {
    songName: string,
    bpm: number
}

const { open, reset, onChange } = useFileDialog({
    type: "audio/mpeg"
})

const fileList = ref<FileList>([])
const resultList = ref<BPMResult[]>([])

const showTag = ref<number>(1)

onChange((files: any) => {
   fileList.value = files || []
   resultList.value = []
})

function getRandomColor(){
    const colors = ["red", "cyan", "deeppink", "yellow", "orange"]
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve) => {
        let reader = new FileReader()
        reader.onload = (result: any) => {
            resolve(result.target.result)
        }
        reader.readAsArrayBuffer(file)
    })
}


function calculateBPM() {
    Array.from(fileList.value).forEach(async (file: any) => {
        const name = file.name
        const arrayBuffer = await fileToArrayBuffer(file)
        const audioContext = new AudioContext()
        audioContext.decodeAudioData(arrayBuffer, (audioBuffer: AudioBuffer) => {
            const bpm = (detectBPM(audioBuffer) as any) * 1
            resultList.value.push({
                songName: name,
                bpm
            })
        })
    });

    showTag.value = 2
}
</script>

<template>
    <h1 page-title>{{ $t("bpm-detect") }}</h1>
    <div flex="~ justify-center items-center wrap col">
        <p m-1>
            <span>{{ $t("select-audio") }}: </span>
            <span m="inline-5px">
                <button button @click="open">{{ $t("choose-audio-files") }}</button>
            </span>
            <span m="inline-5px">
                <button button bg-red @click="reset">{{ $t("reset") }}</button>
            </span>
        </p>
        <p m-5>
            <button button bg-blue @click="calculateBPM" :disabled="fileList.length < 1">{{ $t("calculate-bpm") }}</button>
        </p>
        <p m-4>
            <span tag @click="showTag = 1" :class="showTag === 1 && 'bg-pink'">{{ $t("selected-files") }}</span>
            <span tag @click="showTag = 2" :class="showTag === 2 && 'bg-pink'">{{ $t("results") }}</span>
        </p>
        <p m-1 flex="~ wrap col justify-center items-center">
            <template v-if="showTag === 1">
                <h1>{{ $t("selected-files") }}:</h1>
                <template v-if="fileList.length > 0">
                    <p m-1>{{ $t("you-have-selected") }} <b>{{ fileList.length }} {{ $t("file") }}</b>.</p>
                    <p m-1 v-for="file of fileList">
                        <span :style="{ color: getRandomColor() }">{{ file.name }}</span>
                    </p>
                </template>
                <template v-else>
                    <p m-1>{{ $t("nothing") }}</p>
                </template>
            </template> 
        
            <div v-else>
                <h1 m="t-4 auto" w-fit>{{ $t("results") }}: </h1>
                <template v-if="resultList.length > 0">
                    <p m-2 flex="~ col wrap justify-center items-center"
                       v-for="result of resultList" 
                       :style="{ color: getRandomColor() }">
                        <p m-0>{{ $t("song-name") }}: {{ result.songName }}</p>
                        <p m-0>{{ $t("bpm") }}: {{ result.bpm }}</p>
                    </p>
                </template>
                <template v-else>
                    <p m-4 flex="~ col wrap justify-center items-center">{{ $t("nothing") }}</p>
                </template>
            </div>
        </p>
    </div>
</template>