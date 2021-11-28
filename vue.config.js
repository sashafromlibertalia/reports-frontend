module.exports = {
    configureWebpack: () => {
        return {
            resolve: {
                extensions: ['.web.js', '.vue', '.js', '.json', '.less', '.scss', '.sass'],
            }, module: {
                rules: [{
                    test: /\.less$/, use: ['vue-style-loader', 'css-loader', 'less-loader'],
                },],
            },
        };
    },

}