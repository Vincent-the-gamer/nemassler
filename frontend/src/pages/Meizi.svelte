<script lang="ts">
    import Header from "@/lib/Header.svelte";
    import Footer from "@/lib/Footer.svelte";
    import { link } from "svelte-spa-router";
    import axios from "@/utils/axios";
    import useElectronHref from "@/hooks/useElectronHref";
    import { _ } from "svelte-i18n"

    // enable hentai mode?
    let isHentai: boolean = false;
    // number of pictures
    let number: number = 1;
    // picture list
    let picList: any = [];
    // get button availability
    let getButtonAvailable: boolean = true;

    // get pictures
    function getPictures() {
        axios
            .post("/meizi", {
                isR18: isHentai,
                num: number,
            })
            .then(({ data }) => {
                picList = [...data.data];
            });
    }

    function handleNumberBlur() {
        // limit number to 1-10
        if (number > 10) number = 10;
        if (number < 1) number = 1;
        setTimeout(() => {
            getButtonAvailable = true;
        }, 1000);
    }
</script>

<Header />
<div class="container">
    <p class="other-func">
        {$_("other-func")}： <a class="route" href="/" use:link>{$_("audioHandler")}</a>
    </p>
    <h1>{$_("audioHandler")}</h1>
    <p>
        {$_("hentaiMode")}: <input type="checkbox" bind:checked={isHentai} />
    </p>
    <p>
        {$_("howMany")}? <input
            type="number"
            bind:value={number}
            min="1"
            max="10"
            on:blur={handleNumberBlur}
            on:focus={() => (getButtonAvailable = false)}
        />
    </p>
    <p>
        <button on:click={getPictures} disabled={!getButtonAvailable}
            >{$_("getPic")}！</button
        >
        <button on:click={() => (picList = [])}>{$_("empty")}</button>
    </p>
    <div class="pic-area">
        <h3>{$_("picShowArea")}</h3>
        <div class="pictures">
            {#each picList as picture}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <img
                    src={picture.url}
                    alt={picture.title}
                    title={picture.title}
                    on:click={useElectronHref(picture.url)}
                />
            {/each}
        </div>
    </div>
</div>
<Footer />

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

    h1, h3
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
        width fit-content
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
        &:disabled
            border 3px solid gray
            &:hover
                cursor not-allowed
                box-shadow 0 0 50px black
                background-color black

        
    input-mixin()
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

    input
        width 100px
        height 30px
        input-mixin()
    
    input[type="checkbox"]
        $size = 30px
        width $size
        height $size
        position relative
        top 8px

    .pic-area
        position relative
        margin 0 auto
        width 80%
        min-height 400px
        background-color rgba(0,0,0,0.5)
        .pictures
            display flex
            justify-content center
            align-items center
            flex-wrap wrap
            img
                width 200px
                height 200px
                margin 5px
                transition all 0.3s
                &:hover
                    cursor pointer
                    border 2px solid gold
                    box-shadow 0 0 15px gold
</style>
