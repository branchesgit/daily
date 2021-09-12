import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';          //ES6转ES5插件;
import sass from 'rollup-plugin-sass';            //sass插件;
import uglify from 'rollup-plugin-uglify';        //js压缩;
import serve from 'rollup-plugin-serve';          //serve服务;
import livereload from 'rollup-plugin-livereload';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true
  },
  plugins: [
    resolve(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    babel({
      babelrc: false,                        //不设置.babelrc文件;
      exclude: 'node_modules/**',            //排除node_modules文件夹;
      presets: ['es2015-rollup', 'stage-0'], //转ES5的插件;
      plugins: ['transform-class-properties']//转换静态类属性以及属性声明的属性初始化语法
    }),
    serve({
      contentBase: 'public/',   //启动文件夹;
       host: 'localhost',      //设置服务器;
       port: 10001             //端口号;
     }), 
    livereload({
      watch: 'public/'     //监听文件夹;
    }),
    production && terser() // minify, but only in production
  ]
};