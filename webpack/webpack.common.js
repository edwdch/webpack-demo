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
      ],
    },
    plugins: [
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/index.html"),
      }),
    ],
  };
};
