<script>
    import {clickOutside} from '$lib/clickOutside'
    import { onMount } from "svelte";
    let isOpen = false;
    let cardArt,window,cardWindow,slider, artTitle, artDesc;
    let titleWidth;
    let artData;
    let mouseDown = false;
let startX, scrollLeft;
    let artworks = [];
    const artworkModules = import.meta.glob("../../static/images/artworks/*.*");
    const apiURL ="https://orlykat.github.io/protfolio-web-app/static/data.json";
   
    onMount(async () => {
        const response = await fetch(apiURL);
        if (response.status === 200) {
            let dataObject = await response.json();
            artData = dataObject.artworks
            
            artworks= Object.keys(artworkModules).map(url => ({"url":`/images/artworks/${url.split('/')[url.split('/').length -1]}`,
                                                            "name":(url.split('/')[url.split('/').length -1]).split('.')[0],
                                                            "element":null,
                                                            "title": artData[(url.split('/')[url.split('/').length -1]).split('.')[0]]["name"],
                                                            "desc":`תאריך: ${artData[(url.split('/')[url.split('/').length -1]).split('.')[0]]["date"]}<br> כלי: ${artData[(url.split('/')[url.split('/').length -1]).split('.')[0]]["platform"]}<br> ${artData[(url.split('/')[url.split('/').length -1]).split('.')[0]]["extra"]}`
                                                        }));
                                                        
        } else {
            throw new Error(response.status);
        }
        
    });

    const startDragging = (e) => {
    mouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    }

    const stopDragging = (e) => {
    mouseDown = false;
    }

    const move = (e) => {
    e.preventDefault();
    if(!mouseDown) { return; }
    const x = e.pageX - slider.offsetLeft;
    console.log()

    const scroll = x - startX;
    slider.scrollLeft = scrollLeft - scroll;
    }

    function closeCard(){
        if (isOpen){
            isOpen = !isOpen
            cardArt.innerHTML = ''
            artDesc.innerHTML = ''
            artTitle.innerHTML = ''
            cardWindow.classList.replace("absolute","hidden")
            slider.classList.remove("paused")
            cardArt.classList.remove("animate-swing")
            slider.classList.remove("pointer-events-none")  
        }
    }

    function openCard(artwork){
        console.log("open")
        // #TODO make more svelte
        if(isOpen){
            slider.classList.remove("paused")
        }else{
            let el = artwork["element"]
            isOpen = !isOpen   
            slider.classList.add("paused")
            cardWindow.classList.replace("hidden","absolute")
            let cardElement = el.innerHTML
            cardArt.classList.add("animate-swing")
            cardArt.innerHTML = cardElement
            slider.classList.add("pointer-events-none")
            artTitle.innerHTML = artwork["title"]
            artDesc.innerHTML = artwork["desc"]

        }

    }
</script>
<style>


</style>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
<section bind:this={window} id="my-artworks-section" class="w-auto h-screen bg-slate-300 dark:bg-slate-600 flex flex-col relative items-center justify-end">
    <div bind:this={cardWindow} class=" hidden left-1/2 top-1/2 bg-slate-300 -translate-x-1/2 -translate-y-1/2 z-50 flex  items-center md:p-12 p-8 md:gap-16 gap-8 rounded-lg flex-col md:flex-row-reverse md:w-2/3  md:h-fit" on:click_outside={closeCard} use:clickOutside>
        <div bind:this={cardArt} class="origin-top"></div>
        <div dir="rtl" class="md:self-start self-end">
            <h2 bind:this={artTitle} class="text-xl dark:text-orange-50 mb-6 text-right"> </h2>
            <p class="text-right dark:text-orange-50" bind:this={artDesc} ></p>
        </div>
    </div>

    <div class="pt-6 mx-auto w-fit">
        <h1 bind:clientWidth={titleWidth} class="align-bottom dark:text-orange-50 font-bold md:text-4xl text-xl text-center border-b-2 border-stone-700">העבודות שלי</h1>
    </div>
    

    <div  class="w-full h-3/4 relative overflow-hidden" >
        <div class="absolute pointer-events-none h-4/5 w-[400%] invisible dark:visible z-10 bg-gradient-to-b from-orange-100 opacity-30  left-1/2 transform -translate-x-1/2 to-70%" style="clip-path:polygon(calc(50% - {titleWidth/2}px) 0%,calc(50% + {titleWidth/2}px) 0%,100% 100%,0 100%)">
        </div>
        <div  class="flex relative h-full items-center space-x-16 group ">
            
            <div bind:this={slider} on:mousedown={startDragging} on:mousemove={move} on:mouseleave={stopDragging} on:mouseup={stopDragging} class=" flex h-full space-x-16  items-center hover:paused content-around overflow-auto md:overflow-visible md:animate-loop-scroll">
                {#each {length: 2} as _, i}
                    {#each artworks as artwork}
                        <button class="w-fit" bind:this={artwork["element"]} on:click={openCard(artwork)}>
                            <div id="{artwork.name}" class="w-fit relative  select-none frame">
                                <img draggable="false" alt="{artwork.name}" src="{artwork.url}" class=" h-64 max-w-none">
                            </div>
                        </button>
                    {/each}
                {/each}
            </div>
        
        </div>
    </div>
    <div class="bg-wood h-4 w-screen"></div>
</section> 
