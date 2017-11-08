// 判断环境, 输出配置好的 store
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./store.prod');
} else if (process.env.NODE_ENV === 'test') {
  module.exports = require('./store.test');
} else {
  module.exports = require('./store.dev');
}
