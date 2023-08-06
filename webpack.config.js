const webpack = require('webpack');
const config = require('./config');
const _ = require('lodash');

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/App.jsx",
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/public`,
    // 出力ファイル名
    filename: "bundle.js",
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': _.transform(config.env, (ret, val, key) => {
        ret[key] = JSON.stringify(val);
      }, {}),
    })
  ],
  module: {
    rules: [
      {
        // 拡張子 .ts もしくは .tsx の場合
        test: /\.jsx?$/,
        // TypeScript をコンパイルする
        use: "babel-loader",
      },
      {
        test: /\.(css|scss|sass)$/,
        // 下から順に適用される
        use: [
          'style-loader',  // JS 内にある CSS を <head> にインラインで出力する loader
          'css-loader', // CSS を JS で扱えるようにする loader
          'sass-loader'  // sass | scss の変換
        ],
      },
      {
        //拡張子がpng,jpg,gif,svgを検知したら
        test: /\.(png|jpg|gif|svg)/,
        use: [
          {
              loader: 'file-loader',
              options: {
                  //[name]は画像名、[ext]は拡張子
                  name: 'images/[name].[ext]'
              },
          },
        ],
      }
    ],
  },
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: [".js", ".jsx", ".js", ".json", ".scss", ".css"],
  },
  // devServerのoptionについて
  // https://zenn.dev/sa2knight/articles/9b19ffd391bca87d7b8c#historyapifallback
  devServer: {
    historyApiFallback: true, // 404時にindexファイルを返す
    static: {
      directory: __dirname + '/public',
    }
    // publicPath: '/',
  },
  // ES5(IE11等)向けの指定
  target: ["web", "es5"],
};