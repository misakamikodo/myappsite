module.exports = {
    // publicPath: '/my-intro',
    devServer: {
        port: 8080,
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/properties.scss";`
            },
            less: {
                globalVars: {
                    primary: '#fff'
                }
            }
        },
    },
};
