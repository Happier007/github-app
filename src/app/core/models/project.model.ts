import { CreatorModel } from './creator.model';

export class ProjectModel {
  public ownerUrl: string;
  public url: string;
  public htmlUrl: string;
  public columnsUrl: string;
  public id: number;
  public nodeId: string;
  public name: string;
  public body: string;
  public number: number;
  public state: string;
  public creator: CreatorModel;
  public createdAt: string;
  public updatedAt: string;

  constructor(data: any = {}) {
    this.ownerUrl = data.ownerUrl || void 0;
    this.url = data.url || void 0;
    this.htmlUrl = data.htmlUrl || void 0;
    this.columnsUrl = data.columnsUrl || void 0;
    this.id = data.id || void 0;
    this.nodeId = data.nodeId || void 0;
    this.name = data.name || void 0;
    this.body = data.body || void 0;
    this.number = data.number || void 0;
    this.state = data.state || void 0;
    this.creator = data.creator && new CreatorModel(data.creator) || void 0;
    this.createdAt = data.createdAt || void 0;
    this.updatedAt = data.updatedAt || void 0;
  }
}
