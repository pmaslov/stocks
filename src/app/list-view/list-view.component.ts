import { ViewItemComponent } from './../view-item/view-item.component';
import { NewItemComponent } from './../new-item/new-item.component';
import { MockDataService } from './../mock-data.service';
import { StockItem } from './../model/StockItem';
import { MyDataSource } from './../my-data-source.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgZone,
} from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent implements OnInit {
  readonly fixed_top_height = 80;
  width: number = 0;
  height: number = 0;
  ds: MyDataSource | undefined;
  dialogRef: MatDialogRef<NewItemComponent> | undefined;
  viewDialogRef: MatDialogRef<ViewItemComponent> | undefined;

  private readonly viewportChange = this.viewportRuler
    .change(200)
    .subscribe(() => this.ngZone.run(() => this.setSize()));

  constructor(
    private readonly viewportRuler: ViewportRuler,
    private readonly ngZone: NgZone,
    private dataService: MockDataService,
    public dialog: MatDialog
  ) {
    this.ds = new MyDataSource(dataService);
  }

  ngOnInit(): void {
    this.setSize();
  }

  private setSize() {
    const { width, height } = this.viewportRuler.getViewportSize();
    this.width = width;
    this.height = height - this.fixed_top_height;
  }

  add() {
    this.dialogRef = this.dialog.open(NewItemComponent, {
      width: '600px', // height not set - adopts to content
    });

    this.dialogRef
      .afterClosed()
      .pipe(filter((res) => res))
      .subscribe((res) => {
        const newItem = {
          company: res['company'],
          ticker: (res['ticker'] as string).toUpperCase(),
          price: res['price'],
          exchange: (res['exchange'] as string).toUpperCase(),
          up: true,
        };
        console.log('new item', newItem);
        this.ds?.add(newItem);
      });
  }

  view(stockItem: StockItem) {
    this.viewDialogRef = this.dialog.open(ViewItemComponent, {
      data: stockItem,
    });
  }

  delete(stockItem: StockItem) {
    this.ds?.remove(stockItem);
  }
}
