/*
  example模块是示例代码，请勿直接在上面开发，请复制一份，项目完成后可以删除！！！
*/
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
const TAG = 'example/components/Hello';
import styles from '../styles/task.module.less';
@Component({
})
export default class Hello extends Vue {
  private render() {
    return (
      <div
        class='flex justify-center items-center'
      >I'm a component!</div>
    );
  }
}
