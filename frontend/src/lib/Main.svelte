<div class="container">
    {#if $language === "zh"}
        <h1>ncm转mp3</h1>
        <h2>将.ncm后缀文件放入ncm文件夹，然后点击以下按钮即可批量转mp3</h2>
        <div class="center">
            <p>
                ncm输入路径:
                <input type="text" bind:value={ ncmDir }/>
            </p>
            <p>
                mp3输出路径:
                <input type="text" bind:value={ mp3OutDir }/>
            </p>
            <p>
                歌曲封面输出路径:
                <input type="text" bind:value={ songCoverOutDir }/>
            </p>
            <p>
                <button on:click={ customNcm2mp3 }>批量转mp3</button>
            </p>
        </div>
        <h3>{ msgZh }</h3>
        <hr>
        <h1>计算BPM</h1>
        <h2>选择文件夹里面已有的mp3文件 (xxx.mp3), 计算BPM</h2>
        <div class="center">
            {#if files.length > 0}
                <select class="select-bpm" bind:value={ mp3FileName }>
                    {#each files as item}
                        <option value={ item }>{ item }</option>
                    {/each}
                </select>
            {:else}
                <select class="select-bpm">
                    <option value="">没有待检测bpm的mp3文件</option>
                </select>
            {/if}
        <button on:click={ calcBPM }>计算BPM</button>
        <button on:click={ loadMp3Files }>刷新</button>
        <h3>BPM: {bpm}</h3>
        </div>
    {/if}

    {#if $language === "en"}
        <h1>ncm to mp3</h1>
        <h2>Put .ncm files into ncm folder, then click the button</h2>
        <div class="center">
            <p>
                ncm input directory:
                <input type="text" bind:value={ ncmDir }/>
            </p> 
            <p>
                mp3 output directory:
                <input type="text" bind:value={ mp3OutDir }/>
            </p>
            <p>
                songcover output directory:
                <input type="text" bind:value={ songCoverOutDir }/>
            </p>
            <p>
                <button on:click={ customNcm2mp3 }>Convert All</button>
            </p>
        </div>
        <h3>{ msgEn }</h3>
        <hr>
        <h1>Calculate BPM</h1>
        <h2>Choose existing mp3 file (xxx.mp3) in your custom mp3 folder to calculate BPM</h2>
        <div class="center">
        {#if files.length > 0}
            <select class="select-bpm" bind:value={ mp3FileName }>
                {#each files as item}
                    <option value={ item }>{ item }</option>
                {/each}
            </select>
        {:else}
            <select class="select-bpm">
                <option>No mp3 file in your mp3 folder.</option>
            </select>
        {/if}
        <button id="eng-bpm" on:click={ calcBPM }>Calculate BPM</button>
        <button on:click={ loadMp3Files }>Refresh</button> 
        <h3>BPM: {bpm}</h3>
        </div>
    {/if}
</div>

<script lang="ts">
    import { language } from "@/store/languageStore";
    import { getNcmDir, getMp3OutDir, getSongCoverOutDir } from "@/utils/initDirectories";
    import axios from "@/utils/axios";
    import { onMount } from "svelte";
    import detect from "@/utils/detect";

    /**
     * state
     */
    let mp3FileName: string = ""
    let ncmDir: string = getNcmDir()
    let mp3OutDir: string = getMp3OutDir()
    let songCoverOutDir: string = getSongCoverOutDir()
    let msgZh: string = "↑ 点击"
    let msgEn: string = "↑ Click"
    let files: string[] = []
    let bpm: number = 0


    /**
     * Lifecycle: init
     */
    onMount(async() => {
       await loadMp3Files()
       localStorage.getItem("language") ?
       language.set(localStorage.getItem("language")) :
       localStorage.setItem("language", $language)
    })

    /**
     * functions
     */
    async function loadMp3Files(){
        return axios.get(
            `/readFiles?mp3Dir=${mp3OutDir}&ncmDir=${ncmDir}&songCoverDir=${songCoverOutDir}`
        ).then(({ data }) => {
            files = data.files
            mp3FileName = files[0]
        }).catch(err => {
            msgZh = "ncm2mp3方法请求错误"
            msgEn = "ncm2mp3 Request Error!"
            setTimeout(() => {
                msgZh = "↑ 点击"
                msgEn = "↑ Click"
            }, 2000)
        })
    }

    function customNcm2mp3() {
        axios({
            url: "/customNcm2mp3",
            method: 'post',
            data:{
                ncmDir,
                mp3OutDir,
                songCoverOutDir
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(({data}) => {
            const result = data
            if (result.code === 500) {
                this.message = result.err
            }
            else {
                localStorage.setItem("ncmDir",ncmDir)
                localStorage.setItem("mp3OutDir", mp3OutDir)
                localStorage.setItem("songCoverOutDir", songCoverOutDir)
                msgEn = result.msgEn
                msgZh = result.msgZh
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }
            setTimeout(() => {
                msgZh = "↑ 点击"
                msgEn = "↑ Click"
            }, 2000)
        }).catch(err => {
            msgZh = "ncm2mp3方法请求错误"
            msgEn = "ncm2mp3 Request Error!"
            setTimeout(() => {
                msgZh = "↑ 点击"
                msgEn = "↑ Click"
            }, 2000)
        })
    }

    function calcBPM() {
        // @ts-ignore
        const AudioContext: any = window.AudioContext || window.webkitAudioContext
        const context = new AudioContext()
        // Fetch audio file
        axios({
            url: `/getMp3File?filePath=${mp3OutDir}/${mp3FileName}`,
            method: "get",
            responseType: "arraybuffer"
        })
        .then(async res => {
            // Get response as ArrayBuffer
            const buffer = res.data
            // Decode audio into an AudioBuffer
            const data = await new Promise(function (resolve, reject) {
                context.decodeAudioData(buffer, resolve, reject)
            });

            // Run detection
            bpm = detect(data) * 1
        }).catch(console.error)
    }


</script>


<style lang="scss">
.container{
    position: relative;
    margin-top: 70px;
    h1,h2,h3{
      width: fit-content;
      margin: 0 auto;
    }
    h3{
        padding: 5px;
        margin: 5px auto;
    }
    p{
        margin: 10px auto;
        width: fit-content;
    }

    button{
        width: 100px;
        height: 35px;
        margin: 0 auto;
        background-color: black;
        border: 3px solid deepskyblue;
        color: white;
        border-radius: 7px;
        transition: all, 0.4s;
        &:hover{
            background-color: rgb(0, 145, 255);
            cursor: pointer;
        }
    }

    input{
        width: 400px;
        height: 30px;
        background-color: black;
        font-family: DM Mono;
        color: white;
        border-radius: 7px;
        border: 3px solid pink;
        outline-color: blueviolet;
        transition: all, 0.4s;
        &:focus{
            background-color: rgb(70, 70, 70);
            transform: scale(1.01);
        }
    }

    .file-selector{
        width: 70px;
        height: fit-content;
    }

    .select-bpm{
        height: 35px;
        width: fit-content;
        background-color: rgb(87, 87, 87);
        border-radius: 7px;
        border: 3px solid rgb(255, 0, 0);
        color: white;
    }

    #eng-bpm{
        position: relative;
        top: -7px;
    }
    .center{
        margin: 10px auto;
        width: fit-content;
    }
}
</style>