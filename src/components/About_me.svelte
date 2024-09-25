<script>
    import { onMount } from "svelte";
   // Please, consider the data sample provided above.
  const apiURL =
    "https://orlykat.github.io/protfolio-web-app/static/data.json";
  let dataObject;
  let desc;
  let social_media=[];

  onMount(async () => {
    const response = await fetch(apiURL);
    if (response.status === 200) {
      dataObject = await response.json();
      social_media = dataObject.social_media.filter(o  => o.username);
      desc = dataObject.about_me_desc
    } else {
      throw new Error(response.status);
    }
  });
</script>


<section id="about-me-section" class="bg-stone-300 w-auto h-screen flex justify-evenly">
    <figure class="w-4/5 mx-auto py-6 md:flex items-center md:flex-row-reverse gap-6 mt-16 md:m-0 ">
          <div class="w-3/4 min-w-52 max-w-72  md:min-w-min aspect-square md:h-2/3 md:w-auto mx-auto [&_img]:cursor-pointer [transform-style:preserve-3d] relative active:[transform:rotateY(180deg)] hover:[transform:rotateY(180deg)] duration-500 transition-all ">
            <img alt="profile_picture" id="profile_picture" src="../static/images/user_photo.jpg" class="h-full w-full shadow-stone-500 object-cover rounded-full shadow-lg absolute">
            <div class=" bg-black/75 rounded-full h-full w-full  [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-clip flex items-center">
                  <div class="h-4/6 w-full flex-col flex justify-evenly items-center ">
                      {#each social_media as account}
                          <div class="object-cover h-1/6 w-7/12">
                          <a href="https://{ account.name }.com/{ account.username }" target="_blank" rel="noopener noreferrer">
                              <div class="h-full w-full flex gap-2 items-center" >
                                  <img alt="{ account.name }" src="../static/images/{ account.name }.png" class="h-full aspect-square ">
                                  <p class="text-white text-nowrap">@{account.username}</p>  
                              </div>      
                          </a>
                      </div>
                      {/each}
                  
              </div> 
          </div>
        </div>
        

        <figcaption>
            <div class="p-4">
                <h1 class="font-bold lg:text-4xl text-xl text-right">על עצמי</h1>
                <p class="font-medium lg:text-xl text-xsalign-bottom text-pretty pt-3 text-right">{desc}</p>
            </div>
        </figcaption> 
    </figure>
</section>

