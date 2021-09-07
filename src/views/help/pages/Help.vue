<!--
 * @Author: zzt
 * @Date: 2021-04-06 14:27:34
 * @LastEditTime: 2021-04-12 14:47:39
 * @LastEditors: Please set LastEditors
 * @Description: 帮助中心
 * @FilePath: \sjoyOrderingManagerH5\src\views\help\pages\Help.vue
-->
<template>
    <div class="main-layout">
        <NaviBar :title="$t('help.helpCenter')"></NaviBar>
        <div class="row top20">
            <div class="col-100 buttons-row navBtn">
                <a
                    class="button button-round"
                    @click="navActive = 0"
                    :class="{ active: navActive == 0 }"
                    >{{ $t("help.download") }}</a
                >
                <a
                    class="button button-round"
                    @click="navActive = 1"
                    :class="{ active: navActive == 1 }"
                    >{{ $t("help.shouce") }}</a
                >
                <a
                    class="button button-round"
                    @click="navActive = 2"
                    :class="{ active: navActive == 2 }"
                    >{{ $t("help.question") }}</a
                >
            </div>
        </div>
        <div class="tabs-content">
            <div class="row" v-show="navActive == 0">
                <div class="col-100">
                    <div class="row">
                        <div class="col-100">
                            <div class="row" style="margin: 40px 35px">
                                <div class="col-60">
                                    <img
                                        src="../../../assets/images/guanjiaDown.png"
                                        alt
                                        width="100%"
                                    />
                                </div>
                                <div
                                    class="col-40 qrcodeBg center"
                                    style="
                                        margin-top: 100px;
                                        position: relative;
                                    "
                                >
                                    <div >
                                        <img
										    v-if="getUrl=='http://www.shule666.com:18082'"
                                            src="../../../assets/images/www_manager.png"
                                            alt
                                            width="90"
                                            class="top5"
                                        />
										<img
										    v-else
                                            src="../../../assets/images/up_manager.png"
                                            alt
                                            width="90"
                                            class="top5"
                                        />
                                    </div>
                                    <p
                                        class="font16 fontWeight"
                                        style="color: #333333"
                                    >
                                        {{ $t("help.guanjia1") }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-100 center" @click="guanjiaappClick">
                            <a
                                class="button button-round button-fill andriodApp"
                            >
                                <img
                                    src="../../../assets/images/andriod.png"
                                    alt
                                    width="16"
                                    style="position: relative; top: 5px"
                                />
                                <span class="left5">{{
                                    $t("help.andriod")
                                }}</span>
                            </a>
                            <p
                                class="font14 color-lightbrown"
                                style="padding: 30px"
                            >
                                {{ $t("help.guanjiaMsg") }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-100">
                    <div class="row">
                        <div class="col-100">
                            <div class="row" style="margin: 40px 35px">
                                <div class="col-100 center">
                                    <img
                                        src="../../../assets/images/weiterHDDown.png"
                                        alt
                                        width="80%"
                                    />
                                    <p
                                        style="
                                            color: #505050;
                                            margin: 0px;
                                            font-weight: bold;
                                        "
                                    >
                                        <span class="font14">{{
                                            $t("materialMall.MJOYWaiter")
                                        }}</span
                                        ><span class="font12"
                                            >&nbsp;{{
                                                $t("materialMall.HD")
                                            }}</span
                                        >
                                    </p>
                                    <span
                                        class="font12"
                                        style="color: rgba(0, 0, 0, 0.5)"
                                        >{{ $t("materialMall.shiyong1") }}</span
                                    >
                                </div>
                                <div class="col-100 center top30">
                                    <img
                                        src="../../../assets/images/weiterDown.png"
                                        alt
                                        width="60%"
                                    />
                                    <p
                                        style="
                                            color: #505050;
                                            margin: 0px;
                                            font-weight: bold;
                                        "
                                    >
                                        <span class="font14">{{
                                            $t("materialMall.MJOYWaiter")
                                        }}</span
                                        ><span class="font12"
                                            >&nbsp;{{
                                                $t("materialMall.changgui")
                                            }}</span
                                        >
                                    </p>
                                    <span
                                        class="font12"
                                        style="color: rgba(0, 0, 0, 0.5)"
                                        >{{ $t("materialMall.shiyong2") }}</span
                                    >
                                    <p
                                        class="font14 color-lightbrown"
                                        style="padding: 30px"
                                    >
                                        {{ $t("help.fuwuyuanMsg") }}
                                    </p>
                                </div>
                                <div class="col-50 qrcodeBg center">
                                    <div>
										<img
										    v-if="getUrl=='http://www.shule666.com:18082'"
                                            src="../../../assets/images/www_waiterHD.png"
                                            alt
                                            width="90"
                                            class="top5"
                                        />
										<img
										    v-else
                                            src="../../../assets/images/up_waiterHD.png"
                                            alt
                                            width="90"
                                            class="top5"
                                        />
                                        <p class="font14">
                                            {{ $t("materialMall.HD") }}
                                        </p>
                                    </div>
                                    <a
                                        class="button button-round button-fill andriodApp"
                                        @click="fuwuyaunHDClick"
                                        style="width: 85%"
                                    >
                                        <span class="left5">{{
                                            $t("materialMall.HDdown")
                                        }}</span>
                                    </a>
                                </div>
                                <div class="col-50 qrcodeBg center">
                                    <div>
										<img
										    v-if="getUrl=='http://www.shule666.com:18082'"
                                            src="../../../assets/images/www_waiter.png"
                                            alt
                                            width="90"
                                            class="top5"
                                        />
										<img
										    v-else
                                            src="../../../assets/images/up_waiter.png"
                                            alt
                                            width="90"
                                            class="top5"
                                        />
                                        <p class="font14">
                                            {{ $t("materialMall.changgui") }}
                                        </p>
                                    </div>
                                    <a
                                        class="button button-round button-fill andriodApp"
                                        @click="fuwuyuanappClick"
                                        style="width: 85%"
                                    >
                                        <span class="left5">{{
                                            $t("materialMall.changguiDown")
                                        }}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-100">
                    <div class="row">
                        <div class="col-100">
                            <div class="row" style="margin: 40px 35px">
                                <div class="col-60">
                                    <img
                                        src="../../../assets/images/dianpingDown.png"
                                        alt
                                        width="100%"
                                    />
                                </div>
                                <div
                                    class="col-40 qrcodeBg center"
                                    style="
                                        margin-top: 100px;
                                        position: relative;
                                    "
                                >
                                    <div class>
                                        <img
                                            src="../../../assets/images/MJOYFOOD.png"
                                            alt
                                            width="90"
                                            class="top5"
                                        />
                                    </div>
                                    <p
                                        class="font16 fontWeight"
                                        style="color: #333333"
                                    >
                                        {{ $t("help.dianping") }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-100 center" @click="dianpingappClick">
                            <a
                                class="button button-round button-fill andriodApp"
                            >
                                <img
                                    src="../../../assets/images/andriod.png"
                                    alt
                                    width="16"
                                    style="position: relative; top: 5px"
                                />
                                <span class="left5">{{
                                    $t("help.andriod")
                                }}</span>
                            </a>
                        </div>
                        <div class="col-100 center top15">
                            <a class="button button-round button-fill iosApp">
                                <img
                                    src="../../../assets/images/iOS.png"
                                    alt
                                    width="16"
                                    style="position: relative; top: 5px"
                                />
                                <span class="left5">{{ $t("help.ios") }}</span>
                            </a>
                            <p
                                class="font14 color-lightbrown"
                                style="padding: 30px"
                            >
                                {{ $t("help.iosMsg") }}
                            </p>
                        </div>
                    </div>
                </div> -->
            </div>
            <div class="row shouceList" v-show="navActive == 1">
                <div class="col-100">
                    <ul>
                        <li v-for="(item, index) in videoData" :key="index">
                            <div class="row no-gutter">
                                <div
                                    class="col-90"
                                    style="
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        overflow: hidden;
                                    "
                                >
                                    <span
                                        class="font16 color-darkbrown fontWeight"
                                    >
                                        <span>{{ index + 1 }}.</span>
                                        <span>{{ item.name }}</span>
                                    </span>
                                </div>
                                <div
                                    class="col-10 right-style"
                                    @click="downloadClick(item.path)"
                                >
                                    <img
                                        src="../../../assets/images/download.png"
                                        alt
                                        width="10"
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                class="row color-darkbrown font12"
                v-show="navActive == 2"
                style="margin: 27px"
            >
                <div class="col-50 appBtn" @click="questionClick(39)">
                    <img
                        src="../../../assets/images/guanjiaApp.png"
                        alt
                        width="38"
                    />
                    <p>{{ $t("help.guanjia") }}</p>
                </div>
                <div class="col-50 appBtn" @click="questionClick(40)">
                    <img
                        src="../../../assets/images/weiterApp.png"
                        alt
                        width="38"
                        height="38"
                    />
                    <p>{{ $t("help.fuwuyaun") }}</p>
                </div>
                <div class="col-50 appBtn top10" @click="questionClick(41)">
                    <img
                        src="../../../assets/images/kucun.png"
                        alt
                        width="38"
                        height="38"
                    />
                    <p>{{ $t("help.yingjian") }}</p>
                </div>
                <div
                    class="col-50 appBtn top10"
                    @click="questionClick(42)"
                    style="height: 153px"
                >
                    <img
                        src="../../../assets/images/wallet.png"
                        alt
                        width="45"
                        height="38"
                    />
                    <p>{{ $t("help.money") }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "help",
    components: {
        NaviBar: (resolve) => require(["../../components/NaviBar"], resolve),
    },
    data() {
        return {
            navActive: 0,
            docData: null,
			videoData: null,
			getUrl:"",
        };
    },
    //修改列表页的meta值，false时再次进入页面会重新请求数据。
    beforeRouteLeave(to, from, next) {
        from.meta.keepAlive = false;
        next();
    },
    methods: {
        questionClick(id) {
            this.$router.push({ path: "/QuestionList", query: { id: id } });
        },
        fuwuyuanappClick() {
            if(this.getUrl=='http://www.shule666.com:18082'){
                window.location.href ="http://www.sjoyfood.com/app/download/waiter.apk"; //fuwuyuanUrl;
            }else{
                window.location.href ="http://up.sjoyfood.com/app/download/waiter.apk"; //fuwuyuanUrl;
            }
        },
        guanjiaappClick() {
            if(this.getUrl=='http://www.shule666.com:18082'){
                window.location.href ="http://www.sjoyfood.com/app/download/manager.apk"; //guanjiaUrl;
            }else{
                window.location.href ="http://up.sjoyfood.com/app/download/manager.apk"; //guanjiaUrl;
            }
        },
        // dianpingappClick() {
        //     if(this.getUrl=='http://www.shule666.com:18082'){
        //         window.location.href ="http://www.sjoyfood.com/app/download/order.apk"; //dianpingUrl;
        //     }else{
        //         window.location.href ="http://www.sjoyfood.com/app/download/order.apk"; //dianpingUrl;
        //     }
        // },

        fuwuyaunHDClick() {
            if(this.getUrl=='http://www.shule666.com:18082'){
                window.location.href ="http://www.sjoyfood.com/app/download/waiterHD.apk"; //waiterHDUrl;
            }else{
                window.location.href ="http://up.sjoyfood.com/app/download/waiterHD.apk"; //waiterHDUrl;
            }
        },
        doclist() {
            let that = this;
            this.request.doc({ type: "1" }, function (res) {
                if (res.code == "1") {
                    that.docData = res.data.list;
                    for (let index = 0; index < that.docData.length; index++) {
                        that.videoData = that.docData[index].list;
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        downloadClick(url) {
            window.location.href = url;
        },
    },
    created() {
		this.getUrl = this.baseUrl.getWaiterUrl();
		console.log(this.getUrl);
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
        this.$store.dispatch("setShowNaviBar", this.$route.query.show || false);

        this.doclist();
    },
};
</script>
<style scoped>
.navBtn .button.button-round:first-child {
    border-radius: 4px 0 0 4px;
}
.navBtn .button.button-round:last-child {
    border-radius: 0 4px 4px 0;
}
.navBtn .active {
    background: rgba(254, 129, 60, 0.1);
    color: #fe813c !important;
}
.navBtn .button {
    border-color: #d8d8d8;
    color: #505050;
    font-size: 14px;
}
.shouceList ul li {
    border-bottom: 1px #e6eaef solid;
    line-height: 45px;
    padding: 5px 18px;
}
.appBtn {
    text-align: center;
    box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    padding: 44px 0px 30px 0px;
    height: 153px;
}
.andriodApp {
    width: 50%;
    display: inline-block;
    height: 36px;
    line-height: 36px;
    background: #f46f24;
}
.iosApp {
    width: 50%;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    background: #979797;
}
.qrcodeBg {
    background: url("../../../assets/images/bg.png");
    background-size: 100px 100px;
    background-repeat: no-repeat;
    background-position-x: center;
}
.qrbg {
    position: absolute;
    z-index: 99;
    top: 25%;
    left: 40%;
    border: 3px white solid;
    border-radius: 6px;
}
</style>