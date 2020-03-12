const path = require('path')
const fs = require('fs')
const print = require('./resource/print')
const { createPackage,createApi, createController, createComponent, createPage, createSpecificType } = require('./resource/creation')


const pkgOperations = require('./resource/template')

// 类型，包名，文件名(非必须)
const [type, name, fname] = process.argv.splice(2)
// console.log(type, name)

// 测试print
// print.error('error', '参数二', 33)
// print.warning('warning', 2)
// print.info('info')
// print.success('success')

const typeMaps = {
  "--pkg": "Package",
  "--a": "api",
  "--c": "component",
  "--ctr": "controller",
  "--p": "page",
}
const needCreations = ['package', "api", "component", "controller", "page"]
needCreations.map(item => {
  typeMaps[item] = item
})

function create(type, name) {
  if (!type || !name) {
		print.error('请输入两到三个参数，规则参考Readme')
		return
	}
	// name, fname必须是字母开头
	const re = /^[a-zA-Z]/
	if (!re.test(name)) {
		print.error('包名请用字母开头')
		return
	}
	const realType = typeMaps[type]
	if (!realType) {
		print.error('创建的类型输入错误')
	} else {
		if (realType === 'Package') {
			// 创建package
			print.info(`将为您创建名为${name}的package......`)
			createPackage && createPackage(name)
		} else {
			// 生成api，component, page, controller
			if (!fname || !re.test(fname)) {
				print.error('缺少文件名参数或者文件名不合法')
			} else {
				print.info(`将为您在package:${name}下创建名为${fname}的${realType}......`)
				createSpecificType(name, fname, realType)
			}
		}
	}
}

create(type, name)




