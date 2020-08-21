export class FileModel {
  public content: string;
  public filename: string;
  public language: string;
  public rawUrl: string;
  public size: number;
  public truncated: boolean;
  public type: string;

  constructor(data: any = {}) {
    this.content = data.content || void 0;
    this.filename = data.filename || void 0;
    this.language = data.language || void 0;
    this.rawUrl = data.rawUrl || void 0;
    this.size = data.size || void 0;
    this.truncated = !!data.truncated;
    this.type = data.type || void 0;
  }
}
