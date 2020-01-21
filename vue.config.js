const apiMocker = require('@idg/mocker')
const path = require('path')
const globby = require('globby')
const transpileDependencies = [
  '@idg/idg',
  /* '@idg/account',
  '@idg/ucenter',
  '@idg/acl', */
]
const chainWebpack = config => {
  config
    .externals({
      'vue': {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      },
      'vue-router': {
        root: 'VueRouter',
        commonjs: 'vue-router',
        commonjs2: 'vue-router',
        amd: 'vue-router'
      },
      'vuex': {
        root: 'Vuex',
        commonjs: 'vuex',
        commonjs2: 'vuex',
        amd: 'vuex'
      },
      'vue-i18n': {
        root: 'VueI18n',
        commonjs: 'vue-i18n',
        commonjs2: 'vue-i18n',
        amd: 'vue-i18n'
      },
      'axios': {
        root: 'axios',
        commonjs: 'axios',
        commonjs2: 'axios',
        amd: 'axios'
      },
      'lodash': {
        root: '_',
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash'
      },
      'qs': {
        root: 'Qs',
        commonjs: 'qs',
        commonjs2: 'qs',
        amd: 'qs'
      },
      'localforage': {
        root: 'localforage',
        commonjs: 'localforage',
        commonjs2: 'localforage',
        amd: 'localforage'
      },
      '@idg/iview': {
        root: 'iview',
        commonjs: '@idg/iview',
        commonjs2: '@idg/iview',
        amd: '@idg/iview'
      },
      '@idg/idg': {
        root: 'Idg',
        commonjs: '@idg/idg',
        commonjs2: '@idg/idg',
        amd: '@idg/idg'
      },
      /* '@idg/account': {
        root: 'IdgAccount',
        commonjs: '@idg/account',
        commonjs2: '@idg/account',
        amd: '@idg/account'
      },
      '@idg/ucenter': {
        root: 'IdgUcenter',
        commonjs: '@idg/ucenter',
        commonjs2: '@idg/ucenter',
        amd: '@idg/ucenter'
      },
      '@idg/acl': {
        root: 'IdgAcl',
        commonjs: '@idg/acl',
        commonjs2: '@idg/acl',
        amd: '@idg/acl'
      } */
    })
}

const devConfig = {
  transpileDependencies,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    before (app) {
      apiMocker(app,
        globby.sync(['**/__mocks__/index.js']).map(filePath => {
          return path.resolve(process.cwd(), filePath)
        })
      )
    }
  }
}

const prodConfig = {
  transpileDependencies,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
}

module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig
