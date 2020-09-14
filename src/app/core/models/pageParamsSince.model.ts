export class PageParamsSinceModel {
  public since: number;

  constructor(data: any = {}) {
    this.since = data.since || 0;
  }
}
