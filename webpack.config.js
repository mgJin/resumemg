const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const BASE_JS = "./src/client/js";

module.exports={
  resolve:{
    fallback:{
      "path":require.resolve("path-browserify")
    }
  },
  entry:{
    main : `${BASE_JS}/main.js`,
    popup : `${BASE_JS}/popup.js`,
    fetchData : `${BASE_JS}/fetchData.js`,
    video:`${BASE_JS}/video.js`,
  },
  
  
  plugins: [new MiniCssExtractPlugin({
    filename:"css/style.css"
  })],
    output:{
        filename:"js/[name].js",
        path: path.resolve(__dirname,"assets"),
        clean:true
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: [
                        ['@babel/preset-env', { targets: "defaults" }]
                      ]
                    }
                  }
            },
            {
              test:/\.scss$/,
              use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"],
            }
        ]
}}