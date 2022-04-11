import { StockItem } from './../model/StockItem';
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  @Input() company: string | undefined;
  @Input() ticker: string | undefined;
  @Input() price: number | undefined;

  @Input() item: StockItem | undefined;

  @Output() viewEvent = new EventEmitter<StockItem>();
  @Output() deleteEvent = new EventEmitter<StockItem>();

  constructor() {}

  ngOnInit(): void {}

  directionClass() {
    return this.item?.up ? 'up' : 'down';
  }

  view() {
    this.viewEvent.emit(this.item);
  }

  delete(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.deleteEvent.emit(this.item);
  }
}
