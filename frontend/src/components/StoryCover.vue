<template>
    <div :class="[storyMode,'story-banner']">
        
        <div class="story-banner-end">
            <svg viewBox="0 0 500 100" >
                <path d="M0,50 C150,120 250,0 500,50 L500,00 L0,0 Z" style="stroke: none; fill:#d6efff;"></path>
            </svg>
            <img class="character" src="../assets/img/Berno_talking.svg">
        </div>
        <div v-if="storyMode!=='OPEN-CONV'" class="story-image" >
            <img :class="`img-${index}`" v-for="(image,index) in imgurl" :key="index" :src="`/assets/${image}`">
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
.OPEN-CONV svg {
  display: inline-block;
  position: absolute;
  left: 0;
}
.OPEN-CONV.story-banner .story-banner-end {
  position: fixed;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  height: 100px;
  padding-bottom: 150px;
}

.OPEN-CONV.story-banner img {
    position: absolute;
    z-index: 1;
    left: 10%;
    top: 16px;
    width: 12%;
}
.story-banner:not(.OPEN-CONV) {
    height: 45%;
    position: fixed;
    left: 0;
    right: 0;
    animation-name: animation;
    animation-duration: 2s;
}
.story-banner:NOT(.OPEN-CONV).SCARY-STORY {
    background-color: var(--es-color-afraid);
}

.story-banner:NOT(.OPEN-CONV).ANGRY-STORY {
    background-color: var(--es-color-angry);
}

.story-banner:NOT(.OPEN-CONV).HAPPY-STORY {
    background-color: var(--es-color-happy);
}

.story-banner:NOT(.OPEN-CONV).SAD-STORY {
    background-color: var(--es-color-sad);
}

.story-banner:NOT(.OPEN-CONV) .story-banner-end .character {
    top: 100%;
    transform: translateY(-100%);
    animation-name: character-move;
    animation-duration: 3s;
    animation-delay: -1s;
    animation-timing-function: ease-in-out;

}

.story-banner:NOT(.OPEN-CONV) .story-banner-end {
    width: 100%;
    z-index:3;
    height: 100%;
    position: absolute;
}
.story-banner:NOT(.OPEN-CONV) .story-banner-end svg{
    animation-name: story-header;
    animation-duration: 1s;
    opacity: 0;
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
.story-banner .story-banner-end img {
    width: 12%;
    position: absolute;
    left: 20px;
}

@keyframes animation {
  0%   {height: 0%}
  100% {height: 45%}
}


@keyframes character-move {
  0%   {top: 16px;}
  100% { top: 100%;}
}

@keyframes story-header {
  0%   {opacity: 1;}
  100% { opacity: 0;}
}

</style>