
import { Vue, Component } from 'vue-property-decorator';

interface TreeData {
  label: string;
  children?: TreeData[];
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
        <idg-tree list={this.list} />
      </div>
    );
  }
}
