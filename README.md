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

## 自动生成并注册新的package/components/page/apis/controllers
```
yarn run create type name (fname)
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
yarn run create --pkg a
```

### 创建api/controller/components/pages
```
yarn run create --a pkgname fname
yarn run create --ctr pkgname fname
yarn run create --c pkgname fname
yarn run create --p pkgname fname
```