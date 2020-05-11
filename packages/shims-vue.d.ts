import Vue, { ComponentOptions } from 'vue';
import { Message } from '@idg/iview';
import { Depend } from '@idg/idg';
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    depends?: (string | Depend)[];
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $Message: Message;
  }
}