import { Vue, Component, Prop } from 'vue-property-decorator';
import { Icon, Checkbox } from '@idg/iview';
import '../styles/idg-tree.less';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Log } from '@idg/idg';

const TAG = 'IdgTree';

interface TreeData {
  _uuid: string;
  deep: number;
  label: string;
  expand?: boolean;
  checked?: boolean;
  children?: TreeData[];
  showIcon?: boolean; // 显示前缀图标
  // tslint:disable-next-line: no-any
  [key: string]: any;
}

@Component
export default class IdgTree extends Vue {
  @Prop({ type: Array, default: () => [] })
  public readonly list: TreeData[];
  @Prop({ type: Boolean, default: false })
  public readonly showCheckbox: boolean;
  @Prop({ type: Boolean, default: false })
  public readonly showPrefixCustomIcon: boolean;
  @Prop({
    type: Object,
    default: () => {
      return {
        label: 'label',
        children: 'children',
      };
    },
  })
  public readonly keys: { label: string; children: string };
  @Prop({ type: String, default: '' })
  public readonly prefixCustomIcon: string;
  @Prop({ type: Boolean, default: false })
  public readonly showOperation: boolean;
  @Prop({ type: String, default: '' })
  public readonly suffixCustomIcon: string;
  @Prop({ type: String, default: '#f3f3f3' })
  public readonly bgColor: string;
  @Prop({ type: String, default: '#e1fbfb' })
  public readonly selectedColor: string;
  @Prop({ type: Number, default: 16 })
  public readonly containerPadding: number;
  @Prop({ type: Number, default: 32 })
  public readonly retract: number;

  public source: TreeData[];
  public curSelectedUUID: string = '';
  public curHoverUUID: string = '';

  public data() {
    return {
      curHoverUUID: '',
      curSelectedUUID: '',
      source: this.setDeep(
        // tslint:disable-next-line: max-line-length
        this.setKeys(this.setKeys(this.setKeys(this.setUUID(this.list), 'showIcon', false), 'expand', false), 'checked', false)),
    };
  }

  public render() {
    return <div
      class='idg-tree'
      style={{ backgroundColor: this.bgColor || 'white' }}>
      {
        this.renderTree(this.source)
      }
    </div>;
  }

  public renderTree(source: TreeData[]) {
    if (source && source.length > 0) {
      return source.map((item: TreeData) => {
        return <div class='idg-tree-content'>
          <div
            class='idg-tree-item'
            style={{
              paddingRight: this.containerPadding + 'px',
              // tslint:disable-next-line: max-line-length
              paddingLeft: item.deep * this.retract - (!item.showIcon ? 12 : 0) + this.containerPadding + (this.showCheckbox ? 26 : 0) + 'px',
              backgroundColor: this.curSelectedUUID === item._uuid ? this.selectedColor : this.bgColor,
            }}
            onmouseenter={() => {
              this.handleMouseEnter(item);
            }}
            onmouseleave={() => {
              this.handleMouseLeave(item);
            }}
            onClick={(event: Event) => this.handleSelectedChange(event, item)}>

            {
              this.showCheckbox &&
              <Checkbox
                class='absolute left-0'
                style={{
                  paddingLeft: `${this.containerPadding}px`,
                }}
                v-model={item.checked}
                nativeOnClick={(event: Event) => event.stopPropagation()}
                on-on-change={(state: boolean) => this.handleCheckedChanged(item, state)} />
            }

            {
              (this.showPrefixCustomIcon && this.prefixCustomIcon && item.showIcon && (item[this.keys.children] &&
                item[this.keys.children].length > 0)) &&
              (<img width={16} height={16} src={this.prefixCustomIcon} alt={''} />)
            }

            {
              (item[this.keys.children] && item[this.keys.children].length > 0) &&
              <Icon
                style='padding:0 5px;cursor: pointer;'
                type={item.expand ? 'ios-arrow-down' : 'ios-arrow-forward'}
                onClick={(event: Event) => this.handleToggleExpand(event, item)} />
            }
            <span
              class='truncate'>{item[this.keys.label] + (this.curHoverUUID === item._uuid ? `-${item.id}` : '')}</span>

            {
              this.showOperation &&
              <div class='idg-tree-operation'>
                {
                  this.$scopedSlots.operation && this.$scopedSlots.operation({
                    data: item,
                  })
                }
              </div>
            }

          </div>
          {
            (item[this.keys.children] && item[this.keys.children].length > 0 && item.expand) &&
            this.renderTree(item[this.keys.children])
          }
        </div>;
      });
    }
  }

  public clearAllCheckedState() {
    this.handleCheckedChanged(this.source[0], false);
  }

  public handleMouseEnter(item: TreeData) {
    this.curHoverUUID = item._uuid;
    this.$emit('enter', item);
  }

  public handleMouseLeave(item: TreeData) {
    this.curHoverUUID = '';
    this.$emit('leave', item);
  }

  // TODO 状态有问题，后面修复
  public handleCheckedChanged(item: TreeData, state: boolean) {
    Log.debug(TAG, '变更复选框状态：', item, state);

    // 先把自己及自己的下级状态变更
    const that = this;

    function func(data: TreeData, val: boolean) {
      that.$set(data, 'checked', val);
      if (data.children && data.children.length > 0) {
        data.children.forEach((child: TreeData) => {
          func(child, val);
        });
      }
    }
    func(item, state);
    const peers: TreeData[] = [];

    function getPeerStatus(source: TreeData[], deep: number) {
      source.forEach((v: TreeData) => {
        if (v.deep === deep) {
          peers.push(v);
        } else {
          if (v.children && v.children.length > 0) {
            getPeerStatus(v.children, deep);
          }
        }
      });
    }

    getPeerStatus(this.source, item.deep);

    const peerState = Array.from(new Set(peers.map((vv: TreeData) => {
      return vv.checked;
    })));
    Log.debug(TAG, 'peers:', peers, peerState);

    // const fathers: TreeData[] = [];
    // function getAllFathers(source: TreeData[], deep: number) {
    //   if (deep < 0) {
    //     return;
    //   }
    //   source.forEach((v: TreeData) => {
    //     if (v.deep === deep) {
    //       fathers.push(v);
    //     } else if (v.children && v.children.length > 0) {
    //       getAllFathers(v.children, deep);
    //     }
    //   });
    // }
    // getAllFathers(this.source, --item.deep);
    // fathers.forEach((father: TreeData) => {
    //   const exist = _.find(father.children, (child: TreeData) => child._uuid === item._uuid);
    //   if (exist) {
    //     father.checked = peerState.length === 1 ? peerState[0] : true;
    //   }
    // });
    //
    // Log.debug(TAG, 'fathers:', fathers);
    this.$emit('check-change', item, state);
  }

  public handleSelectedChange(event: Event, item: TreeData) {
    this.curSelectedUUID = item._uuid;
    this.$emit('select-change', item);
    event.stopPropagation();
  }

  // 点击箭头
  public handleToggleExpand(event: Event, item: TreeData) {
    item.expand = !item.expand;
    this.$emit('toggle-expand', item);
    event.stopPropagation();
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

  // 设置属性
  // tslint:disable-next-line: no-any
  public setKeys(list: TreeData[], key: string, defaultVal: any, forceUpdate = false) {
    ((data: TreeData[]) => {
      data.forEach((item: TreeData) => {
        this.$set(item, key, forceUpdate ? defaultVal : (_.has(item, key) ? item[key] : defaultVal));
        if (item.children && item.children.length > 0) {
          this.setKeys(item.children, key, defaultVal);
        }
      });
    })(list);
    return list;
  }

  public setUUID(list: TreeData[]) {
    ((data: TreeData[]) => {
      data.forEach((item: TreeData) => {
        this.$set(item, '_uuid', uuidv4());
        if (item.children && item.children.length > 0) {
          this.setUUID(item.children);
        }
      });
    })(list);
    return list;
  }

  public created() {
    Log.debug(TAG, 'created');
  }
}
