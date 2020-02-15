const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            $ENV: {
                Environment: JSON.stringify(process.env.Environment),
                UiPort: JSON.stringify(process.env.UiPort)
            }
        })
    ]
};