module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/app.tsx",
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/public`,
    // 出力ファイル名
    filename: "app.js",
  },
  module: {
    rules: [
      {
        // 拡張子 .ts もしくは .tsx の場合
        test: /\.tsx?$/,
        // TypeScript をコンパイルする
        use: "ts-loader",
      },
    ],
  },
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
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