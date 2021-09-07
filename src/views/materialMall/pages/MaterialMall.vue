<template>
  <div class="main-layout">
    <!-- 轮播图 -->
    <div class="row top10 center" style="padding:0 10px">
      <div class="col-100">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" height="175" style="object-fit:contain;width:100%" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 设备推荐 -->
    <CommonTitle :title="$t('materialMall.shebeituijian')" />
    <div class="card demo-card-header-pic tuijianCard" style="border-radius: 12px;box-shadow: 5px 5px 26px rgba(227, 227, 227, 0.5);" v-for="(item,index) in rexMall" :key="index" >
      <div class="card-header color-white no-border card-item" :style="{backgroundImage:'url(\''+item.img+'\')'}"></div>
      <div class="card-footer row">
        <div class="col-100">
          <span> <b class="font16 color-darkbrown">{{item.title}}</b></span>
        </div>
        <div class="col-70">
          <span class="font18" style="color:#F46F24" >{{item.value}}</span>
        </div>
        <div class="col-30 right-style">
          <img src="../../../style/images/add_cart.png" alt="" width="40" height="40">
        </div>
        <div class="col-100">
          <span style="color:#ADADAD;font-size:10px">{{item.note}}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 收银设备 -->
      <div class="shebeiDiv">
        <CommonTitle :title="$t('materialMall.shouyinshebei')" />
        <div class="row shouyinCard">
          <div class="col-100">
            <ul>
              <li class="litem" v-for="(item,index) in rexItem" :key="index" >
                <div class="card demo-card-header-pic" style="box-shadow: 5px 5px 26px rgba(227, 227, 227, 0.5);" >
                  <div class="card-header color-white no-border shouyinItem" :style="{backgroundImage:'url(\''+item.img+'\')'}" >
                  </div>
                  <div class="card-footer row no-gutter" >
                    <div class="col-100 font14" style="color: #505050;font-weight: bold;" >{{item.title}}</div>
                    <div class="col-100 top5">
                      <span style="color:#F46F24;font-size:18px">{{item.value}}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 收银耗材 -->
      <div class="shebeiDiv">
        <CommonTitle :title="$t('materialMall.shouyinhaocai')" id="aa"/>
        <div class="row shouyinCard">
          <div class="col-100">
            <ul>
              <li class="litem" v-for="(item,index) in rexItem1" :key="index" >
                <div class="card demo-card-header-pic" style="box-shadow: 5px 5px 26px rgba(227, 227, 227, 0.5);" >
                  <div class="card-header color-white no-border shouyinItem" :style="{backgroundImage:'url(\''+item.img+'\')'}">
                  </div>
                  <div class="card-footer row no-gutter">
                    <div class="col-100 font12" style="color: #505050;font-weight: bold;" >{{item.title}}</div>
                    <div class="col-100 top5">
                      <span style="color:#F46F24;font-size:18px">{{item.value}}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 导航区域 -->
      <ul class="navs" :class="{isFixed:isFixeds==true}" v-show="tabSetting">
        <li :class="{active: active==0}" @click="scrollTo(0)">
          <span class="font16 " >{{$t('materialMall.shouyinshebei')}}</span>
        </li>
        <li :class="{active: active==1}"  @click="scrollTo(1)" >
          <span class="font16" >{{$t('materialMall.shouyinhaocai')}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CommonTitle from "../components/commonTitle";

import bannerImg from "../../../assets/images/banner.png";
import tuijianImg1 from "../../../assets/images/tuijianImg1.png";
import tuijianImg2 from "../../../assets/images/tuijianImg2.png";
import tuijianImg3 from "../../../assets/images/tuijianImg3.png";
import tuijianImg4 from "../../../assets/images/tuijianImg4.png";
import shebeiImg1 from "../../../assets/images/shebeiImg1.png";
import shebeiImg2 from "../../../assets/images/shebeiImg2.png";
import shebeiImg3 from "../../../assets/images/shebeiImg3.png";
import shebeiImg4 from "../../../assets/images/shebeiImg4.png";
import shebeiImg5 from "../../../assets/images/shebeiImg5.png";
import shebeiImg6 from "../../../assets/images/shebeiImg6.png";
import shebeiImg7 from "../../../assets/images/shebeiImg7.png";
import shebeiImg8 from "../../../assets/images/shebeiImg8.png";
import haocaiImg1 from "../../../assets/images/haocaiImg1.png";
import haocaiImg2 from "../../../assets/images/haocaiImg2.png";
import haocaiImg3 from "../../../assets/images/haocaiImg3.png";

export default {
  name: "MaterialMall",
  components: {
    CommonTitle,
  },

  data() {
    return {
      images: [bannerImg],
      rexMall: [
        {
          img: tuijianImg1,
          title: "商米D2s 4in1 收银机 双屏",
          value: "****",
          note:
            "SUNMI D2s COMBO 4in1 一机集屏幕、打印机、键盘及钱箱四合一体，专为商用场所打造，一步到位。黑灰配色匹配追求品质时尚的门店环境，兼顾空间和体验。",
        },
        {
          img: tuijianImg2,
          title: "FEIE飞鹅云打印机 小票打印机 80mm",
          value: "****",
          note:
            "飞鹅打印机具有自动接单，自动打印功能，客户需在软件后台绑定打印机与店铺，即可自动接单，自动打印。无需连接手机、电脑、驱动，解放双手，省时省力。",
        },
        {
          img: tuijianImg3,
          title: "商米V2 Pos机",
          value: "****",
          note:
            "屏幕大，好操作。5.45英寸IPS高清电容全面屏，大界面，操作灵敏方便，信息一目了然。重量轻，不累手。主机净重仅有364g，长时间使用不累手，轻松携带移动 点菜收银更高效。",
        },
        {
          img: tuijianImg4,
          title: "蓝牙钱箱",
          value: "****",
          note:
            "简约精美，小巧玲珑，节省收银台空间。蓝牙控制钱箱的打开状态，以确保资金安全。停电后可以使用三速锁高端现金箱。钥匙打开钱箱，可以单独使用。",
        },
      ],
      rexItem: [
        {
          img: shebeiImg1,
          title: "飞鹅云打印机 小票打印机 80mm",
          value: "****",
        },
        {
          img: shebeiImg2,
          title: "飞鹅云打印机 标签打印机",
          value: "****",
        },
        {
          img: shebeiImg3,
          title: "商米小闪扫码盒",
          value: "****",
        },
        {
          img: shebeiImg4,
          title: "蓝牙钱箱",
          value: "****",
        },
        {
          img: shebeiImg5,
          title: "商米D2s 4in1 收银机 双屏",
          value: "****",
        },
        {
          img: shebeiImg6,
          title: "商米V2 Pos机",
          value: "****",
        },
        {
          img: shebeiImg7,
          title: "电视叫号器",
          value: "****",
        },
        {
          img: shebeiImg8,
          title: "LED叫号器",
          value: "****",
        },
      ],
      rexItem1: [
        {
          img: haocaiImg1,
          title: "热敏小票纸",
          value: "****",
        },
        {
          img: haocaiImg2,
          title: "热敏标签纸",
          value: "****",
        },
        {
          img: haocaiImg3,
          title: "二维码牌",
          value: "****",
        },
      ],
      isFixeds: false,
      tabSetting: false,
      active: 0,
    };
  },
  methods: {
    // 滚动监听器
    onScroll() {
      // 获取所有锚点元素
      const navContents = document.querySelectorAll(".content .shebeiDiv");
      // 所有锚点元素的 offsetTop
      const offsetTopArr = [];
      navContents.forEach((item) => {
        offsetTopArr.push(item.offsetTop);
      });
      // 获取当前文档流的 scrollTop
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
        console.log(scrollTop)
      if (scrollTop > 1200) {
        //提前判断要上升多少像素就固定
        this.tabSetting = true;
        this.isFixeds = true;
      } else {
        this.tabSetting = false;
        this.isFixeds = false;
      }
    },
    // 跳转到指定索引的元素
    scrollTo(index) {
      this.active = index;
      // 获取目标的 offsetTop
      // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
      const targetOffsetTop = document.querySelector(
        `.content .shebeiDiv:nth-child(${index + 1})`
      ).offsetTop;
      // 获取当前 offsetTop
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 定义一次跳 50 个像素
      const STEP = 50;
      // 判断是往下滑还是往上滑
      if (scrollTop > targetOffsetTop) {
        // 往上滑
        smoothUp();
      } else {
        // 往下滑
        smoothDown();
      }
      // 定义往下滑函数
      function smoothDown() {
        // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
        if (scrollTop < targetOffsetTop) {
          // 如果和目标相差距离大于等于 STEP 就跳 STEP
          // 否则直接跳到目标点，目标是为了防止跳过了。
          if (targetOffsetTop - scrollTop >= STEP) {
            scrollTop += STEP;
          } else {
            scrollTop = targetOffsetTop;
          }
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          // 屏幕在绘制下一帧时会回调传给 requestAnimationFrame 的函数
          // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
          requestAnimationFrame(smoothDown);
        }
      }
      // 定义往上滑函数
      function smoothUp() {
        if (scrollTop > targetOffsetTop) {
          if (scrollTop - targetOffsetTop >= STEP) {
            scrollTop -= STEP;
          } else {
            scrollTop = targetOffsetTop;
          }
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          requestAnimationFrame(smoothUp);
        }
      }
    },
  },
  created() {
    if (
      this.$route.query.lang == null ||
      this.$route.query.lang == "" ||
      typeof this.$route.query.lang == "undefined"
    ) {
      this.$store.dispatch("setLanguage", "en_US");
      this.$i18n.locale = "en_US";
    } else {
      this.$store.dispatch("setLanguage", this.$route.query.lang);
      this.$i18n.locale = this.$route.query.lang;
    }
    this.$store.dispatch("setToken", this.$route.query.token);
  },
  mounted() {
    // 监听滚动事件
    window.addEventListener("scroll", this.onScroll, false);
  },
  destroy() {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener("scroll", this.onScroll);
  },
  computed: {
    language: {
      get() {
        return this.$store.getters.language;
      },
      set(val) {},
    },
  },
  watch: {
    currentStore: {
      handler(newVal, oldVal) {
        if (newVal != undefined && newVal != null) {
        }
      },
    },
  },
};
</script>
<style scoped>
.litem {
  width: 50%;
  display: inline-block;
}
.card{
  border-radius: 10px 10px 0px 0px;
}
.tuijianCard{
  margin: 18px;
}
.shouyinCard{
  margin: 12px;
}
.shouyinCard .card{
  margin: 5px;
}
.card-item {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 191px;
  border-radius: 12px 12px 0px 0px;
}
.shouyinItem {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 146px;
  border-radius: 12px 12px 0px 0px;
}
.isFixed {
  position: fixed;
  width: 100%;
  background-color: #fff;
  top: 0;
  z-index: 999;
  display: block;
}
.navs {
  height: 40px;
}
.navs li {
  display: inline-block;
  margin-left: 20px;
  color: #505050;
  margin-top: 5px;
}

/* 导航栏的样式 */
.navs {
  height: 40px;
}

/* 当导航被点亮后改变颜色 */
.navs .active {
  font-weight: bold;
  border-bottom: 5px #f46f24 solid;
}
</style>