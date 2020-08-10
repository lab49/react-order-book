// My css.d.ts file
import * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    '--row-color'?: string;
  }
}
