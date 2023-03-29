/**
 * 全局css（scss也可放在App.vue的style lang=scss 中）
 */
// import "./assets/properties.scss";
import "./assets/theme.scss";
import "./assets/font.css";
/**
 * 全局组件注册
 */

const install = (Vue) => {
    const components = [

    ];
    components.forEach(function (component) {
        Vue.component(component.name, component);
    });
    console.log('install components ok');
};

export default {
    install
};
