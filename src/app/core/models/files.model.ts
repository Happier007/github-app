export class FileModel {
  public filename: string;
  public type: string;
  public language: string;
  public rawUrl: string;
  public size: number;

  constructor(data: any = {}) {
    this.filename = data.filename || void 0;
    this.type = data.type || void 0;
    this.language = data.language || void 0;
    this.rawUrl = data.rawUrl || void 0;
    this.size = data.size || void 0;
  }
}
