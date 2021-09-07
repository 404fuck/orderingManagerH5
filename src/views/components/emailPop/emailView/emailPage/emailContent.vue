<template>
    <div class="email-cont">
        <h3 class="cent-txt">{{$t('Toemail')}}</h3>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "emailContent",
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
};
</script>

<style scoped>
.cent-txt{
    font-size: 16px;
    color: rgb(128, 128, 128);
}
</style>
