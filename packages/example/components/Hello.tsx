/*
  example模块是示例代码，请勿直接在上面开发，可以使用yarn run create --pkg pkgname命令来生成package，详见README
*/
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
const TAG = 'example/components/Hello';
import { Button } from '@idg/iview';
import { Log } from '@idg/idg';

@Component({
  depends: ['component.TestModal'],
})
export default class Hello extends Vue {
  @Prop({}) private x: string;
  private showModal: boolean = false;

  public created() {
    Log.debug(TAG, 'hello created', this.x);
  }

  public render() {
    return (
      <div class='flex justify-center items-center'>
        <p class='mr-6'>I'm a component!</p>
        {/* 一般的需求使用Modal组件即可，继承BaseModal主要是方便将复杂的Modal放在独立的tsx文件里 */}
        <test-modal v-model={this.showModal}/>
        <div><Button onClick={this.handleModalShow} type='primary'>显示modal</Button></div>
      </div>
    );
  }
  private handleModalShow() {
    this.showModal = true;
  }
}
