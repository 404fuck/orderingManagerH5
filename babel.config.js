
module.exports = {
  plugins: ['lodash'],
  presets: [
    '@vue/app',

  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      // 指定样式路径
      style: true
    }, 'vant'],
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      },'el'
    ]
  ],
  
}