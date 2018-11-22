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
let api = 'http://10.10.14.13:8080/api';
if (env !== 'development') {
  debug = false;
  api = 'http://10.0.210.93';
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
