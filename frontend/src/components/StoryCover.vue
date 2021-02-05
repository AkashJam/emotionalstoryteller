<template>
    <div :class="[storyMode,'story-banner']">
        <h3 class="conclusion-title" v-if="/-CONC/.test(storyMode)">  What we have learned from the story </h3>
        
        <svg v-if="storyMode=='OPEN-CONV'" viewBox="0 0 500 80" >
            <path d="M0,50 C150,120 250,0 500,50 L500,00 L0,0 Z" style="stroke: none; fill:#d6efff;"></path>
        </svg>
        <img class="character" src="../assets/img/Berno_talking.svg">
        
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
  z-index: 1;
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
    animation-duration: 1.5s;
}
.story-banner:NOT(.OPEN-CONV).SCARY-STORY, 
.story-banner:NOT(.OPEN-CONV).SCARY-CONC {
    background-color: var(--es-color-afraid);
}

.story-banner:NOT(.OPEN-CONV).ANGRY-STORY,
.story-banner:NOT(.OPEN-CONV).ANGRY-CONC {
    background-color: var(--es-color-angry);
}

.story-banner:NOT(.OPEN-CONV).HAPPY-STORY,
.story-banner:NOT(.OPEN-CONV).HAPPY-CONC  {
    background-color: var(--es-color-happy);
}

.story-banner:NOT(.OPEN-CONV).SAD-STORY,
.story-banner:NOT(.OPEN-CONV).SAD-CONC {
    background-color: var(--es-color-sad);
}

.story-banner:NOT(.OPEN-CONV).SURPRIZE-STORY,
.story-banner:NOT(.OPEN-CONV).SURPRIZE-CONC {
    background-color: var(--es-color-surprized);
}

.story-banner:NOT(.OPEN-CONV).DISGUST-STORY,
.story-banner:NOT(.OPEN-CONV).DISGUST-CONC {
    background-color: var(--es-color-disgust);
}

.story-banner:NOT(.OPEN-CONV) .character {
    position: absolute;
    top: 100%;
    transform: translateY(-100%);
    animation-name: character-move;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    height: 30%;
}

.story-banner:NOT(.OPEN-CONV) svg{
    animation-name: story-header;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
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
    max-height: 100%;
}

.story-banner .story-image img:only-child {
    max-width: 100%;
    max-height: 100%;
    display: initial;
}
.story-banner .story-banner-end img {
    width: 12%;
    position: absolute;
    left: 20px;
}

.conclusion-title {
    position: absolute;
    top: 100%;
    margin: 0;
    transform: translateY(-100%);
    left: 0;
    right: 0;
    text-align: center;
    color: white;
    font-size: 24px;
    z-index: 10;
    display: none;
}

@media (min-width: 610px) {
  .conclusion-title {
      display:initial;
  }
}

@media (max-width: 700px) {
  .story-banner .story-image img:not(:only-child) {
    max-width: 190px;
    max-height: 190px;
  }
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