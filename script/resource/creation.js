const path = require('path')
const fs = require('fs')
// const buffer = require('buffer')

const print = require('./print')
const template = require('./template')

// 首字母大写
function capital(str) {
	return str && str.replace(/(\w)/, (all, $1) => {
		return $1.toUpperCase()
	})
}

const packageDirs = path.resolve(__dirname, '../../packages')

// 生成package
exports.createPackage = function (newPackageName) {
  if (!newPackageName) {
		print.error('package name is necessary')
		return
	}
	const hasTargetPackage = fs.existsSync(path.join(packageDirs, newPackageName))
	if (hasTargetPackage) {
		print.error(`package ${newPackageName} is already existed`)
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
	fs.writeFileSync(getPkgChildPath('__mocks__', 'index.js'), template.mockFileContent)

	// apis
	fs.mkdirSync(getPkgChildPath('apis'))
	fs.writeFileSync(getPkgChildPath('apis', 'index.ts'), template.apiIndexContent)

	// components
	fs.mkdirSync(getPkgChildPath('components'))
	fs.writeFileSync(getPkgChildPath('components', 'index.ts'), template.componentIndexContent)

	// controllers
	fs.mkdirSync(getPkgChildPath('controllers'))
	fs.writeFileSync(getPkgChildPath('controllers', 'index.ts'), template.controllersIndexContent)

	// interfaces
	fs.mkdirSync(getPkgChildPath('interfaces'))
	fs.writeFileSync(getPkgChildPath('interfaces', 'index.ts'), '')

	// locales
	fs.mkdirSync(getPkgChildPath('locales'))
	fs.writeFileSync(getPkgChildPath('locales', 'index.ts'), template.localesIndexContent)
	fs.writeFileSync(getPkgChildPath('locales', 'en-US.ts'), template.localesEnContent)
	fs.writeFileSync(getPkgChildPath('locales', 'zh-CN.ts'), template.localesZhContent)

	// pages
	fs.mkdirSync(getPkgChildPath('pages'))
	fs.writeFileSync(getPkgChildPath('pages', 'index.ts'), template.pagesIndexContent)

	// router
	fs.mkdirSync(getPkgChildPath('router'))
	fs.writeFileSync(getPkgChildPath('router', 'index.ts'), template.routerIndexContent)

	// styles
	fs.mkdirSync(getPkgChildPath('styles'))
	fs.writeFileSync(getPkgChildPath('styles', `${newPackageName}.module.less`), '')

	// index.ts
	fs.writeFileSync(getPkgChildPath('index.ts'), template.createPkgIndexFileContent(newPackageName))

	print.success(`创建package: ${newPackageName}成功!`)

	// 注册包
	const iPath = path.resolve(__dirname, '../../packages', 'packages.ts')
	const buf = fs.readFileSync(iPath)
	let content = buf.toString()
	const re_const = /(\nconst)/
	const re_end = /(\n];)/
	let constFlag = false
	let endFlag = false
	content = content.replace(re_const, (all, $1) => {
		constFlag = true
		return `import ${newPackageName} from './${newPackageName}';\n${$1}`
	})
	content = content.replace(re_end, (all, $1) => {
		endFlag = true
		return `\n  ${newPackageName},${$1}`
	})
	fs.writeFileSync(iPath, content)
	if (constFlag && endFlag) {
		print.success(`注册package: ${newPackageName}成功!`)
	} else {
		print.error(`注册package: ${newPackageName}失败!`)
	}
}

// 检查包是否存在
function hasTargetPackage(name) {
	const hasTargetPackage = fs.existsSync(path.join(packageDirs, name))
	if (!hasTargetPackage) {
		print.error(`package ${name} not exist`)
		return false
	}
	return true
}

const re_idg = /(\'@idg\/idg\';\n)/
const re_export = /(\n};)/

// 生成api，component, page, controller
/*
	name:包名
	fname:文件名
  type = 'component' || 'controller' || 'page' || 'api'
*/
exports.createSpecificType = function(name, fname, type) {
	const isTsx = type === 'component' || type === 'page'
	const extention = isTsx ? 'tsx' : 'ts'
	if (hasTargetPackage(name)) {
		try {
			// 判断有无文件
		  const fpath = path.resolve(packageDirs, name, `${type}s`, `${fname}.${extention}`)
			if (fs.existsSync(fpath)) {
				print.error(`当前${type}已经存在`)
			} else {
				fs.writeFileSync(fpath, template[`get${capital(type)}Content`](name, fname))
				print.success(`创建${type}:${fname}成功!`)
				// 导出component
				const ipath = path.resolve(packageDirs, name, `${type}s`, `index.ts`)
				const hasIndexFile = fs.existsSync(ipath)
				if (!hasIndexFile) {
					fs.writeFileSync(ipath, `import { ${capital(type)}s } from '@idg/idg';\nimport ${fname} from './${fname}';\nconst ${type}s: ${capital(type)}s = {\n  ${fname},\n};\nexport default ${type}s;\n`)
					print.success(`导出${type}:${fname}成功!`)
				} else {
					const buf = fs.readFileSync(ipath)
					let content = buf.toString()
					let idgFlag = false
					let exportFlag = false
					// 导入语句
					if (re_idg.test(content)) {
						content = content.replace(re_idg, (all, $1) => {
							idgFlag = true
							return `${$1}import ${fname} from './${fname}';\n`;
						})
					}
					// 导出语句
					if (re_export.test(content)) {
						exportFlag = true
						content = content.replace(re_export, (all, $1) => {
							return `\n  ${fname},${$1}`
						})
					}
					fs.writeFileSync(ipath, content)
					if (idgFlag && exportFlag) {
						print.success(`导出${type}:${fname}成功!`)
					} else {
						print.error(`导出${type}:${fname}失败!`)
					}
				}
			}
		} catch (e) {
			print.error(e)
		}
	}
}
