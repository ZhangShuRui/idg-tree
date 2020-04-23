import './init';
import { App, Service, Log, Idg, Package, Route } from '@idg/idg';
import iview from '@idg/iview';
import Vue from 'vue';
import '@idg/iview/dist/styles/ant.css';
import './init.less';
import packages from '../packages/packages';

const appid = 'v4tnxcagazspw32hrofsdmorfup8djyq';

Vue.use(iview);

class MyApp extends App {
  constructor() {
    const children: Service[] = [
      // new AccountService({
      //   channelAlias: 'default',
      // }),
    ];
    super({
      appid,
      children,
      packages,
    });
  }

  // 开发服务打开注释
  // public getBaseURL() {
  //   if (window.USE_MOCK) {
  //       return '';
  //   } else {
  //       return this.getProxyURL();
  //   }
  // }
}

const app = new MyApp();
app.startup();

