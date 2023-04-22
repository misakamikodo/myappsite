<template>
  <div class="container" @click="openSite">
    <img class="site-icon" :src="siteIcon" alt="icon"/>
    <span class="site-href" :href="site">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "site-item",
  props: {
    site: {
      type: String,
      default() {
        return "https://www.baidu.com"
      }
    },
    title: {
      type: String,
      default() {
        return "网站网站网站网站网站网站网站网站网站"
      }
    },
    icon: {
      type: String,
      default() {
        return ""
      }
    },
  },
  computed: {
    siteIcon() {
      return this.icon ? this.icon : this.site.match(/(^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*)/)[1] + "/favicon.ico"
    }
  },
  methods:{
    openSite(){
      window.open(this.site,'_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}

.site-icon {
  width: $img-size-lg;
  height: $img-size-lg;
}

.site-href {
  vertical-align: middle;
  font-size: $text-size-base;
  margin-left: $spacing-row-sm;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: clip;
  max-width: 12em;
}
</style>
