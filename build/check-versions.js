var chalk = require('chalk');
var semver = require('semver'); //版本解析工具
var packageConfig = require('../package.json');
var shell = require('shelljs');
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version), //获取当前系统的版本号
    versionRequirement: packageConfig.engines.node //获取当前需要的node的版本号
  },
]

if (shell.which('npm')) { //判断当前开发环境是否安装npm
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm, //获取当前最低的npm版本
  })
}

module.exports = function () {
  var warnings = [];
  //检测当前环境中的npm版本和node版本是否符合要求；
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var j = 0; j < warnings.length; j++) {
      var warning = warnings[j]
      console.log('  ' + warning)
    }
    process.exit(1)
  }
}
