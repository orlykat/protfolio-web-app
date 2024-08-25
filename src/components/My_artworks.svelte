<script>
    let y;
    let titleWidth;
    let artworkUrls = [];
    const artworkModules = import.meta.glob("../../static/images/artworks/*.jpg");
   
    artworkUrls= Object.keys(artworkModules);
    // async function print() {
    //     console.log(titleWidth)
    // }
    //     for (let i = 0; i < 60; i++) {
    //     setTimeout(() => {
    //         print()
    //     }, 3000 * (i + 1));
    // }
    


</script>
<style>

</style>

<section id="my-artworks-section" class="bg-slate-400 w-auto h-screen flex flex-col">
    <div class="pt-6 mx-auto w-fit mt-16">
        <h1 bind:clientWidth={titleWidth} class="align-bottom font-bold lg:text-4xl text-xl text-center border-b-2 border-stone-400">my Artworks</h1>
    </div>
    <div class="w-full h-full relative overflow-clip">
        <div class="absolute pointer-events-none h-3/4 w-[400%] z-10 bg-gradient-to-b from-orange-100 opacity-30  left-1/2 transform -translate-x-1/2 to-70%" style="clip-path:polygon(calc(50% - {titleWidth/2}px) 0%,calc(50% + {titleWidth/2}px) 0%,100% 100%,0 100%)">
        </div>
        <div class="flex relative h-full space-x-16 group">
            <div class="relative h-full flex space-x-16 animate-loop-scroll group-active:paused">
                <!-- TODO fix duplication -->
                {#each artworkUrls as url}
                    <div class="h-1/2 w-fit relative flex align-middle">
                        <img draggable="false" alt="frame" src="../../static/images/frame.png" class="h-11/12 absolute top-1/2 select-none left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img draggable="false" alt="{url.split('/')[url.split('/').length -1]}" src="{url}" class="h-3/4 px-5 select-none pt-20 max-w-none">
                </div>
                    
                {/each}

            </div>
            <div class="relative h-full flex space-x-16 animate-loop-scroll group-active:paused" aria-hidden="true">
                {#each artworkUrls as url}
                    <div class="h-1/2 w-fit relative flex align-middle">
                        <img draggable="false" alt="frame" src="../../static/images/frame.png" class="h-11/12 select-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img draggable="false" alt="{url.split('/')[url.split('/').length -1]}" src="{url}" class="h-3/4 select-none px-5 pt-20 max-w-none">
                    </div>
                    
                {/each}
            </div>
        </div>
    </div>
</section> 
<svelte:window bind:scrollY={y} />