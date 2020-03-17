import { Vue, Component } from 'vue-property-decorator';
import BaseModal from './BaseModal';
import { Button } from '@idg/iview';
@Component({
})
/* 一般的需求使用Modal组件即可，继承BaseModal主要是方便将复杂的Modal放在独立的tsx文件里 */
export default class Hello extends BaseModal {
  protected title = '测试modal';
  protected renderContent() {
    return <div>modal content</div>;
  }
}
