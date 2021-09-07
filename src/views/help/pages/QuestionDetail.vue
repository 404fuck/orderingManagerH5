<template>
  <div class="main-layout">
    <NaviBar :title="docData.function_name"></NaviBar>
    <h4 style="color:#333333"
        class="left20 top60">{{docData.title}}</h4>
    <div class="row font14"
         style="padding:0  20px;">
      <div class="col-100 color-darkbrown"
           v-html="docData.content">{{docData.content}}</div>
    </div>
    <div class="row" style="padding:50px 20px">
      <div class="col-100">
        <ul class="listyle font12">
          <li @click="previousBtn">
            <span class="fontWeight">{{$t('help.previous')}}：</span>
            <span>{{pervIes.title}}</span>
            <span v-show="docData.title == ''">--</span>
          </li>
          <li style="margin-top:12px" @click="nextBtn">
            <span class="fontWeight">{{$t('help.next')}}：</span>
            <span>{{nextIes.title}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "QuestionList",
  components: { NaviBar:resolve => require(['../../components/NaviBar'],resolve), },
  data () {
    return {
      docData: { title: null, content: null, function_name: null },
      leftData: null,
      alldata:JSON.parse(this.$route.query.allData),
      showIndex:this.$route.query.index,
      data:{id:0},
      pervIes:{title:"— —"},
      nextIes:{title:"— —"}
    };
  },

 methods:{
      previousBtn(){
        let that =this;
        if(that.showIndex>0){
          --that.showIndex;
          that.data = that.alldata[that.showIndex];
          that.findproblem();
        }else{
          that.toast.fail(that.$t('help.previousMsg'));
        }
      },
      nextBtn(){
        let that =this;
        if(that.showIndex<that.alldata.length-1){
          ++that.showIndex;
          that.data = that.alldata[that.showIndex];
          that.findproblem();
        }else{
          that.toast.fail(that.$t('help.nextMsg'))
        }
      },
      findproblem () {
      let that = this;
      that.data=that.alldata[that.showIndex];
      this.request.findproblem({ id: that.data.id }, function (res) {
        if (res.code == "1") {
          that.docData = res.data;
          var getIndex = that.showIndex;
          var setIndex = 0;
          if(getIndex > 0)
          {
            setIndex = getIndex;
            --setIndex;
            that.pervIes = that.alldata[setIndex];
          }
          else{
            that.pervIes = {title:"— —"};
          }
          if(getIndex < that.alldata.length - 1)
          {
            setIndex = getIndex;
            ++setIndex;
            that.nextIes = that.alldata[setIndex];
          }
          else
          {
            that.nextIes = {title:"— —"};
          }
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
 },
  created () {
    this.findproblem();
  }
};
</script>
<style scoped>
.listyle li{
  color: #F46F24;
  text-decoration: underline;
}
</style>