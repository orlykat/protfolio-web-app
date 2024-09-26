<script>
    import AboutMe from "./About_me.svelte";
    import MyArtworks from "./My_artworks.svelte";
</script>

<div class="snap-y snap-mandatory overflow-y-scroll h-screen">
    <div class="snap-always snap-center">
        <AboutMe></AboutMe>
    </div>
    <div class="snap-always snap-center">
        <MyArtworks ></MyArtworks>  
    </div>
    
</div>

