<script>
    import {clickOutside} from '../lib/clickOutside'

    let isOpen = false;
    let y;
    let cardArt,window,cardWindow,slide, artTitle, artDesc;
    let titleWidth;
    let lock = false;
    const artworkModules = import.meta.glob("../../static/images/artworks/*.*");
    const apiURL =
    "https://orlykat.github.io/protfolio-web-app/static/data.json";
   
    onMount(async () => {
        const response = await fetch(apiURL);
        if (response.status === 200) {
            let dataObject = await response.json();
            desc = dataObject.artworks
        } else {
            throw new Error(response.status);
        }
    });
    let artworks= Object.keys(artworkModules).map(url => ({"url":url,
                                                            "name":(url.split('/')[url.split('/').length -1]).split('.')[0],
                                                            "element":null,
                                                            "title": desc[(url.split('/')[url.split('/').length -1]).split('.')[0]],
                                                            "desc":"תאריך: \n כלי: \n"
                                                        }));



    function closeCard(){
        lock = true;
        if (isOpen){
            isOpen = !isOpen
            cardArt.innerHTML = ''
            artDesc.innerHTML = ''
            artTitle.innerHTML = ''
            cardWindow.classList.replace("absolute","hidden")
            slide.classList.remove("paused")
            cardArt.classList.remove("animate-swing")
            slide.classList.remove("pointer-events-none")  
        }
        lock = false;
    }

    function openCard(artwork){
        console.log("open")
        // #TODO make more svelte
        if(isOpen){
            slide.classList.remove("paused")
        }else{
            let el = artwork["element"]
            isOpen = !isOpen   
            slide.classList.add("paused")
            cardWindow.classList.replace("hidden","absolute")
            let cardElement = el.innerHTML
            cardArt.classList.add("animate-swing")
            cardArt.innerHTML = cardElement
            slide.classList.add("pointer-events-none")
            artTitle.innerHTML = artwork["title"]
            artDesc.innerHTML = artwork["desc"]

        }

    }
</script>
<style>

.frame {
  background-color:rgb(228, 228, 234);
  border:solid 1rem #eee;
  border-bottom-color:#fff;
  border-left-color:#eee;
  border-radius:2px;
  border-right-color:#eee;
  border-top-color:#ddd;
  box-shadow:0 0 5px 0 rgba(0,0,0,.25) inset, 0 5px 10px 5px rgba(0,0,0,.25);
  padding:2rem;
  &:before {
    border-radius:2px;
    bottom:-3vmin;
    box-shadow:0 2px 5px 0 rgba(0,0,0,.25) inset;
    content:"";
    left:-2vmin;
    position:absolute;
    right:-2vmin;
    top:-2vmin;
  }
  &:after {
    border-radius:2px;
    bottom:-2.5vmin;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.25);
    content:"";
    left:-2.5vmin;
    position:absolute;
    right:-2.5vmin;
    top:-2.5vmin;
  }
}
</style>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
<section bind:this={window} id="my-artworks-section" class="bg-slate-400 w-auto h-screen flex flex-col relative">
    <div bind:this={cardWindow} class=" hidden left-1/2 top-1/2 bg-slate-300 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center md:p-12 p-8 md:gap-16 gap-8 rounded-lg flex-col md:flex-row-reverse md:w-2/3  md:h-fit" on:click_outside={closeCard} use:clickOutside>
        <div bind:this={cardArt} class="origin-top"></div>
        <div class="">
            <h2 bind:this={artTitle} class="text-xl mb-6 text-right"></h2>
            <p bind:this={artDesc} class="text-right"></p>
        </div>
    </div>

    <div class="pt-6 mx-auto w-fit mt-16">
        <h1 bind:clientWidth={titleWidth} class="align-bottom font-bold md:text-4xl text-xl text-center border-b-2 border-stone-700">העבודות שלי</h1>
    </div>
    

    <div  class="w-full h-4/5 relative overflow-clip" >
        <div class="absolute pointer-events-none h-3/4 w-[400%] z-10 bg-gradient-to-b from-orange-100 opacity-30  left-1/2 transform -translate-x-1/2 to-70%" style="clip-path:polygon(calc(50% - {titleWidth/2}px) 0%,calc(50% + {titleWidth/2}px) 0%,100% 100%,0 100%)">
        </div>
        <div  class="flex relative h-full items-center space-x-16 group">
            <!-- {#each {length: 2} as _, i} -->
            <div bind:this={slide} class="animate-loop-scroll relative h-3/5 flex space-x-16  items-center content-around ">
                {#each artworks as artwork}
                    <button class="w-fit" bind:this={artwork["element"]} on:click={openCard(artwork)}>
                        <div id="{artwork.name}" class="w-fit relative  select-none frame">
                            <img draggable="false" alt="{artwork.name}" src="{artwork.url}" class=" h-64 max-w-none">
                        </div>
                    </button>
                {/each}
            </div>
        <!-- {/each} -->
        </div>
    </div>
</section> 
<svelte:window bind:scrollY={y} />