//配置路由信息
import Vue from "vue";
import VueRouter from "vue-router";

//个人介绍
const game = () => import ("../pages/game");
const site = () => import ("../pages/site");

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: site,
        meta: {
            title: "主页"
        }
    },
    {
        path: "/mhxy",
        component: game,
        meta: {
            title: "梦幻西游工具箱"
        }
    },
    {
        path: "/site",
        component: site,
        meta: {
            title: "网站工具箱"
        }
    },
    {
        path: "/home",
        redirect: ""
    }
];

const router = new VueRouter({
    routes,
    // mode: "history",
    mode: "hash",
    linkActiveClass: "active"
});

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
})

export default router;
