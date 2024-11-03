<script>
    import {clickOutside} from '$lib/clickOutside'
    import { onMount } from "svelte";
    import { tick } from 'svelte';
    import gsap from "gsap/all";
    import { Draggable } from "gsap/dist/Draggable";

    
    let isOpen = false;
    let slide;
    let cardArt,cardWindow, artTitle, artDesc, sliderWidth;
    let titleWidth;
    let artData;
    let artworkWidth;
    let artworks = []; 
    const artworkModules = import.meta.glob("../../static/images/artworks/*.*");
    const apiURL ="https://orlykat.github.io/protfolio-web-app/static/data.json";


    if (typeof window !== "undefined") {
        gsap.registerPlugin(Draggable)
        gsap.defaults({ease: "none"})  
    }

   onMount(async () => {
        const response = await fetch(apiURL);
        if (response.status === 200) {
            let dataObject = await response.json();
            artData = dataObject.artworks
            
            artworks= Object.keys(artworkModules).map(url => ({"url":`/images/artworks/${url.split('/')[url.split('/').length -1]}`,
                                                            "name":(url.split('/')[url.split('/').length -1]).split('.')[0],
                                                            "element":null,
                                                            "title": artData[(url.split('/')[url.split('/').length -1]).split('.')[0]]["name"],
                                                            "desc":`תאריך: ${artData[(url.split('/')[url.split('/').length -1]).split('.')[0]]["date"]}<br> אמצעי: ${artData[(url.split('/')[url.split('/').length -1]).split('.')[0]]["platform"]}<br> ${artData[(url.split('/')[url.split('/').length -1]).split('.')[0]]["extra"]}`
                                                        }));
        tick().then(() => {
                initDraggbleSlides()
		});
            
            

             
            
          
                                               
        } else {
            throw new Error(response.status);
        }


        
        
            
        });
  
    function closeCard(){
        if (isOpen){
            isOpen = !isOpen
            cardArt.innerHTML = ''
            artDesc.innerHTML = ''
            artTitle.innerHTML = ''
            cardWindow.classList.replace("absolute","hidden")
            cardArt.classList.remove("animate-swing")
        }
    }

    function openCard(artwork){
        console.log("open")
        // #TODO make more svelte
        if(isOpen){
            slide.classList.remove("paused")
        }else{
            let el = artwork["element"]
            isOpen = !isOpen   
            
            cardWindow.classList.replace("hidden","absolute")
            let cardElement = el.innerHTML
            cardArt.classList.add("animate-swing")
            cardArt.innerHTML = cardElement
            artTitle.innerHTML = artwork["title"]
            artDesc.innerHTML = artwork["desc"]

        }


    }
    function initDraggbleSlides(){
        let progress;
        console.log(artworkWidth)
        const numCells = artworks.length
        const cellStep = 1 / numCells
        const baseTl = gsap.timeline({paused: true})
        const wrapWidth = artworkWidth * numCells
        const proxy = document.createElement("div")
        for (let i = 0; i < artworks.length; i++) {
            initCell(artworks[i], i);
        }
        const widthSnap = gsap.utils.snap(artworkWidth)
        
        
        const animation = gsap
                    .timeline({repeat: 1, paused: true})
                    .add(baseTl.tweenFromTo(1, 2, {immediateRender: true}))
        let slideDelay      = 4,
            timer           = gsap.delayedCall(slideDelay, autoPlay);
        gsap.set(slide, {
                 width: wrapWidth - artworkWidth});
        const draggable = new Draggable(proxy, {
                allowContextMenu: true,
                type: "x",
                trigger: slide,
                inertia: true,
                dragClickables: true,
                onPressInit() {
                gsap.killTweensOf(animation);
                let x = animation.progress() * wrapWidth;
                gsap.set(proxy, {x: x});
                draggable.current = widthSnap(x);
                },
                onDrag: updateProgress,
                onThrowUpdate: updateProgress,
                snap: {x: snapX},
                onThrowComplete: function () {

                timer.restart(true)
                    
                }
            }) 

        function snapX(x) {
            return gsap.utils.snap([draggable.current - artworkWidth, draggable.current, draggable.current + artworkWidth], x);
        }   
        function updateProgress() {
            timer.restart(true)
    

            let newProg = draggable.x / wrapWidth;

            newProg = newProg - Math.floor(newProg);

            animation.progress(newProg);

        }
        function animateSlides() { 

            updateProgress()

            if(draggable.x === 0 || progress === 1) {
            progress = 1
            } else {
            progress = draggable.x / wrapWidth;
            progress = progress - Math.floor(progress);
            }

            animation.tweenFromTo(
            progress,
            progress = progress - cellStep,
            {
                immediateRender: true,
                duration: 1,
                ease: "power1.inOut",
                onComplete: () => {

                draggable.x -= artworkWidth
                draggable.current = widthSnap(draggable.x)
                
                updateProgress()

                
                timer.restart(true)

                if(progress <= 0) {
                    progress = 1
                }
                }
            }
        )    
        }

        function autoPlay() {
            if (draggable.isPressed || gsap.isTweening(animation)) {
            timer.restart(true);
            } else {
            animateSlides();
            }
        }
        function initCell(artwork, index) {
            let element = artwork["element"]

            gsap.set(element, {
                scale: 1.2,
                x: -artworkWidth
            })

            const tl = gsap.timeline({repeat: 1})
                .to(element, 1, {x: "+=" + wrapWidth}, 0)
                .to(element, cellStep, {scale: 1, repeat: 1, yoyo: true}, 0.5 - cellStep)

            baseTl.add(tl, index * -cellStep)
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
<section id="my-artworks-section" class="bg-slate-400 w-auto h-screen flex flex-col relative">
    <div bind:this={cardWindow} class=" hidden left-1/2 top-1/2 bg-slate-300 -translate-x-1/2 -translate-y-1/2 z-50 flex  items-center md:p-12 p-8 md:gap-16 gap-8 rounded-lg flex-col md:flex-row-reverse md:w-2/3  md:h-fit" on:click_outside={closeCard} use:clickOutside>
        <div bind:this={cardArt} class="origin-top"></div>
        <div dir="rtl" class="md:self-start self-end">
            <h2 bind:this={artTitle} class="text-xl mb-6 text-right"> </h2>
            <p class="text-right align" bind:this={artDesc} ></p>
        </div>
    </div>

    <div class="pt-6 mx-auto w-fit mt-16">
        <h1 bind:clientWidth={titleWidth} class="align-bottom font-bold md:text-4xl text-2xl text-center border-b-2 border-stone-700">העבודות שלי</h1>
    </div>
    

    <div  class="w-full h-4/5 relative overflow-clip" >
        <div class="absolute pointer-events-none h-3/4 w-[400%] z-10 bg-gradient-to-b from-orange-100 opacity-30  left-1/2 transform -translate-x-1/2 to-70%" style="clip-path:polygon(calc(50% - {titleWidth/2}px) 0%,calc(50% + {titleWidth/2}px) 0%,100% 100%,0 100%)">
        </div>
        <div  class="flex relative h-full w-[200vw] items-center">
            <div bind:this={slide} bind:clientWidth={sliderWidth} class="cursor-grab relative h-3/5 flex space-x-16 items-center content-around">
                {#each artworks as artwork}
                    <button  bind:clientWidth={artworkWidth} class="w-fit" bind:this={artwork["element"]} on:click={openCard(artwork)}>
                        <div id="{artwork.name}" class="w-fit relative  select-none frame">
                            <img draggable="false" alt="{artwork.name}" src="{artwork.url}" class=" h-64 max-w-none">
                        </div>
                    </button>
                {/each}
            </div>
        </div>
    </div>
</section> 
