<header>
    <span class="left">
        <img src={ Icon } class="logo" alt="logo"/>
        <h1>Nemassler</h1>
    </span>
    
    <span class="right">
        <div class="text">
            <span id="zh">语言:</span>
            <!-- <span id="en">Language:</span> -->
        </div>
        <select bind:value={ $language }>
            <option value="zh">简体中文</option>
            <option value="en">English</option>
        </select>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="github"
             on:click={ e => electronHref(e) }>GitHub</div>
    </span>
</header>

<script lang="ts">
    import Icon from "@/assets/icon.png"
    import { language } from "@/store/languageStore"

    // <a href> open a external browser window while in electron environment.
        function electronHref(event){
            const url = "https://github.com/Vincent-the-gamer/Nemassler"
            if(window.require !== undefined){
                const { shell } = require("electron")
                event.preventDefault()
                shell.openExternal(url)
            }
            else window.location.href = url
        }

</script>


<style lang="scss">
header{
    position: fixed;
    top: 0;
    left: 0;
    height: 40px;
    width: 100%;
    background-color: black;
    border-bottom: 2px solid black;
    box-shadow: 0 0 15px black;

    .left{
        float: left;
    }

    .github{
        display: inline;
        position: absolute;
        padding: 4px;
        top: 3px;
        right: 0;
        width: fit-content;
        font-size: 20px;
        color: rgb(255, 255, 255);
        font-weight: bold;
        border-radius: 6px;
        border: 2px solid aquamarine;
        transition: background-color, 0.4s;
        &:hover{
          background-color: aquamarine;
          cursor: pointer;
        }
    }

    .logo{
        position: absolute;
        top: 0;
        left: 5px;
        height: 100%;
    }

    h1{
      position: absolute;
      top: 0;
      left: 55px;
      margin-top: -3px;
      width: fit-content;
    }

    .right {
        span{
          position: relative;
          top: -12px;
          right: 100px;
        }
    }

    .text{
        & #zh{
            position: absolute;
            top: 11px;
            height: 35px;
            right: 150px;
            width: 100px;
            border-radius: 5px;
        }
        & #en{
            position: absolute;
            top: 10px;
            height: 35px;
            right: 200px;
            width: 100px;
            border-radius: 5px;
        }
        
    }

    select{
        position: absolute;
        top: 5px;
        height: 35px;
        right: 100px;
        width: 100px;
        border-radius: 5px;
    }

    & > p > span {
        position: relative;
        top: -12px;
    }
}
</style>