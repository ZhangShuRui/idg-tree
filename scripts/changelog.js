const {
  version
} = require('../package.json')
const inquirer = require('inquirer');
const fs = require('fs')
const generate = require('./generate')
const path = require('path')

let versionType
let logPath
let versionOut

const jsonPath = path.resolve(__dirname, '../package.json')
if (process.env.CHANGELOG_TYPE) {
  versionType = process.env.CHANGELOG_TYPE
  generateChangelog()
} else {
  inquirer.prompt([
    {
      name : 'versionType',
      type : 'list',
      message : 'Please choose a publish version type',
      default : 'patch',
      choices : [
        {
          name : 'patch',
          value : 'patch',
          short : 'patch',
        },
        {
          name : 'minor',
          value : 'minor',
          short  : 'minor',
        },
        {
          name : "major",
          value : 'major',
          short : 'major'
        },
      ],
    }
  ]).then(ans=>{
    versionType = ans.versionType
    generateChangelog()
  })
}


function convertDate(date) {
  if (Number(date) < 10) {
    return `0${date}`
  } else {
    return date
  }
}

function generateChangelog() {
  const logDir = path.resolve(__dirname, '../') // changelog所在目录
  
  const [major, minor, patch] = version.split('.')
  const versions = {
    major: `${Number(major)}.${0}.${0}`, // 主版本号
    minor: `${major}.${Number(minor) + 1}.${0}`, // 次版本号
    patch: `${major}.${minor}.${Number(patch) + 1}` // 修补版本号
  }
  
  versionOut = versions[versionType] // 最终生成的md文件版本号
  
  logPath = `${logDir}/CHANGELOG.md`
  generate({
    preset: 'angular',
    outfile: logPath,
    // outputUnreleased: 1,
    releaseCount: 0
  }, replace)
}

function replace () {
  const log = fs.readFileSync(logPath, { encoding: 'utf-8'})
  console.log('replace start', log)
  const date = new Date()
  const today = `${date.getFullYear()}-${convertDate(date.getMonth()+1)}-${convertDate(date.getDate())}`
  const replaceStr = `### ${versionType[0].toLocaleUpperCase() + versionType.substring(1)}${versionOut} (${today})`
  const titleReplaced = log.replace(/^(.*)$/m, replaceStr)
  fs.writeFileSync(logPath, log, { encoding: 'utf-8' })
  const pkgJson = fs.readFileSync(jsonPath, { encoding: 'utf-8' })
  const replacedPkgJson = pkgJson.replace(`"version": "${version}"`, `"version": "${versionOut}"`)
  fs.writeFileSync(jsonPath, replacedPkgJson, { encoding: 'utf-8' })
  commit(versionOut)
}

function commit (version) {
  console.log('commit changelog to master')
  const cp = require('child_process')
  cp.execSync('git fetch')
  cp.execSync('git pull origin master')
  cp.execSync('git add .')
  cp.execSync(`git commit -a -m 'upgrade: ${version}'`)
  cp.execSync(`git push origin master`)
  console.log('push success')
}