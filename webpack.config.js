const postloader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        [
          'postcss-px-to-viewport',
          {
            viewportWidth: 375,
          },
        ]
      ],
    },
  },
};

module.exports = (config) => {
  // config.entry = './md5.js';
  // config.output.library =  'md5';
  // config.output.libraryTarget = 'umd';
  // config.output.filename = 'md5.js';
  // 配置按需加载，单独打包，加速加载时间
  config.module.rules.forEach(rule => {
    if (rule.test.test('index.less')) {
      // rule.use[1].options.modules = false;
      rule.use.splice(2, 0, postloader);
      // console.log('loader', rule.use);
    }
  });
  return config;
}