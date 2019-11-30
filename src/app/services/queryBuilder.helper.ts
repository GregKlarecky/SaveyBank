export class QueryBuilder {
  public query: string;
  constructor(
    private pageSize?: number,
    private dateFrom?: number,
    private dateTo?: number
  ) {}

  public buildPageSize() {
    return this.pageSize ? `pageSize=${this.pageSize}` : null;
  }
  public buildDateFrom() {
    return this.dateFrom ? `dateFrom=${this.dateFrom}` : null;
  }
  public buildDateTo() {
    return this.dateTo ? `dateTo=${this.dateTo}` : null;
  }

  public buildQueryString() {
    return (
      "?" +
      [this.buildPageSize(), this.buildDateFrom(), this.buildDateTo()]
        .filter(item => item !== null)
        .join("&")
    );
  }
}
