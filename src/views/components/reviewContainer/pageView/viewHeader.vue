<!--表格头部-->
<template>
    <div class="header-wrapper">
        <slot name="head-label"></slot>
    </div>
</template>

<script>
export default {
    name: "view-header"
};
</script>  

<style scoped>
    .header-wrapper{
		width: 100%;
		height: 50px;
		line-height: 50px;
		box-shadow:0px 2px 11px 0px rgba(219,219,219,0.2);
		padding: 0 24px;
		overflow: hidden;
	}
</style>
