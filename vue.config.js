module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    devServer: {
        port: 8080,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        before: require('./mock/mock-server.js')
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
