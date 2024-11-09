<script>
    function scrollIntoView({ target }) {
          const el = document.querySelector(target.getAttribute('href'));
          if (!el) return;
      el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  </script>


<!-- TODO make this dynamic -->
 <!-- TODO fix text shadow -->
<header class="z-50 sticky top-0 ">
    <div class="backdrop-blur-xl backdrop-brightness-75 absolute h-16 border-b-2 border-gray-400 flex w-full shadow-lg justify-evenly items-center flex-row-reverse">
    <a on:click|preventDefault={scrollIntoView} href="#about-me-section" class=" dark:text-gray-50 cursor-pointer font-medium hover:text-xl duration-500 hover:text-shadow-lg">
        על עצמי
    </a>
    <a on:click|preventDefault={scrollIntoView} href="#my-artworks-section" class=" dark:text-gray-50 cursor-pointer font-medium hover:text-xl duration-500 hover:text-shadow-lg">
        העבודות שלי
    </a>
</div>
</header>
