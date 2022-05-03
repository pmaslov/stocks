import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClicksqComponent } from './clicksq.component';

describe('ClicksqComponent', () => {
  let component: ClicksqComponent;
  let fixture: ComponentFixture<ClicksqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClicksqComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClicksqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change color when clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    let div = compiled.querySelector('#id0') as HTMLDivElement;
    div.click();
    fixture.detectChanges();
    expect(div).toHaveClass('clicked');
  });

  it('after 0.5s should have first box checked and last box unchecked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    jasmine.clock().install();
    let div = compiled.querySelector('#id2') as HTMLDivElement;
    div.click();
    div = compiled.querySelector('#id1') as HTMLDivElement;
    div.click();
    div = compiled.querySelector('#id3') as HTMLDivElement;
    div.click();
    div = compiled.querySelector('#id6') as HTMLDivElement;
    div.click();
    div = compiled.querySelector('#id0') as HTMLDivElement;
    div.click();
    div = compiled.querySelector('#id5') as HTMLDivElement;
    div.click();
    div = compiled.querySelector('#id4') as HTMLDivElement;
    div.click();

    let divLast = compiled.querySelector('#id4') as HTMLDivElement;
    expect(divLast).toHaveClass('clicked');
    let divFirst = compiled.querySelector('#id2') as HTMLDivElement;
    expect(divFirst).toHaveClass('clicked');

    jasmine.clock().tick(500);

    expect(divFirst).toHaveClass('clicked');
    expect(divLast).not.toHaveClass('clicked');

    jasmine.clock().uninstall();
  });

  it('after 3.5s should have all boxes unchecked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    jasmine.clock().install();
    let div1 = compiled.querySelector('#id2') as HTMLDivElement;
    div1.click();
    let div2 = compiled.querySelector('#id1') as HTMLDivElement;
    div2.click();
    let div3 = compiled.querySelector('#id3') as HTMLDivElement;
    div3.click();
    let div4 = compiled.querySelector('#id6') as HTMLDivElement;
    div4.click();
    let div5 = compiled.querySelector('#id0') as HTMLDivElement;
    div5.click();
    let div6 = compiled.querySelector('#id5') as HTMLDivElement;
    div6.click();
    let div7 = compiled.querySelector('#id4') as HTMLDivElement;
    div7.click();

    [div1, div2, div3, div4, div5, div6, div7].forEach((div) => {
      expect(div).toHaveClass('clicked');
    });

    jasmine.clock().tick(3500);

    [div1, div2, div3, div4, div5, div6, div7].forEach((div) => {
      expect(div).not.toHaveClass('clicked');
    });

    jasmine.clock().uninstall();
  });

  it('should ignore clicking the same box multiple times', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    jasmine.clock().install();
    let div1 = compiled.querySelector('#id2') as HTMLDivElement;
    for (let i = 0; i < 7; i++) {
      div1.click();
    }
    jasmine.clock().tick(3500);
    expect(div1).toHaveClass('clicked');
    jasmine.clock().uninstall();
  });
});
