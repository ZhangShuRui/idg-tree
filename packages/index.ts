import { Service, ChannelOptions } from '@idg/idg';
import packages from './packages';
/* import UcenterService from '@idg/ucenter'; */

const a: string = 1;
export default class TemplateService extends Service {
  constructor(channelOptions: ChannelOptions) {
    const children: Service[]  = [
      /* new UcenterService({
        channelAlias: 'default',
      }), */
    ];
    super({
      appid: 'vbckjp9mnfryjuhzw8ga7wlds2dexqxy',
      packages,
      channelOptions,
      children,
    });
  }
}
