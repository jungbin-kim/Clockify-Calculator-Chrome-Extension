const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = env => {
  const plugins = [
    // index.html을 템플릿화 할 수 있는 플러그인
    new HtmlWebpackPlugin({
      title: 'Clockify Calculator', // index.html의 tilte element 내에 들어갈 텍스트
      template: path.resolve(__dirname, 'index.html'), // template으로 사용할 html 파일 위치
      filename: path.join(__dirname, '../dist/popup.html'), // template이 빌드 될 때 위치 및 이름
      excludeChunks: ['content'] // 생성되는 html에 포함하고 싶지 않은 빌드 파일 선언. (entry 프로퍼티 이름)
    }),
    // 번들링 제외할 파일들을 dist 폴더로 옮길수 있는 플러그인
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(__dirname, '../static/*'), // static 폴더에 있는 모든 파일을 (추가 옵션 없이는 파일만 이동됨)
          to: path.resolve(__dirname, '../dist'), // dist 폴더로
          flatten: true // 옮기려는 폴더(여기선 static 폴더) 없이 옮기기
        }
      ],
      {} // options
    ),
    // dist 폴더 초기화 플러그인
    new CleanWebpackPlugin('dist', {
      root: path.resolve(__dirname, '..') // 대상 폴더 접근 root 지정
    }),
    // Moment.js library locale 요소 제외할 수 있는 플러그인
    new MomentLocalesPlugin(),
    // Lodash library tree shaking 플러그인
    new LodashModuleReplacementPlugin()
  ]

  if (env !== undefined && env.DO_ANALYZER === 'true') {
    plugins.push(
      // 번들링된 파일들에 대한 구성요소 분석 플러그인
      new BundleAnalyzerPlugin()
    )
  }

  return {
    // 빌드 시 접근점. 파일을 두개로 빌드하고 싶은 경우, 접근점을 두개로 나누어서 할 수 있다.
    entry: {
      popup: './src/index.js', // Chrome extension icon 눌렀을 때 뜨는 UI에 대한 JS.
      content: './src/content.js' // 파싱 대상(여기서는 Clockify 대시보드 페이지)에서 작동하는 JS. (Extension JS와는 Chrome에서 정의한 메시징으로 통신.)
    },
    // 빌드 결과물 config
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js'
    },
    plugins
  }
}
