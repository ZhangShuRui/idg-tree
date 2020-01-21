import './init';
import { App, Service, Log, Idg, Package, Route } from '@idg/idg';
import iview from '@idg/iview';
import Vue from 'vue';
import '@idg/iview/dist/styles/ant.css';
import packages from '../packages/packages';
import TemplateService from '../packages/';
import './init.less';

const appid = 'v4tnxcagazspw32hrofsdmorfup8djyq';

Vue.use(iview);

class MyApp extends App {
  constructor() {
    const children: Service[] = [
      new TemplateService({
        channelAlias: 'default',
      }),
    ];
    super({
      appid,
      children,
    });
  }
}

const app = new MyApp();
app.startup();
/* app.dispatcher.listen('@idg/account/on-login-success', () => {
  app.router.push({
    name: 'test',
  });
}); */
