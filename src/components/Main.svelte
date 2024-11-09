<script>
    import AboutMe from "./About_me.svelte";
    import MyArtworks from "./My_artworks.svelte";
</script>


<div class="snap-y snap-mandatory overflow-y-scroll h-screen ">
    <div class="snap-always snap-start">
        <AboutMe></AboutMe>
        <div class= "from-[#d59fd2] dark:from-[#593457]  w-screen h-12 to-slate-300 dark:to-slate-600 bg-gradient-to-b"></div>
    </div>
    <div class="snap-always snap-start">
        <MyArtworks ></MyArtworks>  
    </div>
    
</div>

