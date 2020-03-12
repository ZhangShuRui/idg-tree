/*
  example模块是示例代码，请勿直接在上面开发，可以使用yarn run create --pkg pkgname命令来生成package，详见README
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
