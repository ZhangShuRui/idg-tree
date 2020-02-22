const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

const pkgOperations = require('./resource/packageTemplate')

const showLog = true

function log(...message){
	if(showLog) {
		console.log(...message)
	}
}

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'what the name of the new package?',
  }
]).then(answers => {
	const newPackageName = answers.name
	if (!newPackageName) {
		console.log('package name is necessary')
		return
	}
	const packageDirs = path.resolve(__dirname, '../packages')
	log('packageDirs: ', packageDirs)
	const hasTargetPackage = fs.existsSync(path.join(packageDirs, newPackageName))
	if (hasTargetPackage) {
		console.log('package name is repeated')
		return
	}

	const newPkgDir = path.join(packageDirs, `${newPackageName}`)

	// 创建以newPackageName命名的包(验证包名，先看看validate)
	fs.mkdirSync(newPkgDir)

	// 返回package特定包下面的特定文件夹或文件路径
	function getPkgChildPath(...name) {
	  return path.join(newPkgDir, ...name)
	}

	// mocks
	fs.mkdirSync(getPkgChildPath('__mocks__'))
	fs.writeFileSync(getPkgChildPath('__mocks__', 'index.js'), pkgOperations.mockFileContent)

	// apis
	fs.mkdirSync(getPkgChildPath('apis'))
	fs.writeFileSync(getPkgChildPath('apis', 'index.ts'), pkgOperations.apiIndexContent)

	// components
	fs.mkdirSync(getPkgChildPath('components'))
	fs.writeFileSync(getPkgChildPath('components', 'index.ts'), pkgOperations.componentIndexContent)

	// controllers
	fs.mkdirSync(getPkgChildPath('controllers'))
	fs.writeFileSync(getPkgChildPath('controllers', 'index.ts'), pkgOperations.controllersIndexContent)

	// interfaces
	fs.mkdirSync(getPkgChildPath('interfaces'))
	fs.writeFileSync(getPkgChildPath('interfaces', 'index.ts'), '')

	// locales
	fs.mkdirSync(getPkgChildPath('locales'))
	fs.writeFileSync(getPkgChildPath('locales', 'index.ts'), pkgOperations.localesIndexContent)
	fs.writeFileSync(getPkgChildPath('locales', 'en-US.ts'), pkgOperations.localesEnContent)
	fs.writeFileSync(getPkgChildPath('locales', 'zh-CN.ts'), pkgOperations.localesZhContent)

	// pages
	fs.mkdirSync(getPkgChildPath('pages'))
	fs.writeFileSync(getPkgChildPath('pages', 'index.ts'), pkgOperations.pagesIndexContent)

	// router
	fs.mkdirSync(getPkgChildPath('router'))
	fs.writeFileSync(getPkgChildPath('router', 'index.ts'), pkgOperations.routerIndexContent)

	// styles
	fs.mkdirSync(getPkgChildPath('styles'))
	fs.writeFileSync(getPkgChildPath('styles', `${newPackageName}.module.less`), '')

	// index.ts
	fs.writeFileSync(getPkgChildPath('index.ts'), pkgOperations.createPkgIndexFileContent(newPackageName))

	// 注册包
	// to-do
	console.log(`Creating package ${newPackageName} complete!`)
})
