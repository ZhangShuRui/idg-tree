
import { Vue, Component } from 'vue-property-decorator';
import { Log } from '@idg/idg';
import { Icon } from '@idg/iview';
const TAG = 'example/Test';
interface TreeData {
  deep?: number;
  label: string;
  expand?: boolean;
  checked?: boolean;
  children?: TreeData[];
  // tslint:disable-next-line: no-any
  [key: string]: any;
}
@Component({
  depends: [
    'component.IdgTree',
  ],
})
export default class Test extends Vue {
  public list: TreeData[] = [
    {
      label: 'root-0-1',
      expand: true,
      children: [
        {
          label: 'leaf-1-1',
          children: [
            {
              label: 'leaf-2-1',
            },
            {
              label: 'leaf-2-2',
            },
          ],
        },
        {
          label: 'leaf-1-2',
        },
      ],
    },
    {
      label: 'root-0-2',
      children: [],
    },
  ];
  public render() {
    return (
      <div class='h-full'>
        <idg-tree
          style='border:1px solid pink;'
          list={this.list}
          selectedColor={'#e1fbfb'}
          bgColor={'#f3f3f3'}
          containerPadding={16}
          showCheckbox={true}
          showPrefixCustomIcon={true}
          prefixCustomIcon={require('../static/folder.svg')}
          showOperation={true}
          retract={32}
          on-enter={this.handleMouseEnter}
          on-leave={this.handleMouseLeave}
          on-select-change={this.handleSelectedChange}
          on-check-change={this.handleCheckedChange}
          on-toggle-expand={this.handleToggleExpand}
          scopedSlots={{
            operation: this.renderOperation,
          }}>

        </idg-tree>
      </div >
    );
  }

  // tslint:disable-next-line: no-any
  public renderOperation(props: { data: TreeData }) {
    return <div>
      <Icon
        onclick={this.handleIconClick.bind(this, props.data)}
        class='cursor-pointer'
        size={16}
        type={'md-eye'}
      />
    </div>;
  }

  public handleIconClick(item: TreeData) {
    Log.debug(TAG, 'icon click!', item);
  }

  public handleSelectedChange(item: TreeData) {
    Log.debug(TAG, 'handleSelectedChange', item);
  }
  public handleMouseEnter(item: TreeData) {
    Log.debug(TAG, 'handleMouseEnter', item);
  }
  public handleMouseLeave(item: TreeData) {
    Log.debug(TAG, 'handleMouseLeave', item);
  }
  public handleCheckedChange(item: TreeData, state: boolean) {
    Log.debug(TAG, 'handleCheckedChange', item, state);
  }
  public handleToggleExpand(item: TreeData) {
    Log.debug(TAG, 'handleToggleExpand', item);
  }
}
