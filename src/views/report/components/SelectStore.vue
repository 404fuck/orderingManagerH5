<template>
    <span>
        <span class="font12 storeCss">{{ $t("store") }}</span>
        <el-select
            class="store-select"
            v-model="currentStore"
            @change="selectOne"
            size="small"
            value-key="dep_ID"
            style="width: 40%"
        >
            <el-option
                style="
                    font-size: 13px;
                    padding: 0 20px;
                    height: 34px;
                    line-height: 34px;
                "
                v-for="item in storeList"
                :key="item.dep_ID"
                :label="item.dep_comp_name"
                :value="item"
            ></el-option>
        </el-select>
    </span>
</template>
<script>
export default {
    name: "SelectStore",
    components: {},
    props: {
        dep_ID: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            orderMode: "",
        };
    },
    computed: {
        token() {
            return this.$store.getters.token;
        },
        language() {
            return this.$store.getters.language;
        },
        currentStore: {
            get() {
                return this.$store.getters.currentStore;
            },
            set(val) {},
        },
        storeList() {
            return this.$store.getters.storeList;
        },
    },
    methods: {
        selectOne(item) {
            //change 触发事件
            //直接就拿到当前的这个对象了
            if (item != null) {
                this.$store.dispatch("setcurrentStore", item);
                sessionStorage.setItem("dep_Info", JSON.stringify(item));
                console.log(item.dep_ID);
                console.log(item.dep_comp_name);
                this.orderMode = true;
            }
        },
        setStoreList() {
            //获取门店列表
            if (this.dep_ID != null || this.dep_ID != 0) {
                for (let i in this.storeList) {
                    if (this.dep_ID == this.storeList[i].dep_ID) {
                        this.$store.dispatch(
                            "setcurrentStore",
                            this.storeList[i]
                        );
                        return false;
                    }
                }
            } else {
                if (storeList.length > 0) {
                    this.$store.dispatch("setcurrentStore", this.storeList[0]);
                }
            }
        },
        //获取所有门店列表
        getStoreListAll() {
            let that = this;
            this.request.branchStoreListAll({}, function (res) {
                that.loading = false;
                if (res.code == "1") {
                    if (res.company_business == 1) {
                        res.data.list.splice(0, 0, {
                            dep_ID: -1,
                            dep_comp_name: "全部门店",
                        });
                    }
                    that.$store.dispatch("setStoreList", res.data.list);
                    that.setStoreList();
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
    },
    mounted() {
        this.getStoreListAll();
    },
    watch: {
        currentStore: {
            handler(newVal, oldVal) {
                this.$store.dispatch("setcurrentStore", newVal);
            },
        },
        token: {
            handler(newVal, oldVal) {},
        },
    },
};
</script>
<style scoped>
.store {
    font-size: 16px;
}
.el-option {
    color: #666;
    float: left;
    size: mini;
    line-height: 39px;
    text-align: center;
    margin-left: 18px;
    display: flex;
    align-items: center;
}
.store-select {
    color: #8e8d8d;
    height: 32px;
}
.storeCss {
    background: linear-gradient(#f4792e, #eb411d);
    color: white;
    padding: 2px 3px;
    border-radius: 2px;
    font-size: 10px;
}
</style>