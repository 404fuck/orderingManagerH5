<template>
  <div class="main-layout">
    <downloadPage></downloadPage>
  </div>
</template>

<script>
export default {
  name: "layout",
  components: {
    downloadPage:resolve => require(['../../components/downloadPage'],resolve),
    
  },
  created() {}
};
</script>
<style>
</style>