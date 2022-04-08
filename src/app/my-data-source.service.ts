import { StockItem } from './model/StockItem';
import { MockDataService } from './mock-data.service';

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';

export class MyDataSource extends DataSource<StockItem | undefined> {
  private _length;
  private _pageSize;
  private _cachedData: StockItem[];
  private _fetchedPages = new Set<number>();
  private _dataStream;
  private readonly _subscription = new Subscription();

  constructor(private dataService: MockDataService) {
    super();
    this._cachedData = dataService.get();
    this._length = this._cachedData.length;
    this._pageSize = this._cachedData.length;
    this._dataStream = new BehaviorSubject<(StockItem | undefined)[]>(
      this._cachedData
    );
  }

  connect(
    collectionViewer: CollectionViewer
  ): Observable<(StockItem | undefined)[]> {
    this._subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        console.log('retrieving', range.start, range.end);
        const startPage = this._getPageForIndex(range.start);
        const endPage = this._getPageForIndex(range.end - 1);
        for (let i = startPage; i <= endPage; i++) {
          this._fetchPage(i);
        }
      })
    );
    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  remove(stock: StockItem): void {
    this.dataService.remove(stock);
    this.refresh();
  }

  add(stock: StockItem): void {
    this.dataService.add(stock);
    this.refresh();
  }

  refresh(): void {
    this._cachedData = this.dataService.get();
    this._dataStream.next(this._cachedData);
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number) {
    if (this._fetchedPages.has(page)) {
      return this._cachedData;
    }
    this._fetchedPages.add(page);

    return this._cachedData;
  }
}
