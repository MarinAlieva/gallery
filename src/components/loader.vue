<template>
    <div class='loader' v-if="loading">
        <div>
            <img src='loader.gif'>
            <p>Loading ...</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
      loading: {
          type: Boolean,
          default: false,
      }
  },
}
</script>

<style lang='scss' scoped>
.loader{
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #ffffff94;
}
</style>
