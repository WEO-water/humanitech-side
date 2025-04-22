export class ViewObject {
    name: string;
    count: number;
    lstNight: number[];
  
    constructor(name: string = '', count: number = 0, lstNight: number[] = []) {
      this.name = name;
      this.count = count;
      this.lstNight = lstNight;
    }
  
    averageNight(): number | null {
      if (this.lstNight.length === 0) return null;
      const total = this.lstNight.reduce((a, b) => a + b, 0);
      return total / this.lstNight.length;
    }
  }

  import { writable } from 'svelte/store';

export const viewState = writable<ViewObject>(new ViewObject());