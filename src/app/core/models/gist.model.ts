import { FileModel } from './files.model';
import { OwnerModel } from './owner.model';

export class GistModel {
  public url: string;
  public forksUrl: string;
  public commitsUrl: string;
  public id: string;
  public nodeId: string;
  public gitPullUrl: string;
  public htmlUrl: string;
  public files: FileModel;
  public createdAt: string;
  public updatedAt: string;
  public description: string;
  public comments: number;
  public user: string;
  public commentsUrl: string;
  public owner: OwnerModel;
  public truncated: boolean;

  constructor(data: any = {}) {
    this.url = data.url || void 0;
    this.forksUrl = data.forksUrl || void 0;
    this.commitsUrl = data.commitsUrl || void 0;
    this.id = data.id || void 0;
    this.nodeId = data.nodeId || void 0;
    this.gitPullUrl = data.gitPullUrl || void 0;
    this.htmlUrl = data.htmlUrl || void 0;
    this.files = data.files && new FileModel(data.files) || void 0;
    this.createdAt = data.createdAt || void 0;
    this.updatedAt = data.updatedAt || void 0;
    this.description = data.description || void 0;
    this.comments = data.comments || void 0;
    this.user = data.user || void 0;
    this.commentsUrl = data.commentsUrl || void 0;
    this.owner = data.owner && new OwnerModel(data.owner) || void 0;
    this.truncated = data.truncated || !!data.truncated;
  }
}
