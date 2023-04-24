<template>
  <div class="index">
    <template v-for="(item, idx) of links">
      <el-divider :key="idx" content-position="left">{{ item.title }}</el-divider>
      <template v-for="n in (parseInt(item.children.length / colPerRow) + 1)">
        <el-row :gutter="20" :key="n">
          <template
              v-for="(child, i) of item.children.slice((n-1) * colPerRow, Math.min(n*colPerRow, item.children.length))">
            <el-col :span="6" :key="i">
              <div class="grid-content">
                <site-item :site="child.site" :title="child.title" :icon="child.icon"/>
              </div>
            </el-col>
          </template>
        </el-row>
      </template>
    </template>
  </div>
</template>
<script>
import siteItem from "@/components/site-item";

export default {
  components: {siteItem},
  data() {
    return {
      colPerRow: 4,
      links: []
    }
  },
  methods: {},
  mounted() {
    this.$util.request.get("worksites.json").then(res => {
      this.links = res
    })
  }
}
</script>
<style lang="scss" scoped>
.index {
  width: calc(100% - 250px);
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
