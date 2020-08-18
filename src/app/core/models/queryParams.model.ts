export class QueryParamsModel {
  public page: string;
  public perPage: string;
  public q?: string;

  constructor(data: any = {}) {
    this.page = data.pageIndex || '0';
    this.perPage = data.pageSize || '1';
    this.q = data.q || void 0;
  }
}
