<template>
  <div>
    <div class="row center">
      <div class="col-100 center">
        <img src="../../../style/images/download_logo.png" width="110" style="padding-top: 70px;" />
      </div>
      <div class="col-100 top20">
        <span class="font20" style="color:#505050">{{$t('download.shuledinapind')}}</span>
      </div>
      <div class="col-100 top30 font14" style="padding:0px 30px;color:#505050">
        <span>{{$t('download.dianpingText')}}</span>
      </div>
    </div>
    <div class="row center top80 downBtn" style>
      <div class="col-100">
        <a>
          <button class="button androidBtn" @click="downLoadClick">
            <img src="../../../style/images/android.png" width="20" />
            <span>{{$t('download.android')}}</span>
          </button>
        </a>
      </div>
      <div class="col-100 top20">
        <a>
          <button class="button iOSBtn">
            <img src="../../../style/images/iOS.png" width="20" disabled />
            <span>{{$t('download.ios')}}</span>
          </button>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  methods: {
    downLoadClick() {
      window.location.href = "http://www.sjoyfood.com/app/order.apk";
    }
  },
  created() {}
};
</script>
<style scoped>
.androidBtn {
  width: 180px;
  height: 40px;
  line-height: 40px;
  background: #eb3c1c;
  color: white;
  border: none;
  border-radius: 20px;
}
.iOSBtn img,
.androidBtn img {
  position: relative;
  top: 7px;
  right: 10px;
}
.iOSBtn {
  width: 180px;
  height: 40px;
  line-height: 40px;
  background: #979797;
  color: white;
  border: none;
  border-radius: 20px;
}
.downBtn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
