<template>
  <div id="app">
    <el-container class="container">
      <el-aside class="aside" width="200px">
        <el-menu class="menu" :router="true" :default-openeds="['game']" default-active="mhxy">
          <template v-for="sub in menus">
            <el-submenu :key="sub.index" :index="sub.index">
              <template slot="title">{{ sub.title }}</template>
              <template v-for="item in sub.childen">
                <el-menu-item :key="item.index" :index="item.index">{{ item.title }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <router-view/>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      menus: [
        {
          index: "gain",
          title: "知识",
          childen: [{
            index: "site",
            title: "网站"
          }]
        },
        {
          index: "game",
          title: "游戏",
          childen: [{
            index: "mhxy",
            title: "梦幻西游"
          }]
        }
      ]
    }
  },
  components: {},
  methods: {},
}
</script>

<style lang="scss">
#app {
  height: 100%;
}

.container {
  height: 100%;
  border: 1px solid #eee
}

.aside {
  background-color: rgb(238, 241, 246)
}

.menu {
  height: 100%;
}
</style>
