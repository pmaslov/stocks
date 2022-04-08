import { StockItem } from './../model/StockItem';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css'],
})
export class ViewItemComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: StockItem) {}

  ngOnInit(): void {}

  directionClass() {
    return this.data?.up ? 'up' : 'down';
  }
}
