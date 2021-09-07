<template>
  <div class="commontitle">
    <div class="content-block-title lineheight20 row"  style="font-weight: bold;color: #333333;padding-left: 5px;">
      <div class="col-100 font18 top5" style="z-index:99">{{title}}</div>
      <hr style="width: 16%; background-color: #F46F24; height: 5px; border: none;margin-top: -4px; z-index: 20;">
    </div>
  </div>
</template>
<script>
export default {
  name: "commontitle",
  props: {
    title: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      
    };
  },
  methods: {
  
  }
};
</script>
<style>
.listName {
  color: #808080;
  position: relative;
  top: -5px;
  font-weight: normal;
}
</style>