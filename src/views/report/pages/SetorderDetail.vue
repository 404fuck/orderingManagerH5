<!--
 * @Author: zzt
 * @Date: 2021-04-06 14:27:34
 * @LastEditTime: 2021-06-15 14:25:22
 * @LastEditors: Please set LastEditors
 * @Description: 订单详情
 * @FilePath: \sjoyOrderingManagerH5\src\views\report\pages\SetorderDetail.vue
-->
<template>
    <div class="main-layout reports">
        <!-- 堂食--详情 -->
        <div v-if="takeoutFlag == 0">
            <div v-show="data.order_status == 3" class="row">
                <div
                    class="col-100 color-darkbrown font14"
                    style="padding: 20px"
                >
                    <ul>
                        <li>
                            <h4 class="font16">
                                {{ $t("accountsDetail.outOrderInfo") }}
                            </h4>
                        </li>
                        <li class="top10">
                            <div
                                class="row"
                                style="
                                    padding: 10px 0 0 10px;
                                    width: 90%;
                                    height: 65px;
                                    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
                                "
                            >
                                <div
                                    class="col-100 font14 fontWeight"
                                    style="color: #232426"
                                >
                                    <span class="priceStyle">{{
                                        (data.total_price - data.refund_price)
                                            | price
                                    }}</span>
                                    <span>=</span>
                                    <span class="priceStyle">{{
                                        data.total_price | price
                                    }}</span>
                                    <span>-</span>
                                    <span class="priceStyle">{{
                                        data.refund_price | price
                                    }}</span>
                                </div>
                                <div
                                    class="col-100 font12"
                                    style="color: #8c939b"
                                >
                                    <span class="priceStyle">{{
                                        $t("accountsDetail.jingshou")
                                    }}</span>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <span class="priceStyle">{{
                                        $t("report.shishoue")
                                    }}</span>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <span class="priceStyle">{{
                                        $t("accountsDetail.tuikuan")
                                    }}</span>
                                </div>
                            </div>
                        </li>
                        <li
                            class="top10"
                            v-for="(item, index) in returnInfo"
                            :key="index"
                        >
                            <span>{{ item.title }}</span>
                            <span>{{ item.value }}</span>
                        </li>
                    </ul>
                </div>
                <div class="col-100">
                    <hr
                        style="background: #eaedf1; height: 6px; border: none"
                    />
                </div>
            </div>
            <div
                v-show="data.order_status == 5 || data.order_status == 4"
                class="row"
            >
                <div
                    class="col-100 color-darkbrown font14"
                    style="padding: 20px"
                >
                    <ul>
                        <li>
                            <h4 class="font16">{{ judanTitle }}</h4>
                        </li>
                        <li
                            class="top10 font14"
                            v-for="(item, index) in gotjudanInfo"
                            :key="index"
                        >
                            <span>{{ item.title }}</span>
                            <span>{{ item.value }}</span>
                        </li>
                    </ul>
                </div>
                <div class="col-100">
                    <hr
                        style="background: #eaedf1; height: 6px; border: none"
                    />
                </div>
            </div>
            <div v-show="data.order_status == 2">
                <div
                    class="col-100 color-darkbrown font14"
                    style="padding: 20px"
                >
                    <ul>
                        <li>
                            <h4 class="font16">{{ titleChedan }}</h4>
                        </li>
                        <li
                            class="top10"
                            v-for="(item, index) in gotchedanInfo"
                            :key="index"
                        >
                            <span>{{ item.title }}</span>
                            <span>{{ item.value }}</span>
                        </li>
                    </ul>
                </div>
                <div class="col-100">
                    <hr
                        style="background: #eaedf1; height: 6px; border: none"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-100 color-darkbrown font14">
                    <ul style="padding: 20px">
                        <li>
                            <h4 class="font16">{{ title }}</h4>
                        </li>
                        <ul>
                            <li>
                                <span class="blackText">{{ dishTotal }}</span
                                ><span class="right">{{ dishTotalValue }}</span>
                            </li>
                            <!-- 菜品优惠 -->
                            <li class="grayText">
                                <div v-if="dishDisValue != '0.00'">
                                    <span>{{ dishDis }}</span
                                    ><span class="right"
                                        >-{{ dishDisValue }}</span
                                    >
                                </div>
                                <ul
                                    class="listCss"
                                    v-for="(item, index) in pmtTemp"
                                    :key="index"
                                >
                                    <li
                                        class="top10 grayText"
                                        v-if="item.pmt_type == 'dish'"
                                    >
                                        <span
                                            style="
                                                display: inline-block;
                                                width: 80%;
                                            "
                                            >{{ pmtValue[item.pmt_name] }}</span
                                        >
                                        <span class="right"
                                            >-{{ item.pmt_price | price }}</span
                                        >
                                    </li>
                                </ul>
                            </li>
                            <li class="blackText">
                                <span>{{ orderCount }}</span
                                ><span class="right">{{
                                    orderCountValue
                                }}</span>
                            </li>
                            <!-- 结账优惠 -->
                            <li class="grayText">
                                <div v-if="pmtType == 'order'">
                                    <span>{{ jiezhangTitle }}</span
                                    ><span class="right"
                                        >-{{ jiezhangValue }}</span
                                    >
                                </div>
                                <ul
                                    class="listCss"
                                    v-for="(item, index) in pmtTemp"
                                    :key="index"
                                >
                                    <li
                                        class="top10 grayText"
                                        v-if="item.pmt_type == 'order'"
                                    >
                                        <span
                                            style="
                                                display: inline-block;
                                                width: 80%;
                                            "
                                            >{{ pmtValue[item.pmt_name] }}
                                            <span
                                                v-if="
                                                    item.pmt_name == 'discount'
                                                "
                                            >
                                                <span v-if="item.member == '1'">
                                                    ({{ data.discount_reason }}
                                                    {{
                                                        Number(
                                                            data.discount_ratio *
                                                                100
                                                        )
                                                    }}%{{
                                                        $t("orderDetail.dazhe")
                                                    }}
                                                </span>
                                                <span v-else>
                                                    ({{
                                                        Number(
                                                            data.discount_ratio *
                                                                100
                                                        )
                                                    }}%{{
                                                        $t("orderDetail.dazhe")
                                                    }},{{
                                                        data.discount_reason
                                                    }}
                                                </span>
                                                <span
                                                    v-show="
                                                        item.no_pmt_price !=
                                                        null
                                                    "
                                                    >,{{
                                                        $t(
                                                            "orderDetail.noMoney"
                                                        )
                                                    }}：{{
                                                        item.no_pmt_price
                                                            | price
                                                    }}</span
                                                >)</span
                                            >
                                            <span
                                                v-if="item.pmt_name == 'reduce'"
                                                >({{ item.note }})</span
                                            >
                                            <span
                                                v-if="item.pmt_name == 'coupon'"
                                                >({{ item.note }})</span
                                            >
                                            <span
                                                v-if="
                                                    item.pmt_name ==
                                                    'point_user'
                                                "
                                                >({{ item.note }})</span
                                            >
                                        </span>

                                        <span class="right"
                                            >-{{ item.pmt_price | price }}</span
                                        >
                                    </li>
                                </ul>
                            </li>

                            <li
                                v-for="(item, index) in gotfuwuInfo"
                                :key="index"
                                class="grayText"
                            >
                                <span>{{ item.title }}</span
                                ><span class="right">{{ item.value }}</span>
                            </li>
                            <li
                                v-for="(item, index) in gotshoukuanInfo"
                                :key="index"
                                class="blackText"
                            >
                                <span>{{ item.title }}</span
                                ><span class="right">{{ item.value }}</span>
                            </li>
                            <!-- 收款方式 -->
                            <li class="row" v-show="data.order_status != 2 && data.order_status != 4">
                                <div class="col-50">
                                    <span>{{ $t("report.shoukuanType") }}</span>
                                </div>
                                <div class="col-50 right">
                                    <div class="row">
                                        <div class="col-100">
                                            <span>{{
                                                data.pay_type_name
                                            }}</span>
                                            <span v-show="data.pay_type == 28"
                                                >({{
                                                    data.actually_pay | price
                                                }})</span
                                            >
                                            <span
                                                v-show="
                                                    data.pay_type == 36 ||
                                                    data.pay_type == 112
                                                "
                                                >({{
                                                    data.pay_type_amount
                                                        | price
                                                }})</span
                                            >
                                        </div>
                                        <div
                                            class="col-100"
                                            v-show="
                                                data.pay_type2 != -1 &&
                                                data.pay_type2_amount != 0
                                            "
                                        >
                                            <span>{{
                                                data.pay_type2_name
                                            }}</span>
                                            <span v-if="data.pay_type2 == 28"
                                                >({{
                                                    data.actually_pay | price
                                                }})</span
                                            >
                                            <span v-else
                                                >({{
                                                    data.pay_type2_amount
                                                        | price
                                                }})</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li
                                class="blackText"
                                v-show="
                                    data.pay_type == '28' ||
                                    data.pay_type2 == '28' ||
                                    (data.order_status != 2 &&
                                    data.order_status != 4)
                                "
                            >
                                <ul class="grayText">
                                    <li>
                                        <span>{{
                                            $t("report.cashZhaoling")
                                        }}</span>
                                        <span class="right">{{
                                            data.change_return | price
                                        }}</span>
                                    </li>
                                    <li>
                                        <span>{{
                                            $t("report.cashMoling")
                                        }}</span>
                                        <span class="right">{{
                                            data.left_deal | ReversePrice
                                        }}</span>
                                    </li>
                                </ul>
                            </li>
                            <li v-if="data.pay_type != 112 && data.order_status != 4">
                                <span>{{ shishouTitle }}</span
                                ><span class="right">{{ shishouValue }}</span>
                            </li>
                        </ul>
                    </ul>
                </div>
                <div class="col-100">
                    <hr
                        style="background: #eaedf1; height: 6px; border: none"
                    />
                </div>
            </div>
            <div class="row" style="padding: 20px">
                <div class="col-100 color-darkbrown font14">
                    <ul>
                        <li>
                            <h4 class="font16">
                                {{ $t("accountsDetail.custemInfo") }}
                            </h4>
                        </li>
                        <div>
                            <li
                                v-if="
                                    data.code_mode == '0' &&
                                    data.take_food_code[0] == '#'
                                "
                            >
                                <span>{{ $t("waidaiMsg.canpaiCode") }}</span>
                                <span
                                    >{{ sliceTake }}
                                    <span v-if="data.take_out == 1"
                                        >#{{ $t("waidaiMsg.waidai") }}</span
                                    ></span
                                >
                            </li>
                            <li
                                v-else-if="
                                    data.code_mode == '0' ||
                                    data.code_mode == '2'
                                "
                            >
                                <span>{{ $t("waidaiMsg.qucanCode") }}</span>
                                <span
                                    >{{ takeCodeFood }}
                                    <span v-if="data.take_out == 1"
                                        >#{{ $t("waidaiMsg.waidai") }}</span
                                    ></span
                                >
                            </li>
                            <li v-else>
                                <span>{{ $t("accountsDetail.type") }}</span>
                                <span
                                    >{{ data.table_name }}
                                    <span v-if="data.take_out == 1"
                                        >#{{ $t("waidaiMsg.waidai") }}</span
                                    >
                                    <span v-if="data.is_share_order == '1'">{{
                                        $t("report.Share")
                                    }}</span>
                                </span>
                            </li>
                            <li v-show="data.code_mode == '1'">
                                <span>{{ $t("report.eatNum") }}：</span>
                                <span v-if="data.diner_num > 0">{{
                                    data.diner_num
                                }}</span>
                                <span v-else>--</span>
                            </li>
                        </div>
                        <li
                            class="top10 font14"
                            v-for="(item, index) in gotSetInfo"
                            :key="index"
                        >
                            <span>{{ item.title }}</span>
                            <span>{{ item.value }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                class="row"
                v-show="data.member_phone != '' && data.member_phone != null"
            >
                <div class="col-100">
                    <hr
                        style="background: #eaedf1; height: 6px; border: none"
                    />
                </div>
            </div>
            <div
                class="row"
                style="padding: 20px"
                v-show="data.member_phone != '' && data.member_phone != null"
            >
                <div class="col-100 color-darkbrown font14">
                    <ul>
                        <li>
                            <h4 class="font16">
                                {{ $t("orderDetail.vipMsg") }}
                            </h4>
                        </li>
                        <li>
                            <span>{{ $t("orderDetail.vipName") }}</span>
                            <span>{{ data.member_name }}</span>
                        </li>

                        <li>
                            <span>{{ $t("orderDetail.vipNum") }}</span>
                            <span>{{ data.member_phone }}</span>
                        </li>
                        <li>
                            <span>{{ $t("orderDetail.vipGrade") }}</span>
                            <span>{{ data.member_grade_name }}</span>
                        </li>
                        <li>
                            <span>{{ $t("orderDetail.vipDiscount") }}</span>
                            <span v-if="data.discount_set == '0'">{{
                                $t("orderDetail.noDiscount")
                            }}</span>
                            <span
                                v-else-if="
                                    data.discount_set == '1' ||
                                    data.discount_set == '3'
                                "
                                >{{ $t("orderDetail.vipPrice") }}</span
                            >
                            <span
                                v-else-if="
                                    data.discount_set == '2' ||
                                    data.discount_set == '4'
                                "
                                >{{ $t("orderDetail.vipZhengdan") }}
                                <span v-if="$route.query.lang == 'zh_CN'">{{
                                    full_dis_rate
                                }}</span
                                ><span v-else
                                    >{{ full_dis_rate }}off</span
                                ></span
                            >
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row" v-show="data.credit_type != null">
                <div class="col-100">
                    <hr
                        style="background: #eaedf1; height: 6px; border: none"
                    />
                </div>
            </div>
            <div
                class="row"
                :style="
                    data.credit_type == '0' || data.credit_type == '1'
                        ? 'padding: 20px'
                        : ''
                "
            >
                <div class="col-100 color-darkbrown font14">
                    <ul v-if="data.credit_type == '0'">
                        <li>
                            <h4 class="font16">{{ $t("report.gzInfo") }}</h4>
                        </li>
                        <li>
                            <span>{{ $t("report.gzUser") }}</span>
                            <span>{{ data.credit_name }}</span>
                        </li>
                        <li>
                            <span>{{ $t("report.gzPhone") }}</span>
                            <span>{{ data.credit_mobile }}</span>
                        </li>
                    </ul>
                    <ul v-if="data.credit_type == '1'">
                        <li>
                            <h4 class="font16">{{ $t("report.gzCompany") }}</h4>
                        </li>
                        <li>
                            <span>{{ $t("report.gzGonsi") }}</span>
                            <span>{{ data.credit_company_name }}</span>
                        </li>
                        <li>
                            <span>{{ $t("report.gzLianxi") }}</span>
                            <span>{{ data.credit_contact }}</span>
                        </li>
                        <li>
                            <span>{{ $t("report.gzPhone") }}</span>
                            <span>{{ data.credit_mobile }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col-100">
                    <hr
                        style="background: #eaedf1; height: 6px; border: none"
                    />
                </div>
            </div>
            <!-- 菜品信息 -->
            <div style="padding: 12px 18px 60px">
                <h4 class="color-darkbrown">
                    {{ $t("accountsDetail.dishInfo") }}
                </h4>
                <div
                    class="row center font12 top15"
                    style="border: 1px solid rgb(230, 234, 239)"
                >
                    <div
                        class="col-100 fontWeight"
                        style="
                            background: #fff9f5;
                            height: 44px;
                            line-height: 44px;
                            border-bottom: 1px solid rgb(230, 234, 239);
                        "
                    >
                        <span style="width: 50%; display: inline-block">{{
                            $t("accountsDetail.dishName")
                        }}</span>
                        <span style="width: 25%; display: inline-block">{{
                            $t("accountsDetail.dishCount")
                        }}</span>
                        <span style="width: 25%; display: inline-block">{{
                            $t("accountsDetail.dishPrice")
                        }}</span>
                    </div>
                    <div
                        class="col-100"
                        v-for="(item, index) in tabbleData"
                        :key="index"
                        style="
                            border-bottom: 1px solid rgb(230, 234, 239);
                            padding: 10px 0;
                        "
                    >
                        <div class="row">
                            <div class="col-100">
                                <span
                                    style="
                                        width: 50%;
                                        display: inline-block;
                                        text-align: left;
                                        position: relative;
                                        left: 10px;
                                    "
                                >
                                    <span>
                                        <span
                                            v-if="
                                                item.weight_spec == 4 ||
                                                item.weight_spec == 3
                                            "
                                            >{{ $t("report.Set") }}</span
                                        >
                                        {{ item.dish_name }}
                                    </span>
                                    <span
                                        v-show="
                                            item.is_take_out == 1 &&
                                            item.dish_status != 2 &&
                                            item.dish_status != 4
                                        "
                                        ><img
                                            src="../../../style/images/takeAway.png"
                                            alt=""
                                            width="10"
                                    /></span>
                                    <div
                                        v-if="item.dish_status == 3"
                                        class="labelCss left5"
                                    >
                                        {{ $t("report.Comp") }}
                                    </div>
                                    <div
                                        v-else-if="item.dish_status == 5"
                                        class="labelCss left5"
                                    >
                                        {{ $t("report.maizeng") }}
                                    </div>
                                    <div
                                        v-if="
                                            item.salepmt_type == 2 &&
                                            item.promotion_range == '1'&&
                                            item.dish_status != 3 &&
                                            item.dish_status != 6
                                            "
                                        class="labelCss left5"
                                    >
                                        {{ $t("report.tejia") }}
                                    </div>
                                    <div
                                        v-if="
                                            item.salepmt_type == 3 &&
                                            item.promotion_range == '1' &&
                                            item.dish_status != 6 &&
                                            item.dish_status != 3
                                        "
                                        class="labelCss left5"
                                    >
                                        {{ $t("report.twoSale") }}
                                    </div>
                                    <div
                                        v-else-if="item.dish_status == 6"
                                        class="labelCss left5"
                                    >
                                        {{ $t("orderDetail.dazhe") }}
                                    </div>
                                </span>
                                <span style="width: 25%; display: inline-block">
                                    <span
                                        v-if="
                                            item.weight_spec == 4 ||
                                            item.weight_spec == 3
                                        "
                                        >{{ item.dish_num | onePrice }}</span
                                    >
                                    <span v-else-if="item.weight_spec == 1"
                                        >{{ item.spec_detail
                                        }}{{ item.unit_type }}</span
                                    >
                                    <span v-else>{{ item.dish_num }}</span>
                                </span>
                                <!-- 价格 -->
                                <span style="width: 25%; display: inline-block">
                                    <span v-if="item.dish_status != 3&&item.dish_status!= 6">
                                        <!-- 特价菜 -->
                                        <span v-if="item.salepmt_type == 2&&item.promotion_range == '1'">
                                            <span v-if="item.weight_spec==1">
                                                {{(Number(item.salepmt_price)*Number(item.spec_detail) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                            </span>
                                            <span v-else>
                                                {{(Number(item.salepmt_price) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                            </span>
                                        </span>
                                        <!-- 第二份优惠 -->
                                        <span v-else-if="item.salepmt_type == 3 &&item.promotion_range == '1'">
                                            <span v-if="item.weight_spec==1">
                                                {{(Number(item.salepmt_price)*Number(item.spec_detail) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                            </span>
                                            <span v-else>
                                                {{(Number(item.salepmt_price) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                            </span>
                                        </span>
                                        <!-- 买即赠 -->     
                                        <span v-else-if="item.salepmt_type == 4&&item.promotion_range == '1'">
                                            <span v-if="item.weight_spec==1">
                                                {{(Number(item.dish_price)*Number(item.spec_detail) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                            </span>
                                            <span v-else>
                                                {{(Number(item.dish_price) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                            </span>
                                        </span>
                                        <span v-else>
                                            <span
                                                v-if="item.weight_spec==1"
                                            >
                                                {{(Number(item.original_price)*Number(item.spec_detail) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                            </span>
                                            <span 
                                                v-else
                                            >
                                                {{(Number(item.original_price) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                            </span>
                                        </span>
                                    </span>
                                    <!-- 服务员手动折扣 -->
                                    <span v-else>
                                        {{(Number(item.dish_price)+ Number(item.box_price_one))| price }}
                                    </span>
                                </span>
                                
                            </div>
                            <!-- 菜品加料 -->
                            <div
                                class="col-100"
                                v-if="
                                    tabbleData[index]
                                        .dishAdditionalSimpleVOList != null
                                "
                            >
                                <div
                                    class="row"
                                    v-for="(dishAddItem, index) in tabbleData[
                                        index
                                    ].dishAdditionalSimpleVOList"
                                    :key="index"
                                >
                                    <div
                                        class="col-100"
                                        v-if="dishAddItem.adt_num > 0"
                                        style="color: #808080"
                                    >
                                        <span
                                            class="font10"
                                            style="
                                                width: 50%;
                                                display: inline-block;
                                                text-align: left;
                                                position: relative;
                                                left: 15px;
                                            "
                                            >- {{ dishAddItem.add_name }}</span
                                        >
                                        <span
                                            style="
                                                width: 25%;
                                                display: inline-block;
                                            "
                                            >{{
                                                dishAddItem.adt_num | onePrice
                                            }}</span
                                        >
                                        <span
                                            style="
                                                width: 25%;
                                                display: inline-block;
                                            "
                                            >{{
                                                dishAddItem.price | price
                                            }}</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <!-- 菜品口味 -->
                            <div
                                class="col-100"
                                v-if="
                                    tabbleData[index].taste_set != null &&
                                    tabbleData[index].taste_set.length > 0
                                "
                            >
                                <div
                                    v-for="(taste, index) in item.taste_set"
                                    :key="index"
                                >
                                    <span
                                        class="font10 left"
                                        style="
                                            width: 50%;
                                            display: inline-block;
                                            color: #808080;
                                            position: relative;
                                            left: 15px;
                                        "
                                    >
                                        - {{ taste.name }}
                                    </span>
                                    <span
                                        style="
                                            width: 25%;
                                            display: inline-block;
                                        "
                                    ></span>
                                    <span
                                        style="
                                            width: 25%;
                                            display: inline-block;
                                        "
                                        >{{ taste.price }}</span
                                    >
                                </div>
                            </div>
                            <!-- 外带餐盒 -->
                            <div
                                class="col-100 top10"
                                v-if="tabbleData[index].box != null"
                                style="color: #808080"
                            >
                                <span
                                    style="
                                        width: 50%;
                                        display: inline-block;
                                        text-align: left;
                                        position: relative;
                                        left: 15px;
                                    "
                                    v-if="item.is_take_out == 1"
                                    >-
                                    {{ tabbleData[index].box.box_name }}</span
                                >
                                <span
                                    style="width: 25%; display: inline-block"
                                    v-if="item.is_take_out == 1"
                                    >{{ tabbleData[index].box.box_num }}</span
                                >
                                <span
                                    style="width: 25%; display: inline-block"
                                    v-if="item.is_take_out == 1"
                                    >{{
                                        tabbleData[index].box.box_price | price
                                    }}</span
                                >
                            </div>
                            <div
                                class="col-100"
                                v-if="tabbleData[index].suits_list != null"
                            >
                                <div
                                    class="row"
                                    v-for="(taocanItem, index) in tabbleData[
                                        index
                                    ].suits_list"
                                    :key="index"
                                >
                                    <div class="col-100 top10">
                                        <sapn
                                            style="
                                                width: 50%;
                                                display: inline-block;
                                                text-align: left;
                                                position: relative;
                                                left: 15px;
                                            "
                                            >- {{ taocanItem.dish_name }}
                                            <span
                                                v-if="
                                                    taocanItem.spec_name !=
                                                        '' &&
                                                    taocanItem.spec_name != null
                                                "
                                                >-{{
                                                    taocanItem.spec_name
                                                }}</span
                                            >
                                        </sapn>
                                        <span
                                            style="
                                                width: 25%;
                                                display: inline-block;
                                            "
                                            v-if="taocanItem.weight_spec == '1'"
                                        >
                                            <span
                                                v-if="
                                                    taocanItem.spec_detail !=
                                                    null
                                                "
                                                >{{ taocanItem.spec_detail
                                                }}{{
                                                    taocanItem.unit_type
                                                }}</span
                                            >
                                            <span v-else>{{
                                                taocanItem.buy_number
                                            }}</span>
                                        </span>
                                        <span
                                            style="
                                                width: 25%;
                                                display: inline-block;
                                            "
                                            v-else
                                            >{{ taocanItem.buy_number }}</span
                                        >
                                        <span
                                            style="
                                                width: 25%;
                                                display: inline-block;
                                            "
                                            >&nbsp;</span
                                        >
                                    </div>
                                    <div
                                        class="col-100"
                                        :class="
                                            taocanItem.box != null &&
                                            item.is_take_out == 1
                                                ? 'top10'
                                                : ''
                                        "
                                        v-if="
                                            taocanItem.box != null &&
                                            taocanItem.buy_number > 0
                                        "
                                        style="color: #808080"
                                    >
                                        <span
                                            style="
                                                width: 50%;
                                                display: inline-block;
                                                text-align: left;
                                                position: relative;
                                                left: 20px;
                                            "
                                            v-if="item.is_take_out == 1"
                                            >{{ taocanItem.box.box_name }}</span
                                        >
                                        <span
                                            style="
                                                width: 25%;
                                                display: inline-block;
                                            "
                                            v-if="item.is_take_out == 1"
                                            >{{ taocanItem.box.box_num }}</span
                                        >
                                        <span
                                            style="
                                                width: 25%;
                                                display: inline-block;
                                            "
                                            v-if="item.is_take_out == 1"
                                            >{{
                                                taocanItem.box.box_price | price
                                            }}</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <div
                                class="col-100"
                                v-if="tabbleData[index].optional_list != null"
                            >
                                <div
                                    v-for="(zixuanItem, i) in tabbleData[index]
                                        .optional_list"
                                    :key="i"
                                >
                                    <div
                                        class="row"
                                        v-for="(
                                            taocanItem, index
                                        ) in tabbleData[index].optional_list[i]
                                            .dishes"
                                        :key="index"
                                    >
                                        <div
                                            class="col-100 top10"
                                            v-if="taocanItem.buy_number > 0"
                                        >
                                            <span
                                                style="
                                                    width: 50%;
                                                    display: inline-block;
                                                    text-align: left;
                                                    position: relative;
                                                    left: 15px;
                                                "
                                                >- {{ taocanItem.dish_name }}
                                                <span
                                                    v-if="
                                                        taocanItem.spec_name !=
                                                            '' &&
                                                        taocanItem.spec_name !=
                                                            null
                                                    "
                                                    >-{{
                                                        taocanItem.spec_name
                                                    }}</span
                                                >
                                            </span>
                                            <span
                                                style="
                                                    width: 25%;
                                                    display: inline-block;
                                                "
                                                v-if="
                                                    taocanItem.weight_spec ==
                                                    '1'
                                                "
                                            >
                                                <span
                                                    v-if="
                                                        taocanItem.spec_detail !=
                                                        null
                                                    "
                                                    >{{ taocanItem.spec_detail
                                                    }}{{
                                                        taocanItem.unit_type
                                                    }}</span
                                                >
                                                <span v-else>{{
                                                    taocanItem.buy_number
                                                }}</span>
                                            </span>
                                            <span
                                                style="
                                                    width: 25%;
                                                    display: inline-block;
                                                "
                                                v-else
                                                >{{
                                                    taocanItem.buy_number
                                                }}</span
                                            >
                                            <span
                                                style="
                                                    width: 25%;
                                                    display: inline-block;
                                                "
                                                >&nbsp;</span
                                            >
                                        </div>
                                        <div
                                            class="col-100"
                                            :class="
                                                taocanItem.box != null &&
                                                item.is_take_out == 1
                                                    ? 'top10'
                                                    : ''
                                            "
                                            v-if="
                                                taocanItem.box != null &&
                                                taocanItem.buy_number > 0
                                            "
                                            style="color: #808080"
                                        >
                                            <span
                                                style="
                                                    width: 50%;
                                                    display: inline-block;
                                                    text-align: left;
                                                    position: relative;
                                                    left: 20px;
                                                "
                                                v-if="item.is_take_out == 1"
                                                >{{
                                                    taocanItem.box.box_name
                                                }}</span
                                            >
                                            <span
                                                style="
                                                    width: 25%;
                                                    display: inline-block;
                                                "
                                                v-if="item.is_take_out == 1"
                                                >{{
                                                    taocanItem.box.box_num
                                                }}</span
                                            >
                                            <span
                                                style="
                                                    width: 25%;
                                                    display: inline-block;
                                                "
                                                v-if="item.is_take_out == 1"
                                                >{{
                                                    taocanItem.box.box_price
                                                        | price
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 菜品备注 -->
                            <div
                                class="col-100"
                                v-if="
                                    (tabbleData[index].dish_chosen_notes !=
                                        null &&
                                        tabbleData[index].dish_chosen_notes
                                            .length > 0) ||
                                    (tabbleData[index].dish_remark != '' &&
                                        tabbleData[index].dish_remark != null)
                                "
                            >
                                <span
                                    class="font10 left"
                                    style="
                                        width: 50%;
                                        display: inline-block;
                                        color: #808080;
                                        position: relative;
                                        left: 15px;
                                    "
                                    >{{ $t("report.note") }}
                                    <span>{{ item.dish_chosen_notes }}</span>
                                    <span
                                        v-if="
                                            item.dish_chosen_notes != '' &&
                                            tabbleData[index].dish_remark != ''
                                        "
                                        >/</span
                                    >
                                    {{ item.dish_remark }}</span
                                >
                                <span
                                    style="width: 25%; display: inline-block"
                                ></span>
                                <span
                                    style="width: 25%; display: inline-block"
                                ></span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="col-100 left"
                        style="
                            height: 50px;
                            line-height: 50px;
                            padding-left: 17px;
                        "
                    >
                        {{ $t("report.remark") }} {{ data.notes | text }}
                    </div>
                </div>
            </div>
        </div>
        <!-- 外卖--详情 -->
        <div
            class="font12"
            style="background: #f6f8fa; padding: 15px"
            v-if="takeoutFlag == 1"
        >
            <!-- 退款详情 -->
            <div
                class="row no-gutter"
                style="background: #ffffff; padding: 15px"
                v-show="data.order_status == 3"
            >
                <div class="col-100">
                    <div
                        class="row no-gutter"
                        style="
                            border-bottom: 1px #f0f0f0 solid;
                            padding-bottom: 20px;
                        "
                    >
                        <div
                            class="col-100 font14 fontWeight"
                            style="color: #232426"
                        >
                            <span class="priceStyle">{{
                                (data.total_price - data.refund_price) | price
                            }}</span>
                            <span>=</span>
                            <span class="priceStyle">{{
                                data.total_price | price
                            }}</span>
                            <span>-</span>
                            <span class="priceStyle">{{
                                data.refund_price | price
                            }}</span>
                        </div>
                        <div
                            class="col-100 font12 top10"
                            style="color: #8c939b"
                        >
                            <span class="priceStyle">{{
                                $t("report.jingshou")
                            }}</span>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <span class="priceStyle">{{
                                $t("report.shishoue")
                            }}</span>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <span class="priceStyle">{{
                                $t("accountsDetail.tuikuan")
                            }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-100 top20">
                    <ul>
                        <li class="row no-gutter">
                            <div class="col-50">
                                <span
                                    >{{
                                        $t("takeoutOrder.shenqingTime")
                                    }}：</span
                                ><span>{{ data.refund_apply_time }}</span>
                            </div>
                            <div class="col-50">
                                <span
                                    >{{ $t("takeoutOrder.orderState") }}：</span
                                ><span>{{ data.order_status_name }}</span>
                            </div>
                        </li>
                        <li>
                            <span>{{ $t("takeoutOrder.refundAmount") }}：</span
                            ><span>{{ data.refund_price | price }}</span>
                        </li>
                        <li>
                            <span
                                >{{ $t("takeoutOrder.refund_reason") }}：</span
                            >
                            <span>{{ data.refund_reason }}</span>
                            <span
                                class="left10"
                                style="color: #eb3c1c"
                                @click="detailsBtn(data.order_id_show)"
                                >{{ $t("takeoutOrder.detail") }}
                                <img
                                    src="../../../style/images/detail.png"
                                    alt=""
                                    width="7"
                                    style="position: relative; top: 2px"
                            /></span>
                        </li>
                        <li>
                            <span>{{ $t("takeoutOrder.refundTime") }}：</span
                            ><span>{{ data.refund_time }}</span>
                        </li>
                        <li>
                            <span>{{ $t("takeoutOrder.refundPeople") }}：</span
                            ><span>{{ data.refund_people_name }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 订单号（已完成，已退款，已取消） -->
            <div
                class="row top20 no-gutter"
                style="background: #ffffff; padding: 15px"
            >
                <div class="col-100">
                    <ul>
                        <li v-for="(item, index) in orderFinish" :key="index">
                            <span>{{ item.title }}</span>
                            <span>{{ item.value }}</span>
                        </li>
                        <li><hr style="border: 1px dotted #666666" /></li>
                    </ul>
                    <ul class="center">
                        <li class="row font14 fontWeight no-gutter">
                            <span class="col-33">{{
                                $t("takeoutOrder.dish")
                            }}</span>
                            <span class="col-33">{{
                                $t("takeoutOrder.count")
                            }}</span>
                            <span class="col-33">{{
                                $t("takeoutOrder.amount")
                            }}</span>
                        </li>
                        <li
                            class="row no-gutter"
                            v-for="(item, index) in tabbleData"
                            :key="index"
                        >
                            <span class="col-33">{{ item.dish_name }}</span>
                            <span class="col-33" v-if="item.weight_spec == 1"
                                >{{ item.spec_detail | price }}
                                {{ item.unit_type }}</span
                            >
                            <span class="col-33" v-else>{{
                                item.dish_num
                            }}</span>
                            <span class="col-33">{{
                                item.dish_price | price
                            }}</span>
                        </li>
                        <li class="row no-gutter" style="text-align: right">
                            <div class="col-100 fontWeight font14">
                                <span>{{ $t("takeoutOrder.dishTotal") }}：</span
                                ><span>{{ data.total_price | price }}</span>
                            </div>
                        </li>
                        <li><hr style="border: 1px dotted #666666" /></li>
                    </ul>

                    <ul>
                        <li class="row no-gutter">
                            <div
                                class="col-50"
                                v-for="(item, index) in orderFeiyong"
                                :key="index"
                            >
                                <span>{{ item.title }}</span
                                ><span>{{ item.value }}</span>
                            </div>
                        </li>
                        <li class="row no-gutter" style="text-align: right">
                            <div class="col-100 fontWeight font14">
                                <span
                                    >{{
                                        $t("takeoutOrder.shishouAmount")
                                    }}：</span
                                ><span>{{ data.total_price | price }}</span>
                            </div>
                        </li>
                        <li><hr style="border: 1px dotted #666" /></li>
                    </ul>

                    <ul>
                        <li class="fontWeight font14">
                            <span>{{ $t("takeoutOrder.payType") }}：</span
                            ><span>{{ title }}</span
                            ><span v-show="data.order_status != 2">{{
                                $t("takeoutOrder.pay")
                            }}</span
                            ><span v-show="data.order_status == 2">{{
                                $t("takeoutOrder.Unpay")
                            }}</span>
                        </li>
                        <li v-for="(item, index) in orderPay" :key="index">
                            <span>{{ item.title }}</span
                            ><span>{{ item.value }}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div
                class="row no-gutter top20"
                style="background: #ffffff; padding: 15px"
            >
                <div class="col-100">
                    <ul>
                        <li class="fontWeight font14">
                            <span>{{ $t("takeoutOrder.gukeDetail") }}</span>
                        </li>
                        <li v-for="(item, index) in customerInfo" :key="index">
                            <span>{{ item.title }}</span
                            ><span>{{ item.value }}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div
                class="row no-gutter top20"
                style="background: #fff; padding: 15px"
                v-show="
                    data.order_status == 1 &&
                    data.order_status == 3 &&
                    data.order_status == 0
                "
            >
                <div class="col-100">
                    <ul>
                        <li class="fontWeight font14">
                            <span>{{ $t("takeoutOrder.peisongTime") }}</span>
                        </li>
                        <li v-for="(item, index) in deliveryInfo" :key="index">
                            <span>{{ item.title }}</span
                            ><span>{{ item.value }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SetorderDetail",
    computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
    },
    data() {
        return {
            data: { notes: null, order_status: 0 },
            tabbleData: null,
            refundClick: false,
            title: "",
            titleChedan: "",
            takeoutFlag: 0,

            gotPriceInfo: null,
            gotdishInfo: null,
            gotSetInfo: null,
            returnInfo: null,
            orderFinish: null, //订单号已完成
            orderFeiyong: null, //订单费用
            orderPay: null, //订单支付方式
            customerInfo: null, //顾客信息
            deliveryInfo: null, //配送信息
            pay_typeDic: null,
            pay_typeValue: null,
            returnDishLoading: false,
            backdishOptions: [],
            gotfuwuInfo: null,
            gotshoukuanInfo: null,
            dishPmtData: {},
            pmtTemp: null,
            pmtValue: {
                on_sale: this.$t("report.dishTejia"),
                member_price: this.$t("report.dishVIP"),
                xoff2nd: this.$t("report.dishTwo"),
                buy_give: this.$t("report.dishBuy"),
                discount: this.$t("report.zhengdanOff"),
                reduce: this.$t("report.zidingyi"),
                manual_give: this.$t("report.shoudongzengcai"),
                point_user: this.$t("report.vipjifen"),
                coupon: this.$t("report.copon"),
                manual_discount: this.$t("report.shoudongOff"),
            },
            gotchedanInfo: null,
            gotjudanInfo: null,
            pmtType: "",
            takeCodeFood: "",
            takeCode: [],
            sliceTake: "",
            pmtName: "",
            full_dis_rate: 0,
            tasteList: "",
            dishNotes: [],
        };
    },
    methods: {
        // 退款详情
        detailsBtn(order_id_show) {
            let that = this;
            this.$router.push({
                //你需要接受路由的参数再跳转
                path: "/takeoutRefund",
                query: { id: order_id_show },
            });
        },
        
        getDishSet() {
            let that = this;
            let data = {
                dept_id: this.$route.query.dep_ID,
                token: this.$route.query.token,
            };
            this.request.selectDishSet(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        let temp = JSON.parse(res.data.deal_item);
                        let arr;
                        if (JSON.stringify(temp) != "{}") {
                            arr = temp["backdish"]["list"];
                        }

                        for (var i in arr) {
                            that.backdishOptions.push({
                                value: arr[i],
                                label: arr[i],
                            });
                        }
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },

        getData() {
            let that = this;
            let data = {
                order_id: this.$route.query.id, //订单id ,
                token: this.$route.query.token,
            };
            this.request.details(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        that.data = res.data;
                        that.sliceTake = that.data.take_food_code.slice(1);
                        let str = Number(that.data.full_dis_rate * 100);
                        str += "%";
                        that.full_dis_rate = str;
                        that.takeCode[0] =
                            Math.floor(that.data.take_food_code / 1000) % 10;
                        that.takeCode[1] =
                            Math.floor(that.data.take_food_code / 100) % 10;
                        that.takeCode[2] =
                            Math.floor(that.data.take_food_code / 10) % 10;
                        that.takeCode[3] = that.data.take_food_code % 10;
                        that.takeCodeFood =
                            that.takeCode[0] +
                            "" +
                            that.takeCode[1] +
                            "" +
                            that.takeCode[2] +
                            "" +
                            that.takeCode[3];
                        // promotions(菜品优惠--pmt_type:'dish'，结账优惠--pmt_type:'order')
                        that.pmtTemp = that.data.promotions;
                        for (let j in that.pmtTemp) {
                            that.pmtType = that.pmtTemp[j].pmt_type;
                            that.pmtName = that.pmtTemp[j].pmt_name;
                        }
                        console.log(that.data);
                        //0未付款，1已付款,2已撤单，3退款 ,
                        that.data.orderStates = [
                            that.$t("orderDetail.weifukuan"),
                            that.$t("orderDetail.yifukuan"),
                            that.$t("orderDetail.yichedan"),
                            that.$t("orderDetail.youtuikuan"),
                            that.$t("orderDetail.Refused"),
                            that.$t("orderDetail.Refused"),
                        ][that.data.order_status];
                        that.data.waiterService = [
                            that.$t("orderDetail.saoma"),
                            that.$t("orderDetail.shouyin"),
                        ][that.data.waiter_service];
                        that.setData();
                        that.setReturnData();
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        setData() {
            var arr = [];
            for (var i in this.data.dish_data) {
                if (
                    this.data.dish_data[i].dish_status == 2 ||
                    this.data.dish_data[i].dish_status == 4
                ) {
                    this.data.dish_data[i].dish_name =
                        this.$t("accountsDetail.return") +
                        this.data.dish_data[i].dish_name;
                } else if (this.data.dish_data[i].discount_set == "1") {
                    this.data.dish_data[i].dish_name =
                        "(会)" + this.data.dish_data[i].dish_name;
                }
                arr.push(this.data.dish_data[i]);
            }
            this.tabbleData = arr;

            if (this.takeoutFlag == 0) {
                if (
                    this.data.order_status == 1 ||
                    this.data.order_status == 3
                ) {
                    this.gotSetInfo = [
                        {
                            title: this.$t("accountsDetail.orderNum"),
                            value: this.data.order_id_show,
                        },
                        {
                            title: this.$t("accountsDetail.orderState"),
                            value: this.data.orderStates,
                        },
                        {
                            title: this.$t("accountsDetail.orderPeople"),
                            value: this.data.nick_name,
                        },
                        {
                            title: this.$t("accountsDetail.orderTime"),
                            value: this.data.create_time,
                        },
                        {
                            title: this.$t("accountsDetail.payOrderPeople"),
                            value: this.data.pay_operator_name,
                        },
                        {
                            title: this.$t("accountsDetail.payTime"),
                            value: this.data.pay_time,
                        },
                    ];
                } else {
                    this.gotSetInfo = [
                        {
                            title: this.$t("accountsDetail.orderNum"),
                            value: this.data.order_id_show,
                        },
                        {
                            title: this.$t("accountsDetail.orderState"),
                            value: this.data.orderStates,
                        },
                        {
                            title: this.$t("accountsDetail.orderPeople"),
                            value: this.data.nick_name,
                        },
                        {
                            title: this.$t("accountsDetail.orderTime"),
                            value: this.data.create_time,
                        },
                    ];
                }

                //0未付款，1已付款,2已撤单,3已退款，默认为0 ,
                if (this.data.order_status == 0) {
                    this.title = this.$t("accountsDetail.quiInfo");
                    this.dishTotal = this.$t("report.dishTotal");
                    this.dishTotalValue = this.stringutils.formatPrice(
                        this.data.dish_original_total_price
                    );
                    this.dishDis = this.$t("report.dishPmt");
                    this.dishDisValue = this.stringutils.formatPrice(
                        this.data.total_dish_pmt_price
                    );
                    this.orderCount = this.$t("orderDetail.orderPrice");
                    this.orderCountValue = this.stringutils.formatPrice(
                        this.data.should_pay
                    );
                    this.jiezhangTitle = this.$t("report.jiezhangPmt");
                    this.jiezhangValue = this.stringutils.formatPrice(
                        this.data.total_off
                    );
                    this.gotfuwuInfo = [
                        {
                            title:
                                this.$t("accountsDetail.SST") +
                                this.data.taxes_rate +
                                "%：",
                            value: this.stringutils.formatPrice(
                                this.data.sst_price
                            ),
                        },
                        {
                            title: `${this.$t("accountsDetail.SC")}${
                                this.data.cost_rate
                            }%：${
                                this.data.take_out_service_charge == 1
                                    ? ""
                                    : Number(this.data.total_take_price) > 0
                                    ? "(" +
                                      this.stringutils.formatPrice(
                                          this.data.total_take_price
                                      ) +
                                      this.$t("accountsDetail.excludePro") +
                                      ")"
                                    : ""
                            }`,
                            value: this.stringutils.formatPrice(
                                this.data.server_price
                            ),
                        },
                    ];
                    this.gotshoukuanInfo = [
                        {
                            title: this.$t("accountsDetail.shouldMoney"),
                            value: this.stringutils.formatPrice(
                                this.data.is_pay
                            ),
                        },
                    ];
                } else if (this.data.order_status == 1) {
                    this.title = this.$t("accountsDetail.quiInfo");
                    this.dishTotal = this.$t("report.dishTotal");
                    this.dishTotalValue = this.stringutils.formatPrice(
                        this.data.dish_original_total_price
                    );
                    this.dishDis = this.$t("report.dishPmt");
                    this.dishDisValue = this.stringutils.formatPrice(
                        this.data.total_dish_pmt_price
                    );
                    this.orderCount = this.$t("orderDetail.orderPrice");
                    this.orderCountValue = this.stringutils.formatPrice(
                        this.data.should_pay
                    );
                    this.jiezhangTitle = this.$t("report.jiezhangPmt");
                    this.jiezhangValue = this.stringutils.formatPrice(
                        this.data.total_off
                    );
                    this.shishouTitle =
                        this.$t("payreport.shishouAmount") + "：";
                    this.shishouValue = this.stringutils.formatPrice(
                        this.data.total_price
                    );
                    this.gotfuwuInfo = [
                        {
                            title:
                                this.$t("accountsDetail.SST") +
                                this.data.taxes_rate +
                                "%：",
                            value: this.stringutils.formatPrice(
                                this.data.sst_price
                            ),
                        },
                        {
                            title: `${this.$t("accountsDetail.SC")}${
                                this.data.cost_rate
                            }%：${
                                this.data.take_out_service_charge == 1
                                    ? ""
                                    : Number(this.data.total_take_price) > 0
                                    ? "(" +
                                      this.stringutils.formatPrice(
                                          this.data.total_take_price
                                      ) +
                                      this.$t("accountsDetail.excludePro") +
                                      ")"
                                    : ""
                            }`,
                            value: this.stringutils.formatPrice(
                                this.data.server_price
                            ),
                        },
                    ];
                    this.gotshoukuanInfo = [
                        {
                            title: this.$t("accountsDetail.shouldMoney"),
                            value: this.stringutils.formatPrice(
                                this.data.is_pay
                            ),
                        },
                    ];
                } else if (this.data.order_status == 2) {
                    this.titleChedan = this.$t("report.chedanInfo");
                    this.gotchedanInfo = [
                        {
                            title: this.$t("accountsDetail.chedangTime"),
                            value: this.stringutils.formatEmpty(
                                this.data.withdraw_time
                            ),
                        },
                        {
                            title: this.$t("accountsDetail.chedangWhy"),
                            value: this.stringutils.formatEmpty(
                                this.data.withdraw_reason
                            ),
                        },
                        {
                            title: this.$t("accountsDetail.chedangPeople"),
                            value: this.stringutils.formatEmpty(
                                this.data.withdraw_operator_name
                            ),
                        },
                    ];
                    this.title = this.$t("accountsDetail.quiInfo");
                    this.dishTotal = this.$t("report.dishTotal");
                    this.dishTotalValue = this.stringutils.formatPrice(
                        this.data.dish_original_total_price
                    );
                    this.dishDis = this.$t("report.dishPmt");
                    this.dishDisValue = this.stringutils.formatPrice(
                        this.data.total_dish_pmt_price
                    );
                    this.orderCount = this.$t("orderDetail.orderPrice");
                    this.orderCountValue = this.stringutils.formatPrice(
                        this.data.should_pay
                    );
                    this.jiezhangTitle = this.$t("report.jiezhangPmt");
                    this.jiezhangValue = this.stringutils.formatPrice(
                        this.data.total_off
                    );
                    this.gotfuwuInfo = [
                        {
                            title:
                                this.$t("accountsDetail.SST") +
                                this.data.taxes_rate +
                                "%：",
                            value: this.stringutils.formatPrice(
                                this.data.sst_price
                            ),
                        },
                        {
                            title: `${this.$t("accountsDetail.SC")}${
                                this.data.cost_rate
                            }%：${
                                this.data.take_out_service_charge == 1
                                    ? ""
                                    : Number(this.data.total_take_price) > 0
                                    ? "(" +
                                      this.stringutils.formatPrice(
                                          this.data.total_take_price
                                      ) +
                                      this.$t("accountsDetail.excludePro") +
                                      ")"
                                    : ""
                            }`,
                            value: this.stringutils.formatPrice(
                                this.data.server_price
                            ),
                        },
                    ];
                    this.gotshoukuanInfo = [
                        {
                            title: this.$t("accountsDetail.shouldMoney"),
                            value: this.stringutils.formatPrice(
                                this.data.is_pay
                            ),
                        },
                    ];
                } else if (this.data.order_status == 3) {
                    this.title = this.$t("accountsDetail.quiInfo");
                    this.dishTotal = this.$t("report.dishTotal");
                    this.dishTotalValue = this.stringutils.formatPrice(
                        this.data.dish_original_total_price
                    );
                    this.dishDis = this.$t("report.dishPmt");
                    this.dishDisValue = this.stringutils.formatPrice(
                        this.data.total_dish_pmt_price
                    );
                    this.orderCount = this.$t("orderDetail.orderPrice");
                    this.orderCountValue = this.stringutils.formatPrice(
                        this.data.should_pay
                    );
                    this.jiezhangTitle = this.$t("report.jiezhangPmt");
                    this.jiezhangValue = this.stringutils.formatPrice(
                        this.data.total_off
                    );
                    this.shishouTitle =
                        this.$t("payreport.shishouAmount") + "：";
                    this.shishouValue = this.stringutils.formatPrice(
                        this.data.total_price
                    );
                    this.gotfuwuInfo = [
                        {
                            title:
                                this.$t("accountsDetail.SST") +
                                this.data.taxes_rate +
                                "%：",
                            value: this.stringutils.formatPrice(
                                this.data.sst_price
                            ),
                        },
                        {
                            title: `${this.$t("accountsDetail.SC")}${
                                this.data.cost_rate
                            }%：${
                                this.data.take_out_service_charge == 1
                                    ? ""
                                    : Number(this.data.total_take_price) > 0
                                    ? "(" +
                                      this.stringutils.formatPrice(
                                          this.data.total_take_price
                                      ) +
                                      this.$t("accountsDetail.excludePro") +
                                      ")"
                                    : ""
                            }`,
                            value: this.stringutils.formatPrice(
                                this.data.server_price
                            ),
                        },
                    ];
                    this.gotshoukuanInfo = [
                        {
                            title: this.$t("accountsDetail.shouldMoney"),
                            value: this.stringutils.formatPrice(
                                this.data.is_pay
                            ),
                        },
                    ];
                } else if (this.data.order_status == 4) {
                    this.judanTitle = this.$t("orderDetail.RefusedMsg");
                    this.title = this.$t("accountsDetail.quiInfo");
                    this.dishTotal = this.$t("report.dishTotal");
                    this.dishTotalValue = this.stringutils.formatPrice(
                        this.data.dish_original_total_price
                    );
                    this.dishDis = this.$t("report.dishPmt");
                    this.dishDisValue = this.stringutils.formatPrice(
                        this.data.total_dish_pmt_price
                    );
                    this.orderCount = this.$t("orderDetail.orderPrice");
                    this.orderCountValue = this.stringutils.formatPrice(
                        this.data.should_pay
                    );
                    this.jiezhangTitle = this.$t("report.jiezhangPmt");
                    this.jiezhangValue = this.stringutils.formatPrice(
                        this.data.total_off
                    );
                    this.shishouTitle =
                        this.$t("payreport.shishouAmount") + "：";
                    this.shishouValue = this.stringutils.formatPrice(
                        this.data.total_price
                    );
                    this.gotfuwuInfo = [
                        {
                            title:
                                this.$t("accountsDetail.SST") +
                                this.data.taxes_rate +
                                "%：",
                            value: this.stringutils.formatPrice(
                                this.data.sst_price
                            ),
                        },
                        {
                            title: `${this.$t("accountsDetail.SC")}${
                                this.data.cost_rate
                            }%：${
                                this.data.take_out_service_charge == 1
                                    ? ""
                                    : Number(this.data.total_take_price) > 0
                                    ? "(" +
                                      this.stringutils.formatPrice(
                                          this.data.total_take_price
                                      ) +
                                      this.$t("accountsDetail.excludePro") +
                                      ")"
                                    : ""
                            }`,
                            value: this.stringutils.formatPrice(
                                this.data.server_price
                            ),
                        },
                    ];
                    this.gotjudanInfo = [
                        {
                            title: this.$t("orderDetail.RefusedTime"),
                            value: this.stringutils.formatEmpty(
                                this.data.reject_time
                            ),
                        },
                        {
                            title: this.$t("orderDetail.RefusedReason"),
                            value: this.stringutils.formatEmpty(
                                this.data.reject_reason
                            ),
                        },
                        {
                            title: this.$t("orderDetail.caozuoren"),
                            value: this.stringutils.formatEmpty(
                                this.data.waiter_name
                            ),
                        },
                    ];
                    this.gotshoukuanInfo = [
                        {
                            title: this.$t("accountsDetail.shouldMoney"),
                            value: this.stringutils.formatPrice(
                                this.data.is_pay
                            ),
                        },
                    ];
                } else if (this.data.order_status == 5) {
                    this.judanTitle = this.$t("orderDetail.RefusedMsg");
                    this.title = this.$t("accountsDetail.quiInfo");
                    this.dishTotal = this.$t("report.dishTotal");
                    this.dishTotalValue = this.stringutils.formatPrice(
                        this.data.dish_original_total_price
                    );
                    this.dishDis = this.$t("report.dishPmt");
                    this.dishDisValue = this.stringutils.formatPrice(
                        this.data.total_dish_pmt_price
                    );
                    this.orderCount = this.$t("orderDetail.orderPrice");
                    this.orderCountValue = this.stringutils.formatPrice(
                        this.data.should_pay
                    );
                    this.jiezhangTitle = this.$t("report.jiezhangPmt");
                    this.jiezhangValue = this.stringutils.formatPrice(
                        this.data.total_off
                    );
                    this.shishouTitle =
                        this.$t("payreport.shishouAmount") + "：";
                    this.shishouValue = this.stringutils.formatPrice(
                        this.data.total_price
                    );
                    this.gotfuwuInfo = [
                        {
                            title:
                                this.$t("accountsDetail.SST") +
                                this.data.taxes_rate +
                                "%：",
                            value: this.stringutils.formatPrice(
                                this.data.sst_price
                            ),
                        },
                        {
                            title: `${this.$t("accountsDetail.SC")}${
                                this.data.cost_rate
                            }%：${
                                this.data.take_out_service_charge == 1
                                    ? ""
                                    : Number(this.data.total_take_price) > 0
                                    ? "(" +
                                      this.stringutils.formatPrice(
                                          this.data.total_take_price
                                      ) +
                                      this.$t("accountsDetail.excludePro") +
                                      ")"
                                    : ""
                            }`,
                            value: this.stringutils.formatPrice(
                                this.data.server_price
                            ),
                        },
                    ];
                    this.gotshoukuanInfo = [
                        {
                            title: this.$t("accountsDetail.shouldMoney"),
                            value: this.stringutils.formatPrice(
                                this.data.is_pay
                            ),
                        },
                    ];
                    this.gotjudanInfo = [
                        {
                            title: this.$t("orderDetail.RefusedTime"),
                            value: this.stringutils.formatEmpty(
                                this.data.reject_time
                            ),
                        },
                        {
                            title: this.$t("orderDetail.RefusedReason"),
                            value: this.stringutils.formatEmpty(
                                this.data.reject_reason
                            ),
                        },
                        {
                            title: this.$t("accountsDetail.returnPrice_"),
                            value: this.stringutils.formatPrice(
                                this.data.refund_price
                            ),
                        },
                        {
                            title: this.$t("accountsDetail.returnType"),
                            value: this.stringutils.formatEmpty(
                                this.data.refund_type_name
                            ),
                        },
                        {
                            title: this.$t("orderDetail.caozuoren"),
                            value: this.stringutils.formatEmpty(
                                this.data.waiter_name
                            ),
                        },
                    ];
                }

                this.returnInfo = [
                    {
                        title: this.$t("accountsDetail.tuikuanshijian"),
                        value: this.stringutils.formatEmpty(
                            this.data.refund_time
                        ),
                    },
                    {
                        title: this.$t("accountsDetail.returnType"),
                        value: this.data.refund_type_name,
                    },
                    {
                        title: this.$t("accountsDetail.returnWhy"),
                        value: this.stringutils.formatEmpty(
                            this.data.refund_reason
                        ),
                    },
                    {
                        title: this.$t("accountsDetail.tuikuanPeople"),
                        value: this.stringutils.formatEmpty(
                            this.data.refund_people_name
                        ),
                    },
                ];
            } else if (this.takeoutFlag == 1) {
                if (
                    this.data.order_status == 1 ||
                    this.data.order_status == 3
                ) {
                    this.title = this.data.pay_type_name;
                    // 订单
                    this.orderFinish = [
                        {
                            title: this.$t("takeoutOrder.order_id") + ":",
                            value: this.data.order_id_show,
                        },
                        {
                            title: this.$t("takeoutOrder.jiedanTime") + ":",
                            value: this.data.accept_time,
                        },
                        {
                            title: this.$t("takeoutOrder.jiedanPeope") + ":",
                            value: this.data.waiter_name,
                        },
                    ];
                    // 包装费用
                    this.orderFeiyong = [
                        {
                            title:
                                this.$t("accountsDetail.SST") +
                                this.data.taxes_rate +
                                "%：",
                            value: this.stringutils.formatPrice(
                                this.data.sst_price
                            ),
                        },
                        {
                            title:
                                this.$t("takeoutOrder.baozhuangAmount") + ":",
                            value: this.stringutils.formatPrice(
                                this.data.packing_fee
                            ),
                        },
                        {
                            title: this.$t("takeoutOrder.peisongAmount") + ":",
                            value: this.stringutils.formatPrice(
                                this.data.delivery_fee
                            ),
                        },
                        {
                            title: this.$t("takeoutOrder.yunfeiLittle") + ":",
                            value: this.stringutils.formatPrice(
                                this.data.freight_relief
                            ),
                        },
                        {
                            title: this.$t("takeoutOrder.shoudan") + ":",
                            value: this.stringutils.formatPrice(
                                this.data.first_discount
                            ),
                        },
                    ];
                    this.deliveryInfo = [
                        {
                            title: this.$t("takeoutOrder.peisongFuwu") + ":",
                            value: this.data.delivery_type,
                        },
                        {
                            title: this.$t("takeoutOrder.peisongPeople") + ":",
                            value: this.data.delivery_ride_name,
                        },
                        {
                            title: this.$t("takeoutOrder.peisongCount") + ":",
                            value: this.stringutils.formatPrice(
                                this.data.delivery_fee
                            ),
                        },
                        {
                            title: this.$t("takeoutOrder.quhuoTime") + ":",
                            value: this.data.get_goods_time,
                        },
                        {
                            title: this.$t("takeoutOrder.songdaTime") + ":",
                            value: this.data.reach_time,
                        },
                        {
                            title: this.$t("takeoutOrder.shouhuoTime") + ":",
                            value: this.data.check_time,
                        },
                    ];
                } else {
                    this.orderFinish = [
                        {
                            title: this.$t("takeoutOrder.order_id") + ":",
                            value: this.data.order_id,
                        },
                        {
                            title: this.$t("takeoutOrder.jiedanTime") + ":",
                            value: this.data.accept_time,
                        },
                    ];
                    // 包装费用
                    this.orderFeiyong = [
                        {
                            title:
                                this.$t("accountsDetail.SST") +
                                this.data.taxes_rate +
                                "%：",
                            value: this.stringutils.formatPrice(
                                this.data.sst_price
                            ),
                        },
                        {
                            title:
                                this.$t("takeoutOrder.baozhuangAmount") + ":",
                            value: this.stringutils.formatPrice(
                                this.data.packing_fee
                            ),
                        },
                        {
                            title: this.$t("takeoutOrder.peisongAmount") + ":",
                            value: this.stringutils.formatPrice(
                                this.data.delivery_fee
                            ),
                        },
                        {
                            title: this.$t("takeoutOrder.yunfeiLittle") + ":",
                            value: this.stringutils.formatPrice(
                                this.data.freight_relief
                            ),
                        },
                        {
                            title: this.$t("takeoutOrder.shoudan") + ":",
                            value: this.stringutils.formatPrice(
                                this.data.first_discount
                            ),
                        },
                    ];
                }

                //订单状态,传空查全部,1已付款,2已退款,3取消
                if (this.data.order_status == 1) {
                    this.orderPay = [
                        {
                            title: this.$t("takeoutOrder.payTime") + ":",
                            value: this.data.pay_time,
                        },
                        {
                            title: this.$t("takeoutOrder.zhizuodanTime") + ":",
                            value: this.data.make_list_time,
                        },
                        {
                            title: this.$t("takeoutOrder.xiaopiaoTime") + ":",
                            value: this.data.brief_bill_time,
                        },
                    ];
                    this.customerInfo = [
                        {
                            title: this.$t("takeoutOrder.gukeDetail") + ":",
                            value:
                                this.data.cust_concat_name +
                                " / " +
                                this.data.cust_concat_mobile +
                                " / " +
                                this.data.cust_address,
                        },
                        {
                            title: this.$t("takeoutOrder.gukeNote") + ":",
                            value: this.data.notes,
                        },
                        {
                            title: this.$t("takeoutOrder.canjuCount") + ":",
                            value: this.data.tableware_num,
                        },
                        {
                            title: this.$t("takeoutOrder.peisongTime") + ":",
                            value: this.data.delivery_time,
                        },
                    ];
                } else if (this.data.order_status == 3) {
                    (this.orderPay = []),
                        (this.customerInfo = [
                            {
                                title: this.$t("takeoutOrder.gukeDetail") + ":",
                                value:
                                    this.data.cust_concat_name +
                                    " / " +
                                    this.data.cust_concat_mobile +
                                    " / " +
                                    this.data.cust_address,
                            },
                            {
                                title: this.$t("takeoutOrder.gukeNote") + ":",
                                value: this.data.notes,
                            },
                            {
                                title: this.$t("takeoutOrder.canjuCount") + ":",
                                value: this.data.tableware_num,
                            },
                            {
                                title:
                                    this.$t("takeoutOrder.peisongTime") + ":",
                                value: this.data.delivery_time,
                            },
                        ]);
                } else if (this.data.order_status == 2) {
                    this.customerInfo = [
                        {
                            title: this.$t("takeoutOrder.gukeDetail") + ":",
                            value:
                                this.data.cust_concat_name +
                                " / " +
                                this.data.cust_concat_mobile +
                                " / " +
                                this.data.cust_address,
                        },
                        {
                            title: this.$t("takeoutOrder.gukeNote") + ":",
                            value: this.data.notes,
                        },
                        {
                            title: this.$t("takeoutOrder.canjuCount") + ":",
                            value: this.data.tableware_num,
                        },
                        {
                            title: this.$t("takeoutOrder.peisongTime") + ":",
                            value: this.data.delivery_time,
                        },
                    ];
                }
            }
            var tasteArr = [];
            for (var d in this.tabbleData) {
                for (var t in this.tabbleData[d].taste_set) {
                    for (var l in this.tabbleData[d].taste_set[t].taste_list) {
                        if (
                            this.tabbleData[d].taste_set[t].taste_list[l]
                                .checked == true
                        ) {
                            if (
                                this.tabbleData[d].taste_set[t].taste_list[l]
                                    .need_i18n == 1
                            ) {
                                if (this.$route.query.lang == "en_US") {
                                    tasteArr.push({
                                        name: this.tabbleData[d].taste_set[t]
                                            .taste_list[l].name_en,
                                        price:
                                            Number(
                                                this.tabbleData[d].taste_set[t]
                                                    .taste_list[l].the_price
                                            ) == 0
                                                ? ""
                                                : this.stringutils.formatPrice(
                                                      this.tabbleData[d]
                                                          .taste_set[t]
                                                          .the_price
                                                  ),
                                    });
                                } else if (this.$route.query.lang == "ms_MY") {
                                    tasteArr.push({
                                        name: this.tabbleData[d].taste_set[t]
                                            .taste_list[l].name_my,
                                        price:
                                            Number(
                                                this.tabbleData[d].taste_set[t]
                                                    .taste_list[l].the_price
                                            ) == 0
                                                ? ""
                                                : this.stringutils.formatPrice(
                                                      this.tabbleData[d]
                                                          .taste_set[t]
                                                          .taste_list[l]
                                                          .the_price
                                                  ),
                                    });
                                } else {
                                    tasteArr.push({
                                        name: this.tabbleData[d].taste_set[t]
                                            .taste_list[l].name_zh,
                                        price:
                                            Number(
                                                this.tabbleData[d].taste_set[t]
                                                    .taste_list[l].the_price
                                            ) == 0
                                                ? ""
                                                : this.stringutils.formatPrice(
                                                      this.tabbleData[d]
                                                          .taste_set[t]
                                                          .taste_list[l]
                                                          .the_price
                                                  ),
                                    });
                                }
                            } else {
                                tasteArr.push({
                                    name: this.tabbleData[d].taste_set[t]
                                        .taste_list[l].name,
                                    price:
                                        Number(
                                            this.tabbleData[d].taste_set[t]
                                                .taste_list[l].the_price
                                        ) == 0
                                            ? ""
                                            : this.stringutils.formatPrice(
                                                  this.tabbleData[d].taste_set[
                                                      t
                                                  ].taste_list[l].the_price
                                              ),
                                });
                            }
                        }
                    }
                }
                this.tabbleData[d].taste_set = tasteArr;
                tasteArr = [];
            }
            var dishNotesArr = [];
            for (let a in this.data.dish_data) {
                for (let n in this.data.dish_data[a].dish_chosen_notes) {
                    dishNotesArr.push(
                        this.data.dish_data[a].dish_chosen_notes[n].content
                    );
                }
                this.data.dish_data[a].dish_chosen_notes = dishNotesArr.join(
                    " / "
                );
                dishNotesArr = [];
            }
        },
        setReturnData() {
            let that = this;
            that.returnInfo = [
                {
                    title: that.$t("accountsDetail.tuikuanshijian"),
                    value: that.stringutils.formatEmpty(that.data.refund_time),
                },
                {
                    title: that.$t("accountsDetail.returnType"),
                    value: that.data.refund_type_name,
                },
                {
                    title: that.$t("accountsDetail.returnWhy"),
                    value: that.stringutils.formatEmpty(
                        that.data.refund_reason
                    ),
                },
                {
                    title: that.$t("accountsDetail.tuikuanPeople"),
                    value: that.stringutils.formatEmpty(
                        that.data.refund_people_name
                    ),
                },
            ];
        },
        reClick() {
            this.$router.push({
                path: "/Refund",
                query: { id: this.$route.query.id },
            });
        },
        //计算taste_list里的价格总和
        tasteTotal(taste_set){
            let total = 0;
            if(taste_set!=null&&taste_set.length>0&&taste_set!=undefined){
                for (let i in taste_set) {
                    total+=Number(taste_set[i].price);
                }
            }
            return total;
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
        this.getData();
        this.getDishSet();
    },
};
</script>
<style scoped>
.selectBtn {
    position: fixed;
    bottom: 0px;
    width: 100%;
}
.selectBtn .button {
    border-radius: inherit;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    padding: 0px;
    width: 100%;
    margin: 0px !important;
    display: block;
    border: none;
}
.color-orange {
    background: #fe813c !important;
}
.priceStyle {
    display: inline-block;
    width: 30%;
    text-align: center;
}
.row ul li {
    margin-top: 10px;
}
hr {
    margin-top: 10px;
}
.right {
    float: right;
}
.blackText {
    color: #505050;
    font-size: 14px;
}
.grayText {
    color: #808080;
    font-size: 12px;
}
.listCss li {
    list-style-type: disc;
    margin-left: 20px;
}
.labelCss {
    display: inline-block;
    color: #fe813c;
    border: 1px #fe813c solid;
    border-radius: 2px;
    padding: 1px 3px;
    font-size: 10px;
    transform: scale(0.83);
    height: 15px;
    line-height: 15px;
    position: relative;
    /* top: -5px; */
}
.memberSpan span::after {
    content: "    ";
}
.tableTitle li {
    display: inline-block;
    width: 33%;
    text-align: center;
}
</style>