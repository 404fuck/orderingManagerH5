<template>
  <div class="main-layout">
    <!-- <NaviBar :title="$t('help.question')"></NaviBar> -->
    <div class="row">
      <div class="col-35 leftNav">
        <ul>
          <li @click="fatherClick(0)" :class="{active:fatherActive==0}">视频教程</li>
          <li @click="fatherClick(1)" :class="{active:fatherActive==1}">
            <span>软件功能</span>
             <ul class="firstNav" v-show="sonlist">
              <li v-for="(item, index) in leftData"
                  :key="index"
                  @click="selectQuestionClick(index)"
                  :class="{active:firstActive==index}">
                  <span v-if="item.function_name != ''">{{item.function_name}}</span>
                <span v-else>&nbsp; </span>
              </li>
            </ul>
          </li>
        </ul>
       
      </div>
      <div class="col-65"
           style="position: absolute;right: 0px;padding-top: 20px;">
        <div v-show="rightShow">
          <ul class="rightList" >
            <li v-for="(item, index) in rightData"
                :key="index"
                @click="detailClick(rightData,index)">{{item.title}}</li>
          </ul>
        </div>
        <div v-show="videoShow">
          <ul class="videoList" >
            <li v-for="(item, index) in videoData"
                :key="index"
                @click="videoClick(videoData,index)">{{item.title}}</li>
          </ul>
        </div>
      </div>
    </div>
    <van-popup v-model="showVideo" class="center" style="width:80%">
      <div class="row">
        <div class="col-100" style="height: 100%;">
          <video id="videoPause" ref="video" :src="videoPath"  webkit-playsinline="webkit-playsinline"  x5-playsinline="" playsinline=""  controls="controls" autoplay  width="100%" style="background:#fff;object-fit: cover;">您的浏览器不支持 video 标签。</video>
        </div>
        <div class="col-100">
          <img src="../../../style/images/cancel.png" alt="" width="26" @click="cancelPop" class="top20">
        </div>
      </div>
      
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "QuestionList",
  components: { NaviBar:resolve => require(['../../components/NaviBar'],resolve), },
  data () {
    return {
      firstActive: 0,
      show: false,
      leftData: null,
      rightData: null,
      videoData:null,
      fatherActive:0,
      sonlist:false,
      rightShow:false,
      videoShow:true,
      showVideo:false,
      videoPath:"",
      vedioItem:[],
      typeVal:"2",
    };
  },
  beforeRouteLeave (to, from, next) {
    if (to.path == "/help") {
      to.meta.keepAlive = true;
    } else {
      to.meta.keepAlive = false;
    }
    next();
  },
  methods: {
    cancelPop(){
      this.showVideo = false;
      this.$refs.video.pause();
    },
    fatherClick(val){
      this.fatherActive = val;
      if(val == '1'){
        this.sonlist = true
        this.rightShow = true;
        this.videoShow = false;
      }else
      {
        this.videoShow = true;
        this.sonlist = false;
        this.rightShow = false;
      }
    },
    videoClick(videoData,index){
      this.showVideo = true;
      this.videoPath = this.vedioItem[index];
    },
    selectQuestionClick (index) {
      this.firstActive = index;
      this.rightData = this.leftData[index].list;
    },
    detailClick (rightData,index) {
      this.$router.push({ path: "/QuestionDetail", query: { allData: JSON.stringify(rightData), index:index} });
    },
    openClick () {
      this.show = !this.show;
    },
    doc (typeVal) {
      let that = this;
      this.typeVal = typeVal;
      this.request.doc({ product_id: this.$route.query.id ,type: typeVal}, function (res,typeVal) {
        if (res.code == "1") {
          if(that.typeVal == '2'){
            that.leftData = res.data.list;
            if (that.leftData != null && that.leftData.length > 0) {
              that.selectQuestionClick(0);
            }
            that.doc("3");
          }else if(that.typeVal == '3'){
            that.docData = res.data.list;
            for(let index=0;index < that.docData.length ;index++)
            {
              for(let index1=0;index1 < that.docData[index].list.length ; index1++)
              that.vedioItem.push(that.docData[index].list[index1].content);
              that.videoData = that.docData[index].list;
            }
          }
          
        } else {
          that.toast.fail(res.msg);
        }
      });
    }
  },
  created () {
    this.doc("2");
  }
};
</script>
<style scoped>
.leftNav {
  height: 100%;
  position: fixed;
  background: rgba(227, 227, 227, 0.5);
}
.leftNav li {
  line-height: 45px;
  font-size: 14px;
  color: #6D7278;
  text-align: center;
}
.leftNav li:first-child .active{
  color: #f9803e !important;
  border-left: 4px #FE6B18 solid !important;
  background: white !important;
}
.leftNav li.active {
  color: #f9803e;
}

.firstNav li {
  line-height: 45px;
  padding-left: 17px;
  font-size: 14px;
  color: #6D7278;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.firstNav li.active {
  color: #f9803e;
  border-left: 4px #FE6B18 solid;
  background: white;
}
.rightList li,
.videoList li {
  line-height: 45px;
  border-bottom: 1px #e6eaef solid;
  font-size: 12px;
}
.secendNav li {
  line-height: 45px;
  padding-left: 17px;
  font-size: 12px;
  color: #808080;
}
.secendNav li.active {
  color: #f9803e;
}
.navbar:after {
  background-color: transparent !important;
}
.navbar {
  box-shadow: 0 2px 11px 0 rgba(219, 219, 219, 0.2);
  background: white;
}
</style>