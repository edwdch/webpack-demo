const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  return {
    mode: webpackEnv,
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "../dist"),
    },
    module: {
      rules: [
        {
          test: /.css$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              // CSS compatibility for different browsers
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        autoprefixer: {
                          flexbox: "no-2009",
                        },
                        stage: 3,
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
        {
          // Loader for images
          test: /\.(png|svg|jpg|jepg|gif)$/,
          type: "asset",
          generator: {
            fileName: "image/[name].[contenthash:8][ext][query]",
          },
        },
        {
          // Loader for fonts
          exclude:
            /\.(js|mjs|ejs|jsx|ts|tsx|css|scss|sass|png|svg|jpg|jpeg|gif|html)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/index.html"),
      }),
    ],
  };
};
