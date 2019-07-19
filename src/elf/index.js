// Elf 样式配置文件
import * as c from './helpers/Color';
import * as e from './helpers/Extend';
import * as m from './helpers/Mixins';
import * as f from './helpers/Font';
import * as d from './helpers/Distance';

class Elf {
  constructor(c1, e1, m1, f1, d1) {
    this.c = c1;
    this.e = e1;
    this.m = m1;
    this.f = f1;
    this.d = d1;
  }
}

const elf = new Elf(c, e, m, f, d);

export default elf;
