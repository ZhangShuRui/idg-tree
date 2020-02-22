// package导出文件
function createPkgIndexFileContent(name) {
	return  `
import { Package } from '@idg/idg';
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
const commonContent = `
export default {}
`

// __mocks__/index.js
const mockFileContent = `
const Mock = require('mockjs');

module.exports = {
};
`
// apis index.ts
const apiIndexContent = `
import {Apis} from '@idg/idg';

const apis: Apis = {
};

export default apis;
`

// components index
const componentIndexContent = `
import { Components } from '@idg/idg';
const components: Components =  {

};

export default components;
`

// controllders index
const controllersIndexContent = commonContent

// locales index
const localesIndexContent = `
import zhCN from './zh-CN';
import enUS from './en-US';
export default {
  'zh-CN': zhCN,
  'en-US': enUS,
};
`

const localesEnContent = commonContent
const localesZhContent = commonContent

// pages index
const pagesIndexContent = commonContent

// router index
const routerIndexContent = `
import { Route } from '@idg/idg';
export const routes: Route[] = [];
`

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
}
