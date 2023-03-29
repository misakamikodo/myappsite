module.exports = {
    // publicPath: '/my-intro',
    devServer: {
        port: 8080,
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/assets/properties.scss";`
            },
            less: {
                globalVars: {
                    primary: '#fff'
                }
            }
        },
    },
};
