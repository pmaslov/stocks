import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clicksq',
  templateUrl: './clicksq.component.html',
  styleUrls: ['./clicksq.component.css'],
})
export class ClicksqComponent implements OnInit {
  ids: number[] = [];
  els: HTMLElement[] = [];

  constructor() {}

  ngOnInit(): void {
    this.ids = [];
    for (let i = 0; i < 7; i++) {
      this.ids.push(i);
    }
  }

  onclick(e: MouseEvent): void {
    const el = e.target as HTMLElement;
    if (!el.className.includes('clicked')) {
      this.els.push(el);
      el.className = 'sq clicked';
      if (this.els.length === this.ids.length) {
        this.uncheck();
      }
    }
  }

  private uncheck() {
    if (this.els.length === 0) return;

    setTimeout(() => {
      const el = this.els.pop();
      if (el) {
        el.className = 'sq';
        this.uncheck();
      }
    }, 500);
  }

  public getStrId(num: number): string {
    return 'id' + num;
  }
}
