export class PageParamsModel {
  public page: number;
  public perPage: number;
  public
  public q: string;

  constructor(data: any = {}) {
    this.page = data.pageIndex || data.page || 0;
    this.perPage = data.pageSize || data.per_page || 5;
    this.q = data.q || void 0;
  }
}
