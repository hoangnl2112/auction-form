<template>
  <div class="wrapper">
    <div class="q" @click="open = !open">
      {{q}}
      <img alt :class="open && 'rotate'" src="../assets/arrow_down.svg"/>
    </div>
    <transition name="slide">
      <div v-if="open" class="a">{{a}}</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "QaItem",
  props: ['q', 'a'],
  data() {
    return {
      open: false
    }
  }
}
</script>

<style scoped>
  .wrapper {
    padding: 20px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .q {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
  }

  .q img {
    margin-right: 12px;
    transition: all 0.5s;
  }

  .q img.rotate {
    transform: rotate(180deg);
  }

  .a {
    margin: 8px 0 0;
    font-size: 14px;
    line-height: 24px;
    color: #C2C3D8;
  }
</style>