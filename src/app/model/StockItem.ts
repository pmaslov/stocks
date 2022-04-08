export class StockItem {
  constructor(
    public company: string,
    public ticker: string,
    public price: number,
    public exchange: string,
    public up: boolean
  ) {}
}
