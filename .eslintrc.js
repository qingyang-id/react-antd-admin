/*
 * 本规范由 'JavaScript Standard Style' 规范 —— 添加自定义内容 组成的加强版
 * Standard规则 中文文档 : https://github.com/feross/standard/blob/master/docs/RULES-zhcn.md
 * ESlint规则 中文文档: http://eslint.cn/docs/rules/
 */
module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },

  'extends': ['react-app'],
  'parserOptions': {
    "allowImportExportEverywhere": true,
    'sourceType': 'module',
    'ecmaVersion': 8,
    'ecmaFeatures': {
      'jsx': true,
      'experimentalObjectRestSpread': true
    }
  },
  'plugins': [
    'react'
  ],
  // React-eslint
  'settings': {
    'react': {
      'createClass': 'createReactClass', // Regex for Component Factory to use, default to 'createReactClass'
      'pragma': 'React',  // Pragma to use, default to 'React'
      'version': '15.0' // React version, default to the latest React stable release
    }
  },
// 自定义编码规范，慎重修改
  'rules': {
    // 关闭数组，对象最后一个元素后的逗号检查
    'comma-dangle': 0,
    'max-len': [
      'error', {
        // 代码长度
        'code': 120,
        // 忽略正则表达式匹配的行；可以只匹配单行，而且在 YAML 或 JSON 中需要双重转义
        // 'ignorePattern': true,
        // 忽略所有拖尾注释和行内注释
        'ignoreComments': true,
        // 强制注释的最大长度；默认长度同 code, 暂未生效,因此加入上方的规则
        'comments': 120
      }
    ],
    // console警告
    'no-console': 0,
    // 允许未定义
    'no-undef': 0,
    // 允许new
    'no-new': 0,
    // 禁止变量声明覆盖外层作用域的变量
    'no-shadow': ['error', { 'allow': ['state'] }],
    // 允许修改传入的参数
    'no-param-reassign': 0,
    // 允许嵌套三元表达式
    'no-nested-ternary': 0,
    // 允许不存在默认的抛出
    'import/prefer-default-export': 0,
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow global require
    'global-require': 0,
  }
};
