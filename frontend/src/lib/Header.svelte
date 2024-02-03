<script lang="ts">
    import Icon from "@/assets/icon.png";
    import useElectronHref from "@/hooks/useElectronHref";
    import { get } from "svelte/store";
    import { _, locale } from "svelte-i18n"

    const electronHref = useElectronHref("https://github.com/Vincent-the-gamer/Nemassler")
</script>

<header>
    <span class="left">
        <img src={Icon} class="logo" alt="logo" />
        <h1>Nemassler</h1>
    </span>

    <span class="right">
        <span class="text">Language:</span>
        <select bind:value={$locale}>
            <option value="en">English</option>
            <option value="zh">简体中文</option>
        </select>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="github" on:click={ e => electronHref(e) }>GitHub</div>
    </span>
</header>

<style lang="stylus">
header
    position fixed
    top 0
    left 0
    height 40px
    width 100%
    z-index 2
    background-color rgba(0,0,0,0.5)
    box-shadow 0 0 15px black

    .left
        float left
    

    .github
        display inline
        position absolute
        padding 4px
        top 3px
        right 0
        width fit-content
        font-size 20px
        color rgb(255, 255, 255)
        font-weight bold
        border-radius 6px
        border 2px solid aquamarine
        transition background-color, 0.4s
        box-shadow 0 0 25px green
        &:hover
          background-color: aquamarine
          cursor: pointer
    
    .logo
        position absolute
        top 0
        left 5px
        height 100%
    
    h1
      position absolute
      top 0
      left 55px
      margin-top -3px
      width fit-content
    

    .right 
        span
          position: relative
          top: -12px
          right: 100px
        

        .text
            position absolute
            top 10px
            height 35px
            right 200px
            width 100px
            border-radius 5px
        
    select
        position absolute
        top 5px
        height 35px
        right 100px
        width 100px
        border-radius 5px
        background-color rgb(99, 99, 99)
        color white
        border 2px solid deeppink
        box-shadow 0 0 20px deeppink
    

    & > p > span 
        position relative
        top -12px
    

</style>
