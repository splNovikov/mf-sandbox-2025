/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint no-undef: 0 */
/* eslint @typescript-eslint/no-require-imports: 0 */

const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const deps = require("./package.json").dependencies;

const printCompilationMessage = require("./compilation.config.js");

const APP_STATIC_PATH = "remote-apps-bundles/app2";
module.exports = (_, argv) => ({
  output:
    argv.mode === "production"
      ? {
          path: `/usr/local/etc/nginx/servers/mf-home-dist/${APP_STATIC_PATH}`,
          publicPath: `./${APP_STATIC_PATH}/`,
        }
      : {
          publicPath: "http://localhost:3002/",
        },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3002,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, "src")],
    onListening: function (devServer) {
      const port = devServer.server.address().port;

      printCompilationMessage("compiling", port);

      devServer.compiler.hooks.done.tap("OutputMessagePlugin", (stats) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage("failure", port);
          } else {
            printCompilationMessage("success", port);
          }
        });
      });
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./App2Content": "./src/components/App2Content/App2Content.tsx",
        "./Widget_03": "./src/components/Widget_03/Widget_03.tsx",
        "./Widget_04": "./src/components/Widget_04/Widget_04.tsx",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        primereact: {
          singleton: true,
          requiredVersion: deps["primereact"],
        },
        primeicons: {
          singleton: true,
          requiredVersion: deps["primeicons"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
});
