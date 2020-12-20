<template>
    <div class="story-banner container" :class="storyMode">
        <svg viewBox="0 0 500 500" >
            <path d="M0,50 C150,120 250,0 500,50 L500,00 L0,0 Z" style="stroke: none; fill:#d6efff;"></path>
        </svg>
        <img src="../assets/img/Berno_talking.svg">
    </div>     
</template>

<script>

export default {
    props: {
        storyMode: {
            type: String
        }
    }
}
</script>


<style scoped>
svg {
  display: inline-block;
  position: absolute;
  left: 0;
}
.story-banner.container {
  position: fixed;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  height: 100px;
}

.story-banner img {
    position: absolute;
    z-index: 1;
    left: 10%;
    top: 16px;
    width: 12%;
}
</style>