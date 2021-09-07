<template>
    <div class="email-foot">
        <div class="cancelBtn">
            <slot name="cancel"></slot>
        </div>
        <div class="sendBtn">
            <slot name="send"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "emailFooter"
};
</script>

<style scoped>
.email-foot{
    margin-top: 30px;
    overflow: hidden;
}
.email-foot .cancelBtn{
    float: left;
    width: 38%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    border-radius: 15px;
    margin-left: 8%;
    border: 1px solid #808080;
    color: #808080;
}
.email-foot .sendBtn{
    float: left;
    width: 38%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    border-radius: 15px;
    margin-left: 8%;
    background: #FE813C;
    border: 1px solid #FE813C;
    color: #fff;
}
</style>
