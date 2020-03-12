// package导出文件
function createPkgIndexFileContent(name) {
	return  `import { Package } from '@idg/idg';
import components from './components';
import apis from './apis';
import locales from './locales';
import controllers from './controllers';
import pages from './pages';
import { routes } from './router';

const pkg: Package = {
  name: '${name}',
  components,
  locales,
  routes,
  apis,
  pages,
  controllers,
};

export default pkg;
`
}


// common content
const commonContent = `export default {};\n\n`

// __mocks__/index.js
const mockFileContent = `const Mock = require('mockjs');

module.exports = {
};
`
// apis index.ts
const apiIndexContent = `import {Apis} from '@idg/idg';

const apis: Apis = {
};

export default apis;
`

// components index
const componentIndexContent = `import { Components } from '@idg/idg';

const components: Components =  {
};

export default components;
`

// controllders index
const controllersIndexContent = `import { Controllers } from '@idg/idg';

const controllers: Controllers = {
};

export default controllers;
`

// locales index
const localesIndexContent = `import zhCN from './zh-CN';
import enUS from './en-US';
export default {
  'zh-CN': zhCN,
  'en-US': enUS,
};
`

const localesEnContent = commonContent
const localesZhContent = commonContent

// pages index
const pagesIndexContent = `import { Pages } from '@idg/idg';

const pages: Pages = {
};

export default pages;
`

// router index
const routerIndexContent = `import { Route } from '@idg/idg';
export const routes: Route[] = [];
`

// api
const getApiContent = function (name, fname) {
	return `import { Api } from '@idg/idg';
export default class extends Api {

}
`
}
// controller
const getControllerContent = function (name, fname) {
	return `import { Controller } from '@idg/idg';
export default class extends Controller {

}
`
}
// component
function getComponentContent(name, fname) {
	return `import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import { Log } from '@idg/idg';
const TAG = '${name}/components/${fname}';
@Component({
})
export default class ${fname} extends Vue {
  private render() {
    return (
      <div></div>
    );
  }
}
`
}
// page
function getPageContent(name, fname) {
	return `import { Vue, Component } from 'vue-property-decorator';
@Component({
  depends: [],
})
export default class ${fname} extends Vue {
  private render() {
    return (
      <div></div>
    );
  }
}
`
}

module.exports = {
	createPkgIndexFileContent,
	mockFileContent,
	apiIndexContent,
	componentIndexContent,
	controllersIndexContent,
	localesIndexContent,
	localesEnContent,
	localesZhContent,
	pagesIndexContent,
	routerIndexContent,
	getApiContent,
	getComponentContent,
	getControllerContent,
	getPageContent
}
