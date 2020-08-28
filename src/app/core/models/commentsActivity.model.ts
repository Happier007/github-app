export class CommentsActivityModel {
  public days: number[];
  public total: number;
  public week: Date;

  constructor(data: any = {}) {
    this.days = data.days || void 0;
    this.total = data.total || void 0;
    this.week = new Date(data.week * 1000) || void 0;
  }
}
