export class PaginationModel {
  public prevPaginationId: number;
  public nextPaginationId: number;

  constructor(data: any = {}) {
    this.prevPaginationId = data.prevPaginationId || 0;
    this.nextPaginationId = data.nextPaginationId || 0;
  }
}
