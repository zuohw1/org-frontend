const fs = require('fs');
const argv = process.argv;
const customizedArgv = process.argv.slice(2);
const argvMap = {};
customizedArgv.forEach(item => {
  const key = item.slice(0, item.indexOf('='));
  const value = item.slice(item.indexOf('=') + 1);
  Object.assign(argvMap, {
    [key]: value,
  });
});
const env = argvMap['--env'];
if (!env) {
  throw new Error('--env参数不能为空');
}
let debug = true;
let api = 'https://www.easy-mock.com/mock/5b9f51bc8b5cc40f1f28a324/example';
if (env !== 'development') {
  debug = false;
  api = 'http://10.0.210.93';//https://www.easy-mock.com/mock/5b9f51bc8b5cc40f1f28a324/example
}
const injectString = `
/* -- please ignore this file, it will be generated dynamically -- */
const config = {
  api: '${api}',
  debug: ${debug},
};
export default config;
`;
fs.writeFileSync('./src/env.config.js', injectString);
process.stdout.write('注入成功');
