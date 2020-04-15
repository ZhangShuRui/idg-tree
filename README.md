# @idg/seed

## 参考文档

- 框架文档 http://dp-5dd27d044d403.qcloud-prod.oneitfarm.com/specification/standard-idg.html
- 组件库文档 https://iview.qcloud-prod.oneitfarm.com/#/
- css库文档 https://tailwindcss.com/

## 开发
```
// install
yarn

// start dev server
yarn serve
```

## 打包
注意如果项目依赖了图片，视频等需要参考(yarn run ts命令)
```
cpx packages/**/*.less dist/es/packages
```
将依赖拷贝到dist/es/packages下面



## 自动生成并注册新的package/components/page/apis/controllers

### type取值(--或者-开头的为简写)
```
--pkg/-pkg 代表package
--a/-a 代表api
--c/-c  代表components
--p/-p 代表page
--ctr/-ctr 代表controllers
```

### name约束（自行命名准确）
- package: 小写
- 其他: 开头大写


### 创建包
```
yarn run generate pkgname
```

### 创建api/controller/components/pages(如果不存在pkgname的包会先生成)
```
yarn run generate pkgname -a AdminApi -c Admin -p AdminPage AdminLoginPage -ctr AdminController -pr AdminTest
```

#### -a,-p,-c,-ctr, -pr后面可带任意多个参数，文件名开头请大写;-pr添加及注册页面的同时会以当前页面名称增加一个路由;