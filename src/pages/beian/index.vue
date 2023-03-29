<template>
    <div class="footer" :class="whatStyle">
        <p>
            <a href="http://beian.miit.gov.cn" target="_blank" title="备案信息查询">
                <!--<img class="beian-img" src="//img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png">-->
                互联网ICP备案：浙ICP备20005374号
            </a>
        </p>
    </div>
</template>

<script>
    export default {
        name: "beian",
        props: {
            pos: {
                type: String,
                default: "bottom"
            }
        },
        computed: {
            whatStyle: () => "footer-fixed"
        }
    }
</script>

<style lang="scss" scope>
    .footer {
        font-size: $text-size-sm;

        a {
            color: #FFF !important;
        }
    }

    .footer-bottom {
        border-top: $border-style-base;

        p {
            text-align: center;
            margin: $spacing-col-base 0;
        }
    }

    .footer-fixed {
        position: fixed;
        right: $spacing-row-base;
        bottom: 0;
    }

    .beian-img {
        display: inline-block;
        height: 12px;
    }
</style>