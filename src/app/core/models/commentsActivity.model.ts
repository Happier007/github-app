export class CommentsActivityModel {
  public days: number[];
  public week: Date;

  constructor(data: any = {}) {
    this.days = data.days || void 0;
    this.week = data.week && new Date(data.week * 1000) || void 0;
  }
}
