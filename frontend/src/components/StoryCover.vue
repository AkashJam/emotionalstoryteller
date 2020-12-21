<template>
    <div class="story-banner" :class="storyMode">
       
        <div class="story-image" >
            <img :class="`img-${index}`" v-for="(image,index) in imgurl" :key="index" :src="`/assets/${image}`">
        </div>
        <div class="story-banner-end">
            <svg viewBox="0 0 500 500" >
                <path d="M0,50 C150,120 250,0 500,50 L500,00 L0,0 Z" style="stroke: none; fill:#d6efff;"></path>
            </svg>
            <img src="../assets/img/Berno_talking.svg">
        </div>
    </div>     
</template>

<script>

export default {
    props: {
        storyMode: {
            type: String
        },
        imgurl: {
            type: Array
        }
    }
}
</script>


<style scoped>
svg {
  display: inline-block;
  left: 0;
}
.story-banner {
    height: 50%;
    position: fixed;
    left: 0;
    right: 0;
}
.story-banner.SCARY-STORY {
    background-color: var(--es-primary-light);

}
.story-banner-end {
    width: 100%;
    margin-top: -60px;
    z-index:3
}
.story-image {
    height: 90%;
    text-align: center;
    padding: 20px;
}
.story-banner .story-image img {
    display: inline-block;
    max-width: 32%;
}

.story-banner .story-image img:only-child {
    max-width: initial;
    display: initial;
    height: 100%
}
.story-banner .story-banner-end  img {
    width: 12%;
    position: absolute;
    left: 20px;
}


</style>