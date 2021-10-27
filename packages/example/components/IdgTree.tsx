
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Log } from '@idg/idg';
import { Icon } from '@idg/iview';
import '../styles/idg-tree.less';
import _ from 'lodash';
const TAG = 'example/IdgTree';

interface TreeData {
  deep: number;
  label: string;
  children?: TreeData[];
}

@Component
export default class IdgTree extends Vue {
  @Prop({ type: Array, default: () => [] })
  public readonly list: TreeData[];

  public get source() {
    return this.setDeep(_.cloneDeep(this.list));
  }

  // 设置层级
  public setDeep(list: TreeData[], deep = 0) {
    ((data: TreeData[]) => {
      data.forEach((item: TreeData) => {
        this.$set(item, 'deep', deep);
        if (item.children && item.children.length > 0) {
          let deepCopy = deep;
          ++deepCopy;
          this.setDeep(item.children, deepCopy);
        }
      });
    })(list);
    return list;
  }

  public render() {
    return <div class='idg-tree'>
      {
        this.renderTree(this.source)
      }
    </div>;
  }

  public renderTree(source: TreeData[]) {
    if (source && source.length > 0) {
      return source.map((item: TreeData, index: number) => {
        const idx = ++index;
        return <div class='idg-tree-content'>
          <div class='idg-tree-item' style={{ paddingLeft: item.deep * 32 + 'px' }}>
            {
              (item.children && item.children.length > 0) && <Icon type='ios-arrow-forward' />
            }
            <span>{item.label + `  ｜  深度：${item.deep},次序:${idx},padding:${item.deep}`}</span>
          </div>
          {
            (item.children && item.children.length > 0) &&
            this.renderTree(item.children)
          }
        </div>;
      });
    }
  }

  public created() {
    Log.debug(TAG, 'created');
  }
}
