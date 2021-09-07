<template>
  <div class="navbar" v-show="showNaviBar" style="position: fixed;">
    <div class="navbar-inner">
      <div class="left">
        <a class="link" @click="backClick">
          <i class="van-icon van-icon-arrow-left" style="color: #979797;"></i>
        </a>
      </div>
      <div class="center">{{title}}</div>
      <div class="right"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    }
  },
  computed: {
    showNaviBar: {
      get() {
        return this.$store.getters.showNaviBar;
      },
      set(val) {}
    }
  },
  data() {
    return {
      docData: null
    };
  },
  methods: {
    backClick() {
      this.$router.back(-1);
    }
  },
  created() {}
};
</script>
<style scoped>
.navbar:after {
  background-color: transparent !important;
}
.navbar {
  box-shadow: 0 2px 11px 0 rgba(219, 219, 219, 0.2);
  background: white;
}
</style>