<script lang="ts">
    import {
        getNcmDir,
        getMp3OutDir,
        getSongCoverOutDir,
    } from "@/utils/initDirectories";
    import axios from "@/utils/axios";
    import { onMount } from "svelte";
    import { detectBPM } from "@vincent-the-gamer/utils/client";
    import judgePath from "@/utils/judgePath";
    import { link } from "svelte-spa-router";
    import { _, locale } from "svelte-i18n"
    import { get } from "svelte/store";

    /**
     * state
     */
    let mp3FileName: string = "";
    let ncmDir: string = getNcmDir() as string;
    let mp3OutDir: string = getMp3OutDir() as string;
    let songCoverOutDir: string = getSongCoverOutDir() as string;
    let msgZh: string = "↑ 点击";
    let msgEn: string = "↑ Click";
    let files: string[] = [];
    let bpm: number = 0;

    /**
     * Lifecycle: init
     */
    onMount(async () => {
        await loadMp3Files();
    });

    /**
     * functions
     */
    async function loadMp3Files() {
        return axios
            .get(
                `/readFiles?mp3Dir=${mp3OutDir}&ncmDir=${ncmDir}&songCoverDir=${songCoverOutDir}`,
            )
            .then(({ data }) => {
                files = data.files;
                mp3FileName = files[0];
            })
            .catch((err) => {
                msgZh = "ncm2mp3方法请求错误";
                msgEn = "ncm2mp3 Request Error!";
                setTimeout(() => {
                    msgZh = "↑ 点击";
                    msgEn = "↑ Click";
                }, 2000);
            });
    }

    function customNcm2mp3() {
        // check input path
        if (
            !judgePath(ncmDir) ||
            !judgePath(mp3OutDir) ||
            !judgePath(songCoverOutDir)
        ) {
            msgZh = "路径格式错误！";
            msgEn = "Path format error!";
            setTimeout(() => {
                msgZh = "↑ 点击";
                msgEn = "↑ Click";
            }, 2000);
            return;
        }
        axios({
            url: "/customNcm2mp3",
            method: "post",
            data: {
                ncmDir,
                mp3OutDir,
                songCoverOutDir,
            },
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(({ data }) => {
                const result = data;
                if (result.code === 500) {
                    // @ts-ignore
                    this.message = result.err;
                } else {
                    localStorage.setItem("ncmDir", ncmDir);
                    localStorage.setItem("mp3OutDir", mp3OutDir);
                    localStorage.setItem("songCoverOutDir", songCoverOutDir);
                    msgEn = result.msgEn;
                    msgZh = result.msgZh;
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
                setTimeout(() => {
                    msgZh = "↑ 点击";
                    msgEn = "↑ Click";
                }, 2000);
            })
            .catch((err) => {
                msgZh = "ncm2mp3方法请求错误";
                msgEn = "ncm2mp3 Request Error!";
                setTimeout(() => {
                    msgZh = "↑ 点击";
                    msgEn = "↑ Click";
                }, 2000);
            });
    }

    function calcBPM() {
        // @ts-ignore
        const AudioContext: any = window.AudioContext || window.webkitAudioContext;
        const context = new AudioContext();
        // Fetch audio file
        axios({
            url: `/getMp3File?filePath=${mp3OutDir}/${mp3FileName}`,
            method: "get",
            responseType: "arraybuffer",
        })
            .then(async (res) => {
                // Get response as ArrayBuffer
                const buffer = res.data;
                // Decode audio into an AudioBuffer
                const data: AudioBuffer = await new Promise(function (
                    resolve,
                    reject,
                ) {
                    context.decodeAudioData(buffer, resolve, reject);
                });

                // Run detection
                bpm = (detectBPM(data) as any) * 1;
            })
            .catch(console.error);
    }

    // filter mp3
    function filterMp3() {
        axios
            .post("/filterMp3", {
                directory: mp3OutDir,
            })
            .then((res) => {
                msgEn = res.data;
                msgZh = res.data;
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            });
    }
</script>

<div class="container">
    <p class="other-func">
        {$_("other-func")}： <a class="route" href="/meizi" use:link>{$_("anime-pics")}</a>
    </p>
    <h1>{$_("ncm2mp3")}</h1>
    <h2>{$_("description")}</h2>
    <div class="center">
        <p>
            {$_("ncmInput")}:
            <input type="text" bind:value={ncmDir} />
        </p>
        <p>
            {$_("mp3Output")}:
            <input type="text" bind:value={mp3OutDir} />
        </p>
        <p>
            {$_("songcoverOutput")}:
            <input type="text" bind:value={songCoverOutDir} />
        </p>
        <p>
            <button on:click={customNcm2mp3}>{$_("convertAll")}</button>
            <button style="width: fit-content;" on:click={filterMp3}
                >{$_("filterNonMp3")}
            </button>
        </p>
    </div>
    <h3>{ get(locale) === "zh" ? msgZh : msgEn}</h3>
    <hr />
    <h1>{$_("calcBPM")}</h1>
    <h2>{$_("bpmDescription")}</h2>
    <div class="center">
        {#if files.length > 0}
            <select class="select-bpm" bind:value={mp3FileName}>
                {#each files as item}
                    <option value={item}>{item}</option>
                {/each}
            </select>
        {:else}
            <select class="select-bpm">
                <option value="">{$_("bpmNoFile")}</option>
            </select>
        {/if}
        <button on:click={calcBPM}>{$_("calcBPM")}</button>
        <button on:click={loadMp3Files}>{$_("bpmRefresh")}</button>
        <h3>BPM: {bpm}</h3>
    </div>
</div>

<style lang="stylus">
.route 
    position relative
    margin 0 auto
    width fit-content
    color white
    background-color rgba(0, 0, 0, 0.5)
    padding 10px
    border 0
    border-radius 6px
    font-family DM Mono
    transition all 0.3s
    &:hover
        background-color violet
        box-shadow 0 0 15px black
        cursor pointer

.container
    position relative
    margin-top 70px

    h1,h2,h3
      width fit-content
      margin 0 auto
    
    h3
        padding 5px
        margin 5px auto
    
    p
        margin 10px auto
        width fit-content
        &.other-func
            margin 17px auto
    

    button
        width 120px
        height 35px
        margin 0 auto
        background-color black
        border 3px solid deepskyblue
        color white
        border-radius 7px
        transition all, 0.4s
        box-shadow 0 0 20px blue
        &:hover
            background-color rgb(0, 145, 255)
            cursor pointer
            box-shadow 0 0 50px blue
        
    
    input
        width 400px
        height 30px
        background-color black
        font-family DM Mono
        color white
        border-radius 7px
        border 3px solid pink
        outline-color blueviolet
        transition all, 0.4s
        box-shadow 0 0 20px deeppink
        &:focus
            background-color rgb(70, 70, 70)
            transform scale(1.01)
            box-shadow 0 0 50px violet
        

    .file-selector
        width 70px
        height fit-content
    

    .select-bpm
        height 35px
        width fit-content
        background-color rgb(87, 87, 87)
        border-radius 7px
        border: 3px solid rgb(255, 0, 0)
        color white
        box-shadow 0 0 20px red
    

    #eng-bpm
        position relative
        top -7px
    
    .center
        margin 10px auto
        width fit-content
    

</style>
