/*
  example模块是示例代码，请勿直接在上面开发，请复制一份，项目完成后可以删除！！！
*/
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Row } from '@idg/iview';
import styles from '../styles/task.module.less';
@Component({
  depends: [
    'component.Hello',
  ],
})
export default class Test extends Vue {
  private render() {
    return (
      <div>
        <page-header title='Test Page!' onBack={this.back}></page-header>
        <hello/>
      </div>
    );
  }
  private back() {
    this.$Message.success('event triggered');
  }
 }
