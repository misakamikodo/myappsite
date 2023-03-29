//配置路由信息
import Vue from "vue";
import VueRouter from "vue-router";

//个人介绍
const index = () => import ("../pages/index");

Vue.use(VueRouter);

const routes = [
    {
        path: "",
        component: index,
        meta: {
            title: "KisofDeath"
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
