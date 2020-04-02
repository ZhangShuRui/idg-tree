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
将依赖拷贝到dist/es/packages下面。

## 自动生成并注册新的package/components/page/apis/controllers
```
yarn run generate type name (fname)
```

### type取值(--开头的为简写)
```
package/--pkg
apis/--a
components/--c
pages/--p
controllers/--ctr
```

### name约束（自行命名准确）
- package: 小写
- 其他: 开头大写

### 创建包
```
yarn run generate --pkg a
```

### 创建api/controller/components/pages(pkgname包名，fname文件名)
```
yarn run generate --a pkgname fname
yarn run generate --ctr pkgname fname
yarn run generate --c pkgname fname
yarn run generate --p pkgname fname
```